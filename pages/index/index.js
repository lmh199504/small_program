//index.js
//获取应用实例
const app = getApp()
const innerAudioContext = wx.getBackgroundAudioManager()
import create from '../../utils/create'
import store from '../../store'
import { getRecommend,getMusicVKey } from '../../api/index'
import Song from '../../utils/Song'
const computedBehavior = require('miniprogram-computed')
create(store, {
  behaviors: [computedBehavior],
  data: {
    showMyLove:false,
    searchSongList:[],
    currentTab: 0,
    swiperH: '',//swiper高度
    nowIdx: 0,//当前swiper索引
    focus: [],
    new_song: [],
    currentSong: {},
    isPlayMusic: false
  },
  watch: {
    'nowIdx': function() {
      console.log('nowIndex')
    } 
  },
  //顶部导航栏的切换
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  swiperChangeTabbar: function (e) {
    this.setData({
      currentTab: e.detail.current,
    })
  },

  onLoad: function () {
    this.store.initFun()
  },
  onShow(){
    getRecommend().then(res => {
      this.store.data.focus = res.data.response.focus.data.content
      this.store.data.new_song = res.data.response.new_song.data.songlist
      var tempList = []
      var toplist = res.data.response.toplist.data.group
      for(var i = 0;i<toplist.length;i++){
        tempList = tempList.concat(toplist[i].toplist)
      }
      this.store.data.toplist = tempList
      this.update();
    })
  },
  playOneSong(e) {
    const song = new Song(e.currentTarget.dataset.item)
    this.store.setCurrentSong(song)
    this.update()
  }
})
