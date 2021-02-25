// pages/meiri/meiri.js
const app = getApp();
const innerAudioContext = app.globalData.innerAudioContext;
import { getHomeNewSong } from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: [
      {name:'最新',type:5},
			{name:'内地',type:1},
			{name:'港台',type:6},
			{name:'欧美',type:2},
			{name:'韩国',type:4},
			{name:'日本',type:3}
    ],
    activeNav: 5,
    songlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHomeNewSong(this.data.activeNav)
    wx.setNavigationBarTitle({
      title: "新歌推荐"
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
    getHomeNewSong({type}).then(res => {
      wx.hideLoading()
      this.setData({
        songlist:res.data.data.new_song.data.songlist
      })
    }).catch(() => {
      wx.hideLoading()
    })
  }

})