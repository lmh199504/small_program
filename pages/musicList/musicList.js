// pages/meiri/meiri.js
const app = getApp();
const innerAudioContext = app.globalData.innerAudioContext;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: app.globalData.currentIndex,
    musicList: [

    ],
    headImg:'',
    cover_img: app.globalData.cover_img,
    musicName: app.globalData.musicName,
    musicSinger: app.globalData.musicSinger,
    isPlayMusic: app.globalData.isPlayMusic
  },

  /**
   * 生命周期函数--监听页面加载
   */


  //参数： type = 1-新歌榜,2-热歌榜,11-摇滚榜,12-爵士,16-流行,21-欧美金曲榜,22-经典老歌榜,23-情歌对唱榜,24-影视金曲榜,25-网络歌曲榜
  onLoad: function (options) {
    if(options.type==1){
      this.setData({
        headImg:"http://m.qpic.cn/psb?/V11mh6Su0sFs6E/mgrhW2aHLYCN7hM2vkngAD4Zmw7*NRtXITzob1g9lJM!/b/dL4AAAAAAAAA&bo=OAQ4BDgEOAQRKR4!&rf=viewer_4"
      })
    }

    
    console.log(options)
    var musicArr = [];
    var that = this;
    wx.request({
      url: 'https://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.billboard.billList&type='+options.type+'&size=10&offset=0',
      success:function(res){
        if(res.data.song_list == null || res.data.song_list.length == 0){
          wx.showToast({
            title: '请求失败',
            type:'error'
          })
        }


        
        res.data.song_list.forEach(function (item) {
          musicArr.push({
            cover: item.pic_big,
            singer: item.artist_name,
            song_id: item.song_id,
            name: item.album_title
          })
        })
        
        that.setData({
          musicList: musicArr
        });
        if (that.data.isPlayMusic == false) {
          that.setData({
            cover_img: that.data.musicList[0].cover,
            musicName: that.data.musicList[0].name,
            musicSinger: that.data.musicList[0].singer
          })
          innerAudioContext.coverImgUrl = that.data.musicList[0].cover;
          innerAudioContext.title = that.data.musicList[0].name;
        } else {
          that.setData({
            cover_img: app.globalData.cover_img,
            musicName: app.globalData.musicName,
            musicSinger: app.globalData.musicSinger,
          })
        }
      }
    })
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


    this.setData({
      isPlayMusic: app.globalData.isPlayMusic
    })
    innerAudioContext.onEnded(() => {
      this.nextMusic();
    })
  },
  nextMusic() {
    //下一首
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
      musicSinger: this.data.musicList[this.data.currentIndex].singer,
      musicName: this.data.musicList[this.data.currentIndex].name,
      cover_img: this.data.musicList[this.data.currentIndex].cover

    })
    app.globalData.cover_img = this.data.musicList[this.data.currentIndex].cover;
    app.globalData.musicName = this.data.musicList[this.data.currentIndex].name;
    app.globalData.musicSinger = this.data.musicList[this.data.currentIndex].singer;
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
  playAll() {
    var that = this;
    var musicArr = [];
    this.data.musicList.forEach(function(item,i){
      var obj = {};
      wx.request({
        url: 'https://ting.baidu.com/data/music/links?songIds=' + that.data.musicList[i].song_id,
        success: function (res) {
          musicArr.push({
            cover:item.cover,
            name: item.name,
            singer: item.singer,
            src:res.data.data.songList[0].songLink
          })
        },complete:function(e){
          // console.log(e)
          console.log(musicArr)
          if(musicArr.length == 10){
            that.setData({
              musicName: musicArr[0].name,
              musicSinger: musicArr[0].singer,
              cover_img:musicArr[0].cover,
              musicList: musicArr,
              isPlayMusic:true
            });
            app.globalData.musicList = musicArr;
            app.globalData.musicName = musicArr[0].name;
            app.globalData.musicSinger = musicArr[0].singer;
            app.globalData.cover_img = musicArr[0].cover;
            innerAudioContext.src = musicArr[0].src;
            innerAudioContext.title = musicArr[0].name;
            innerAudioContext.singer = musicArr[0].singer;
            innerAudioContext.coverImgUrl = musicArr.cover;
            app.globalData.isPlayMusic = true;
          }
        }
      })
    })
    



    
  },
  playThis(e) {
    // console.log(e)
    var that = this;
    var src = '';
    var index = e.currentTarget.dataset.index;
    wx.request({
      url: 'https://ting.baidu.com/data/music/links?songIds=' + e.currentTarget.dataset.song_id,
      success:function(res){
        console.log(res)
        that.setData({
          musicName: res.data.data.songList[0].albumName,
          musicSinger: res.data.data.songList[0].artistName,
          cover_img: res.data.data.songList[0].songPicRadio,
          isPlayMusic:true
        })
        src = res.data.data.songList[0].songLink;
        innerAudioContext.src = res.data.data.songList[0].songLink;
        innerAudioContext.title = res.data.data.songList[0].albumName;
        innerAudioContext.coverImgUrl = res.data.data.songList[0].songPicRadio;
        innerAudioContext.singer = res.data.data.songList[0].artistName;


        app.globalData.isPlayMusic = true;
        var isPut = 0;
        app.globalData.musicList.forEach(function (item, i) {
          if (item.src == src) {
            isPut++
          }
        })
        if (isPut == 0) {
          console.log(that.data.musicList)
          app.globalData.musicList.unshift({
            cover: that.data.musicList[index].cover,
            singer: that.data.musicList[index].singer,
            src: src,
            name: that.data.musicList[index].name
          });
          console.log(app.globalData.musicList)
          app.globalData.musicName = app.globalData.musicList[0].name;
          app.globalData.musicSinger = app.globalData.musicList[0].singer;
          app.globalData.cover_img = app.globalData.musicList[0].cover;
          app.globalData.currentIndex = 0;
        }
      }
    })
   

  },
  changeStatus() {

    app.globalData.isPlayMusic = this.data.isPlayMusic;
    if (this.data.isPlayMusic == false) {
      innerAudioContext.play()
    } else {
      innerAudioContext.pause()
    }
    console.log(this.data.isPlayMusic)
    this.setData({
      isPlayMusic: !this.data.isPlayMusic
    })
  }
})