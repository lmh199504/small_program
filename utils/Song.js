class Song{
  constructor(item) {
    this.songmid = item.mid
    this.singer = item.singer
    this.title = item.title
    this.interval = item.interval
    this.cover = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.mid}.jpg?max_age=2592000`
          // `https://y.gtimg.cn/music/photo_new/T002R90x90M000${item.album.mid}.jpg?max_age=2592000`
    this.src = item.src || ''
    this.checked = false
    this.album = item.album
    this.albumName = item.album.name
  }
}
export default Song