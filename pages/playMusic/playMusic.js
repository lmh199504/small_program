// pages/playMusic/playMusic.js
const app = getApp()
const innerAudioContext = app.globalData.innerAudioContext
import create from '../../utils/create'
import store from '../../store'
create(store,{

  /**
   * 页面的初始数据
   */
  data: {
    isPlayMusic: app.globalData.isPlayMusic,
    currentMode: 'xindong',
    currentModeImg: '../../src/images/mode.png',
    isMusicCover: true,
    musicTime: {
      duration: 0,
      currentTime: 0,
      progress: 0
    },
    timer: null,
    progress: 0,
    currentSong: {},
    showPlayList: false // 显示播放列表
  },
  showList() {
    this.store.data.showPlayList = true
    this.store.update()
  },
  //播放事件
  playMusic() {
    this.store.toggleMusic()
  },
  nextMusic() {
    this.store.playNext()
  },
  prevMusic() {
    this.store.playPre()
  },
  //切换模式
  changeMode() {
    var mode = ['xindong', 'suiji', 'danqu', 'liebiao'];
    var modeImg = ['../../src/images/mode.png', '../../src/images/suiji.png', '../../src/images/loopone.png', '../../src/images/loop.png']
    var index;
    // this.currentMode
    mode.forEach((value, i) => {
      if (this.data.currentMode == value) {
        index = i;
      }
    })

    if (index == mode.length - 1) {
      index = -1
    }
    this.setData({ currentMode: mode[index + 1] })
    this.setData({ currentModeImg: modeImg[index + 1] })
    console.log(this.data.currentMode)

  },


  changeCover() {
    this.setData({
      isMusicCover: !this.data.isMusicCover
    })
  },


  //下载

  downMusic() {
    wx.showToast({
      title: '下载个鬼啊',
      icon: 'success',
      duration: 2000
    })
    wx.downloadFile({
      url: this.data.musicList[this.data.currentIndex].src, //仅为示例，并非真实的资源
      success(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {

          const tempFilePaths = res.tempFilePath
          console.log(tempFilePaths)
          wx.saveFile({
            tempFilePath: tempFilePaths,
            success(res) {
              console.log(res)
              const savedFilePath = res.savedFilePath;
              wx.showToast({
                title: '下载成功',
                icon: 'success',
                duration: 2000
              })
            }
          })



        }
      }
    })
  }
})