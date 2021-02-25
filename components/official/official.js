// components/official/official.js
import { getHomeClassifid } from '../../api/index'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    songListData: {
      type:Object,
      value: {
        id: ''
      },
      observer:function (newVal,oldVal) {
        this.getHomeClassifid().then(res => {
          if(res.data.data.code === 0){
            this.setData({
              list: res.data.data.recomPlaylist.data.v_hot
            })
          }
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getHomeClassifid() {
     return getHomeClassifid({ titleid: this.data.songListData.id })
    }
  }
})
