// pages/meiri/meiri.js
const app = getApp();
const innerAudioContext = app.globalData.innerAudioContext;
import { getHomeClassifid } from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: [
      {name:'为你推荐',type:66},
			{name:'官方歌单',type:3317},
			{name:'情歌',type:71},
			{name:'网络歌曲',type:3056},
			{name:'经典',type:59},
			{name:'KTV热歌',type:64}
    ],
    activeNav: 66,
    songlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHomeNewSong(this.data.activeNav)
    wx.setNavigationBarTitle({
      title: "歌单推荐"
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
 
  clickNav(e) {
    this.setData({
      activeNav: e.target.dataset.type
    })
    this.getHomeNewSong(e.target.dataset.type)

  },
  playAll(){
    
  },
  getHomeNewSong(type) {
    wx.showLoading({
      title: '加载中...',
    })
    getHomeClassifid({titleid:type}).then(res => {
      wx.hideLoading()
      this.setData({
        songlist:res.data.data.playlist.data.v_playlist
      })
    }).catch(() => {
      wx.hideLoading()
    })
  }

})