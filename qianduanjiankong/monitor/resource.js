// 监控引用资源的情况

export default {
  init(){
    // 获取资源相关的信息
    let resourceData = performance.getEntriesByType('resource')
    console.log(resourceData, 'resourceData')
  }
}