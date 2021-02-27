const innerAudioContext = wx.getBackgroundAudioManager()
export default {
  data: {
    recommendData: {},
    focus: [],
    new_song: [],
    toplist: [],
    currentSong: {},
    currentIndex: -1,
    bgAudio: null,
    isPlayMusic: false
  },
  logMotto: function () {
    console.log(this.data.motto)
  },
  setIsPlay: function(flag) {
    console.log(flag)
    this.data.isPlayMusic = flag
  },
  initFun: function() {
    innerAudioContext.onTimeUpdate(() => {
      if(this.data.isPlayMusic === false&& !innerAudioContext.paused) {
        this.data.isPlayMusic = true
        this.update()
      }
    })

    innerAudioContext.onPause( () => {
      this.data.isPlayMusic = false
      this.update()
    })
  },
  toggleMusic:function() {
    if(this.data.isPlayMusic === false && innerAudioContext.paused ===  false) {
      // 暂停中
      this.data.isPlayMusic = true
      innerAudioContext.play()
      this.update()
    } else {
      // 播放中
      this.data.isPlayMusic = false
      innerAudioContext.pause()
      this.update()
    }
  }

  //默认 false，为 true 会无脑更新所有页面和组件
  // updateAll: true
}

