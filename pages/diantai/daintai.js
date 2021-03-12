// pages/meiri/meiri.js
const app = getApp();
import { getRadioLists,getRadioSong } from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRadioLists()
    wx.setNavigationBarTitle({
      title: "电台"
    })
  },
  getRadioLists() {
    getRadioLists().then(res => {
      this.setData({
        radioList: res.data.response.data.data.groupList
      })
    }).catch(() => {

    })
  },
  playAll(e) {
    const radioid =  e.currentTarget.dataset.radioid
    getRadioSong({
      radioId: radioid
    })
  }
})