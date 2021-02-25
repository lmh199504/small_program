// pages/meiri/meiri.js
const app = getApp();
const innerAudioContext = app.globalData.innerAudioContext;
import { getDigitalAlbumLists } from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    content: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "数字专辑"
    })
    this.getDigitalAlbumLists() 
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

  getDigitalAlbumLists() {
    getDigitalAlbumLists().then(res => {
      this.setData({
        banner:  res.data.response.data.banner,
        content: res.data.response.data.content
      })
    })
  }


})