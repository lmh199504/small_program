// components/playAudio.js



import create from '../../utils/create'

create({
  /**
   * 组件的属性列表
   */
  /**
   * 组件的初始数据
   */
  data: {
    currentSong: {},
    isPlayMusic: false,
    showPlayList: false //显示播放列表
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
    },
    showList() {
      this.store.data.showPlayList =  true
      this.store.update()
    }
  },


})
