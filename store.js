export default {
  data: {
    recommendData: {},
    focus: [],
    new_song: [],
    toplist: [],
    currentSong: {},
    currentIndex: -1,
    bgAudio: null
  },
  logMotto: function () {
    console.log(this.data.motto)
  },
  //默认 false，为 true 会无脑更新所有页面和组件
  // updateAll: true
}