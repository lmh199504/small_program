// pages/singerDetail/singerDetail.js
import Parser from '../../utils/xmldom/dom-parser'
import { getSingerDesc, getSingerStarNum, getSingerHotsong,getSingerAblumList,getSingerMV } from '../../api/index'
import { formatNum } from '../../utils/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    desc: '',
    basic: '',
    singer_pic: '',
    fanNum: 0,
    singer_name: '',
    tabIndex: 0,
    hotSong: [],
    albumList: [],
    mvList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getSingerDesc(options.singerMid)
    wx.setNavigationBarTitle({
      title: options.singer_name
    })
    this.setData({
      singer_pic:options.singer_pic,
      singer_name: options.singer_name
    })

    this.getSingerStarNum(options.singerMid)
    this.getSingerHotsong(options.singerMid)
    this.getSingerAblumList(options.singerMid)
    this.getSingerMV(options.singerMid)
  },

  getSingerDesc(singermid) {
    getSingerDesc({singermid}).then(res => {
      var XMLParser = new Parser.DOMParser()
      var doc = XMLParser.parseFromString(res.data.response)
      var desc = doc.getElementsByTagName('desc')[0].firstChild.nodeValue
      var text = ''
      var basicChild = doc.getElementsByTagName('basic')[0].childNodes
      for( var i = 0;i< basicChild.length;i++ ){
        for ( var j = 0;j<basicChild[i].childNodes.length;j++ ) {
          var item = basicChild[i].childNodes[j]
          if(j === 0){
            text += item.firstChild.nodeValue+ ':' 
          }else{
            text += item.firstChild.nodeValue + ' '
          }
        }
      }
      this.setData({
        desc: desc,
        basic: text
      })
    })
  },
  getSingerStarNum(singermid) {
    getSingerStarNum({singermid}).then(res => {
      this.setData({
        fanNum: formatNum(res.data.response.num)
      })
    })
  },
  getSingerHotsong(singermid) {
    getSingerHotsong({singermid}).then(res => {
      this.setData({
        hotSong: res.data.data.singerSongList.data.songList
      })
    })
  },
  getSingerAblumList(singermid) {
    getSingerAblumList({singermid}).then(res => {
      this.setData({
        albumList: res.data.data.getAlbumList.data.albumList
      })
    })
  },
  getSingerMV(singermid) {
    getSingerMV({singermid}).then(res => {
      this.setData({
        mvList: res.data.response.data.list
      })
    })
  },
  swichNav(e) {
    var that = this;
    if (this.data.tabIndex === e.target.dataset.index) {
      return false;
    } else {
      that.setData({
        tabIndex: e.target.dataset.index,
      })
    }
  },
  swiperChangeTabbar(e) {
    this.setData({
      tabIndex: e.detail.current,
    })
  },
  checkMore() {
    this.setData({
      tabIndex: 3
    })
  }
})