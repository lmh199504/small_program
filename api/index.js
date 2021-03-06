import request from './request'
export const getRecommend = (data) => request('/getRecommend', 'GET', data)

export const getHomeClassifid = (data) => request('/getHomeClassifid', 'GET', data)
export const getSongListDetail = (data) => request('/getSongListDetail', 'GET', data)
export const getHomeNewSong = (data) => request('/getHomeNewSong', 'GET', data)
export const getRadioLists = (data) => request('/getRadioLists', 'GET', data)
export const getSingerList = (data) => request('/getSingerList', 'GET', data)
export const getSingerDesc = (data) => request('/getSingerDesc', 'GET', data)
export const getSingerStarNum = (data) => request('/getSingerStarNum', 'GET', data)
export const getSingerHotsong = (data) => request('/getSingerHotsong', 'GET', data)
export const getSingerAblumList = (data) => request('/getSingerAblumList', 'GET', data)
export const getSingerMV = (data) => request('/getSingerMV', 'GET', data)
export const getSmartbox = (data) => request('/getSmartbox', 'GET', data)
export const getHotkey = (data) => request('/getHotkey', 'GET', data)
export const getMV = (data) => request('/getMV', 'GET', data)
export const getDigitalAlbumLists = (data) => request('/getDigitalAlbumLists', 'GET', data)
export const getMusicVKey = (data) => request('/getMusicVKey', 'GET', data)
export const getRadioSong = (data) => request('/getRadioSong', "GET", data)
// 获取歌词信息
export const reqGetLyric = (data) => request('/getLyric',"GET", data)
//获取MV播放信息 vid
export const reqGetMvPlay = (data) => request('/getMvPlay',"GET", data)