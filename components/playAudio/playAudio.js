// components/playAudio.js


const app = getApp()
import create from '../../utils/create'
const innerAudioContext = wx.getBackgroundAudioManager()
create({
  /**
   * 组件的属性列表
   */
  /**
   * 组件的初始数据
   */
  data: {
    currentSong: {},
    isPlayMusic: false
  },

  /**
   * 组件的方法列表
   */
  lifetimes: {

    ready: function () {
      //you can use this.store here
     },
  },
  methods: {
    playMusic() {
      this.store.toggleMusic()
    },
    toMusciList(){
      wx.navigateTo({
        url: '../../pages/playMusic/playMusic',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },


})
