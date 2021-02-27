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
  getSongListDetail(disstid) {
    wx.showLoading({
      title: '加载中',
    })
    return getSongListDetail({ disstid })
  }
})