// components/search/search.js
import { getSmartbox,getHotkey } from '../../api/index'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    songSearch: '',
    resultSong: [],
    resultSinger: [],
    hotKey: [],
    showResult: false
  },

  /**
   * 组件的方法列表
   */
  lifetimes: {
    created() {
      this.getHotkey()
    }
  },
  methods: {
    searchSong(e)　{
      const { value } = e.detail
      clearTimeout(this.timer)
      if(value) {
        this.timer = setTimeout(() => {
          console.log('发送请求')
          getSmartbox({key: value}).then(res => {
            this.setData({
              resultAblum:res.data.response.data.album.itemlist,
              resultMv:res.data.response.data.mv.itemlist,
              resultSinger:res.data.response.data.singer.itemlist,
              resultSong:res.data.response.data.song.itemlist
            })
          })
        },500)
      }
    },
    getHotkey() {
      getHotkey().then(res => {
        var temp = res.data.response.data.hotkey
        temp.length = 10
        this.setData({
          hotKey: temp
        })
      })
    },
    bindfocus() {
      this.setData({
        showResult: true
      })
    },
    bindblur() {
      setTimeout(() => {
        this.setData({
          showResult:false
        })
      },200)
    },
    toSingerDetail(e) {
      var { singer } = e.currentTarget.dataset
      wx.navigateTo({
        url: `/pages/singerDetail/singerDetail?singerMid=${ singer.mid }&singer_name=${ singer.name }&singer_pic=${ singer.pic }`,
      })
    }
  }
})
