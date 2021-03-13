// components/playList/playList.js
import create from '../../utils/create'

create({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    playList: [],
    showPlayList: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    closePlayList() {
      this.store.data.showPlayList = false
      this.store.update()
    }
  }
})
