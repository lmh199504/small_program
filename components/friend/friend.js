// components/friend/friend.js
import { getSingerList } from '../../api/index'
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
    params: {
      area:-100,
      sex:-100,
      genre:-100,
      index:-100,
      sin:0,
      page:1
    },
    singerList: []
  },

  /**
   * 组件的方法列表
   */
  lifetimes: {
    created() {
      this.getSingerList()
    }
  },
  methods: {
    getSingerList() {
      wx.showLoading({
        title: '加载中...',
      })
      getSingerList(this.data.params).then(res => {
        var singerlist = res.data.response.singerList.data.singerlist
        var tempList = this.data.singerList.concat(singerlist)
        this.setData({
          singerList: tempList
        })
        wx.hideLoading()
      })
    },
    bindscrolltolower() {
      const { page } = this.data.params
      this.setData({
        params: {...this.data.params,page: page + 1}
      },() => {
        this.getSingerList()
      })
      
    }
  }
})
