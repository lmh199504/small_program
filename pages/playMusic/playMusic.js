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
    duration: null,
    currentTime: 0,
    timer: null,
    progress: 0,
    currentSong: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
 

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //播放事件

  playMusic() {

    if (this.data.isPlayMusic == false) {
      innerAudioContext.play()
    } else {
      innerAudioContext.pause()
    }
    this.setData({ isPlayMusic: !this.data.isPlayMusic });
    app.globalData.isPlayMusic = this.data.isPlayMusic;


  },
  nextMusic() {
    //下一首
    clearInterval(this.data.timer)
    if (this.data.currentIndex + 1 == this.data.musicList.length) {
      this.setData({
        currentIndex: 0
      })
    } else {
      this.setData({
        currentIndex: this.data.currentIndex + 1
      })
    }
    innerAudioContext.coverImgUrl = this.data.musicList[this.data.currentIndex].cover;
    innerAudioContext.title = this.data.musicList[this.data.currentIndex].name;
    innerAudioContext.src = this.data.musicList[this.data.currentIndex].src;
    this.setData({
      currentMusicSinger: this.data.musicList[this.data.currentIndex].singer,
      currentMusicName: this.data.musicList[this.data.currentIndex].name,
      currentCover: this.data.musicList[this.data.currentIndex].cover,
      bgCover: this.data.musicList[this.data.currentIndex].cover
    })
    app.globalData.cover_img = this.data.musicList[this.data.currentIndex].cover;
    app.globalData.musicName = this.data.musicList[this.data.currentIndex].name;
    app.globalData.musicSinger = this.data.musicList[this.data.currentIndex].singer;
  },
  prevMusic() {
    // console.log('播放上一首')
    clearInterval(this.data.timer)
    if (this.data.currentIndex == 0) {
      this.setData({
        currentIndex: (this.data.musicList.length - 1)
      })
    } else {
      this.setData({
        currentIndex: this.data.currentIndex - 1
      })
    }
    innerAudioContext.coverImgUrl = this.data.musicList[this.data.currentIndex].cover;
    innerAudioContext.title = this.data.musicList[this.data.currentIndex].name;
    innerAudioContext.src = this.data.musicList[this.data.currentIndex].src;
    this.setData({
      currentMusicSinger: this.data.musicList[this.data.currentIndex].singer,
      currentMusicName: this.data.musicList[this.data.currentIndex].name,
      currentCover: this.data.musicList[this.data.currentIndex].cover,
      bgCover: this.data.musicList[this.data.currentIndex].cover
    })
    app.globalData.cover_img = this.data.musicList[this.data.currentIndex].cover;
    app.globalData.musicName = this.data.musicList[this.data.currentIndex].name;
    app.globalData.musicSinger = this.data.musicList[this.data.currentIndex].singer;
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