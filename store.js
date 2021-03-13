const innerAudioContext = wx.getBackgroundAudioManager()
import { getMusicVKey } from './api/index'
import { formatMusicTime } from './utils/util'
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
    playList: [],
    pauseType: -1,   // -1.默认 0.正常暂停 1.视频暂停
    musicTime: {
      currentTime: 0,
      duration: 0,
      progress:0
    },
    showPlayList: false // 显示播放列表
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
      this.playNext()

    })
    innerAudioContext.onError(() => {
      console.log("播放错误")
      this.playNext()
    })
    innerAudioContext.onTimeUpdate((e) => {
      var duration = innerAudioContext.duration
      var currentTime = innerAudioContext.currentTime
      this.data.musicTime.progress = (currentTime / duration) * 100
      duration = formatMusicTime(duration)
      currentTime = formatMusicTime(currentTime)
      this.data.musicTime.duration = duration
      this.data.musicTime.currentTime = currentTime
      this.data.musicTime.progress = 
      this.update()
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
          if(index > -1) {
            this.data.currentIndex = index
          } else {
            this.data.playList.unshift(song)
            this.data.currentIndex = 0
          }
          this.update()
        }else{
          console.log('vip')
        }
      })
    } 
  },
  resetPlayList: function(list) {
    if(list.length === 0) {
      return
    }
    this.data.playList = list
    this.data.currentIndex = 0
    this.setCurrentSong(list[0])
  },
  setIndex: function(index) {

  },
  playNext: function() {
    var { currentIndex, playList } =  this.data
    if (playList.length === 0) {
      return
    }
    currentIndex ++
    if (currentIndex >=  playList.length) {
      let song = playList[0]
      this.setCurrentSong(song)
    } else {
      let song = playList[currentIndex]
      this.setCurrentSong(song)
    }
  },
  playPre: function() {
    var { currentIndex, playList } =  this.data
    if (playList.length === 0) {
      return
    }
    currentIndex --
    if (currentIndex <= -1) {
      let song = playList[ playList.length - 1 ]
      this.setCurrentSong(song)
    } else {
      let song = playList[currentIndex]
      this.setCurrentSong(song)
    }

  }
  //默认 false，为 true 会无脑更新所有页面和组件
  // updateAll: true
}

