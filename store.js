const innerAudioContext = wx.getBackgroundAudioManager()
import { getMusicVKey } from './api/index'
export default {
  data: {
    recommendData: {},
    focus: [],
    new_song: [],
    toplist: [],
    currentSong: {},
    currentIndex: -1,
    bgAudio: null,
    isPlayMusic: false,
    playList: []
  },
  logMotto: function () {
    console.log(this.data.motto)
  },
  setIsPlay: function(flag) {
    this.data.isPlayMusic = flag
  },
  initFun: function() {
    innerAudioContext.onTimeUpdate(() => {
      // 暂停状态设置为播放
      if(this.data.isPlayMusic === false&& !innerAudioContext.paused) {
        this.data.isPlayMusic = true
        this.update()
      }
    })

    innerAudioContext.onPause( () => {
      this.data.isPlayMusic = false
      this.update()
    })
    innerAudioContext.onEnded(() => {
      console.log("播放结束")
    })
    innerAudioContext.onError(() => {
      console.log("播放错误")
    })
  },
  toggleMusic:function() {
    if(this.data.isPlayMusic === false && innerAudioContext.paused ===  true) {
      // 暂停中
      this.data.isPlayMusic = true
      innerAudioContext.play()
      this.update()
    } else if(this.data.isPlayMusic === true && innerAudioContext.paused === false){
      // 播放中
      this.data.isPlayMusic = false
      innerAudioContext.pause()
      this.update()
    }
  },
  setCurrentSong: function(song) {
    if(song.songmid) {
      getMusicVKey({ songmid: song.songmid }).then(res => {
        if(res.data.response.req_0.data.midurlinfo[0].vkey !== ''){
          song.src = res.data.response.playLists[0]
          this.data.currentSong = song
          innerAudioContext.src = song.src
          innerAudioContext.title = song.title
          innerAudioContext.coverImgUrl = song.cover
          this.setIsPlay(true)
          var index = this.data.playList.findIndex( item => item.songmid === song.songmid )
          console.log(index)
          if(index > -1) {
            this.data.playList.unshift(song)
            this.data.currentIndex = 0
          } else {
            this.data.currentIndex = index
          }
          this.update()
        }else{
          console.log('vip')
        }
      })
    } 
  },
  resSetPlayList: function() {

  },
  setIndex: function(index) {

  }

  //默认 false，为 true 会无脑更新所有页面和组件
  // updateAll: true
}

