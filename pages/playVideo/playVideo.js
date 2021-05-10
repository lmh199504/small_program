// pages/playVideo/playVideo.js
import {
  getMV,
  reqGetMvPlay
} from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: {
      area_id: 15,
      version_id: 7,
      page: 1,
      order: 1
    },
    mvList: [],
    currentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMV()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getMV(params) {
    getMV(params).then(res => {
      var tempList = res.data.response.mv_list.data.list
      console.log(tempList)
      this.setData({
        mvList: this.data.mvList.concat(tempList)
      },() => {
        const mvList = this.data.mvList
        if(this.data.currentIndex == 0) {
          reqGetMvPlay({
            vid: mvList[0].vid
          })
          .then(result => {
            console.log(result)
            const mp4Arr = result.data.response.getMVUrl.data[mvList[0].vid].mp4
            const mvUrl = mp4Arr[mp4Arr.length - 1].freeflow_url[mp4Arr[mp4Arr.length - 1].freeflow_url.length - 1]
            console.log(mvUrl)
            mvList[0].url = mvUrl
            this.setData({
              mvList
            },() => {
              var videoContext = wx.createVideoContext('video0')
              videoContext.play()
            })
          })
        }
      })
      
      
    })
  },
  swiperChange(e) {
    console.log(e.detail.current)
    const current = e.detail.current
    this.setData({
      currentIndex: current
    })
    const {
      mvList
    } = this.data
    for(let i = 0;i<mvList.length;i++){
      var videoContext = wx.createVideoContext('video'+i)
      videoContext.pause()
    }
    reqGetMvPlay({
        vid: mvList[current].vid
      })
      .then(result => {
        console.log(result)
        const mp4Arr = result.data.response.getMVUrl.data[mvList[current].vid].mp4
        const mvUrl = mp4Arr[mp4Arr.length - 1].freeflow_url[mp4Arr[mp4Arr.length - 1].freeflow_url.length - 1]
        console.log(mvUrl)
        mvList[current].url = mvUrl
        this.setData({
          mvList
        },() => {
          var videoContext = wx.createVideoContext('video'+current)
          videoContext.stop()
        })
      })
  }
})