// pages/classDetail/classDetail.js
import { getSongListDetail } from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headurl: '',
    desc: '',
    dissname: '',
    nickname: '',
    songlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSongListDetail(options.type).then(res => {
      console.log(res)
      this.setData({
        headurl: res.data.response.cdlist[0].headurl,
        desc: res.data.response.cdlist[0].desc,
        dissname: res.data.response.cdlist[0].dissname,
        nickname: res.data.response.cdlist[0].nickname,
        songlist: res.data.response.cdlist[0].songlist
      })
      wx.hideLoading()
    }).catch(() => {
      wx.hideLoading()
    })

    wx.setNavigationBarTitle({

      title: "歌单详情"
   
    })
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
  getSongListDetail(disstid) {
    wx.showLoading({
      title: '加载中',
    })
    return getSongListDetail({ disstid })
  }
})