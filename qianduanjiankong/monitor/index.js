// 我们要监控页面的性能   -- 算时间差  dns解析 dom加载  整个页面加载完成用了多久  浏览器给了Performance API  IE9以下不能用
import perf from './performance.js'
import resource from './resource.js'

let fotmatObj = (data) => {
  let arr = []
  for(let key in data){
    arr.push(`${key}=${data[key]}`);
  }
  return arr.join('&')
}

perf.init((data)=>{  // 获取到页面性能相关的数据
  // 返回的图片可能没有大小 ， 空图片  
  new Image().src = '/p.gif?' + fotmatObj(data)
  console.log(data);
});

// 监控页面静态资源的加载情况

resource.init((data)=>{
  console.log(data)
})
// ajax监控ajax发送情况

// 页面的错误捕获
// 监控用户行为


// 怎么讲这些数据传到服务端   1.通过ajax  2. 通过image（无感传数据）