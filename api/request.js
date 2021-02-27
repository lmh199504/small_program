
const baseUrl = 'http://kn5f6i.natappfree.cc'
const request = (url,method,data) => {
  return new Promise((resolve,reject) => {
    wx.request({
      url: baseUrl + url,
      method:method,
      data:data,
      success:function(res) {
        resolve(res)
      },
      fail:function(error) {
        reject(error)
      }
    })
  })
}
export default request