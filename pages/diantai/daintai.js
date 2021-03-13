// pages/meiri/meiri.js
import Song from '../../utils/Song'
import create from '../../utils/create'
import store from '../../store'
import { getRadioLists,getRadioSong } from '../../api/index'
create(store,{

  /**
   * 页面的初始数据
   */
  data: {
    radioList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRadioLists()
    wx.setNavigationBarTitle({
      title: "电台"
    })
  },
  getRadioLists() {
    getRadioLists().then(res => {
      this.setData({
        radioList: res.data.response.data.data.groupList
      })
    }).catch(() => {

    })
  },
  playAll(e) {
    const radioid =  e.currentTarget.dataset.radioid
    let songList = []
    getRadioSong({
      radioId: radioid
    }).then(res => {
      var track_list = res.data.data.songlist.data.track_list
      for(var i = 0;i < track_list.length; i++){
        songList.push(new Song(track_list[i]))
      }
      this.store.resetPlayList(songList)
    })
  }
})