const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatMusicTime = second => {
  var second =  parseInt(second)
  var s = second % 60
  var m = parseInt( second / 60)
  if (s < 9) {
    s = '0' + s
  }
  if(m < 9) {
    m =  '0' + m
  }
  console.log(m + ':' + s)
  return m + ':' + s
}


module.exports = {
  formatTime: formatTime,
  formatMusicTime
}
