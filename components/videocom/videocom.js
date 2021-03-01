// components/videocom/videocom.js
import { getMV  } from '../../api/index'
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
      area_id:15,
      version_id:7,
      page:1,
      order:1
    },
    mvList: []
  },

  /**
   * 组件的方法列表
   */
  lifetimes: {
    created() {
      this.getMV(this.data.params)
    }
  },
  methods: {
    getMV(params) {
      getMV(params).then(res => {
        var tempList = res.data.response.mv_list.data.list
        this.setData({
          mvList: this.data.mvList.concat(tempList)
        })
      })
    },
    bindscrolltolower() {
      const { page } = this.data.params
      this.setData({
        params:{...this.data.params, page: page + 1 }
      },() => {
        this.getMV({...this.data.params, page: page + 1 })
      })
    }
  }
})
