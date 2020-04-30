(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  // 专门用来写性能监控的逻辑
  var processData = function processData(p) {
    var data = {
      prevPage: p.fetchStart - p.navigationStart,
      // 上个页面到这个页面的时长
      redirect: p.redirectEnd - p.redirectStart,
      // 重定向时长
      dns: p.domainLookupEnd - p.domainLookupStart,
      // dns解析时长
      connect: p.connectEnd - p.connectStart,
      // tcp连接时长
      // 从请求到响应的时长
      send: p.responseEnd - p.requestStart,
      // 响应结束到请求结束时长
      ttfb: p.responseStart - p.navigationStart,
      // 首字节接收到的时长
      domready: p.domInteractive - p.domLoading,
      // dom 准备时长
      // 白屏  页面不加载完就是白屏
      whiteScreen: p.domLoading - p.navigationStart,
      // dom 解析时间
      dom: p.domComplete - p.domLoading,
      // onload的执行时间
      load: p.loadEventEnd - p.loadEventStart,
      total: p.loadEventEnd - p.navigationStart
    };
    return data;
  }; // 等dom结束后再执行函数


  var load = function load(cb) {
    var timer;

    var check = function check() {
      if (performance.timing.loadEventEnd) {
        clearTimeout(timer);
        cb();
      } else {
        timer = setTimeout(check, 100);
      }
    };

    window.addEventListener('load', check, false);
  }; // 等dom未结束后再执行函数


  var domready = function domready(cb) {
    console.log(123343252);
    var timer;

    var check = function check() {
      if (performance.timing.domInteractive) {
        clearTimeout(timer);
        cb();
      } else {
        timer = setTimeout(check, 100);
      }
    };

    window.addEventListener('DOMContentLoaded', check, false);
  };

  var perf = {
    init: function init(cb) {
      domready(function () {
        // 有可能没有触发onload  dom解析完成后先统计一下，可能用户没加载完就关闭页面
        var perfData = performance.timing;
        var data = processData(perfData);
        data.type = 'domready';
        cb(data);
      });
      load(function () {
        var perfData = performance.timing;
        var data = processData(perfData);
        data.type = 'loaded';
        cb(data);
      }); // window.addEventListener('load',()=>{
      // })
    }
  };

  // 监控引用资源的情况
  var resource = {
    init: function init() {
      // 获取资源相关的信息
      var resourceData = performance.getEntriesByType('resource');
      console.log(resourceData, 'resourceData');
    }
  };

  // 我们要监控页面的性能   -- 算时间差  dns解析 dom加载  整个页面加载完成用了多久  浏览器给了Performance API  IE9以下不能用

  var fotmatObj = function fotmatObj(data) {
    var arr = [];

    for (var key in data) {
      arr.push("".concat(key, "=").concat(data[key]));
    }

    return arr.join('&');
  };

  perf.init(function (data) {
    // 获取到页面性能相关的数据
    // 返回的图片可能没有大小 ， 空图片  
    new Image().src = '/p.gif?' + fotmatObj(data);
    console.log(data);
  }); // 监控页面静态资源的加载情况

  resource.init(function (data) {
    console.log(data);
  }); // ajax监控ajax发送情况
  // 页面的错误捕获
  // 监控用户行为
  // 怎么讲这些数据传到服务端   1.通过ajax  2. 通过image（无感传数据）

})));
