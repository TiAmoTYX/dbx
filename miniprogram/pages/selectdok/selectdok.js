var util = require('../../utils/utils.js');

const db = wx.cloud.database()
const _ = db.command;
Page({
  data: {
    wtemperature: 0
  },
  add: function() {
    wx.showLoading({
      title: '',
      mask: true
    })
    var wy = wx.getStorageSync('wy')
    var detailId = ''
    if(wy == 'w'){
      var data = {
        userId: wx.getStorageSync('userId'),
        openId: wx.getStorageSync('openId'),
        username: wx.getStorageSync('username'),
        avaterUrl: wx.getStorageSync('avater'),
        gender: wx.getStorageSync('gender'),
        province: wx.getStorageSync('province'),
        wtext: wx.getStorageSync('wtext'),
        wmood: wx.getStorageSync('wmood'),
        wway: wx.getStorageSync('wway'),
        temperature: wx.getStorageSync('wnum') * 10,
        wtime: util.formatTime(new Date())
      }
      db.collection('bao').add({
        data: data,
        success: res => {
          console.log('bao存入成功')
          data = {
            userId: wx.getStorageSync('userId'),
            openId: wx.getStorageSync('openId'),
            username: wx.getStorageSync('username'),
            avaterUrl: wx.getStorageSync('avater'),
            gender: wx.getStorageSync('gender'),
            province: wx.getStorageSync('province'),
            wtext: wx.getStorageSync('wtext'),
            wmood: wx.getStorageSync('wmood'),
            wway: wx.getStorageSync('wway'),
            temperature: wx.getStorageSync('wnum') * 10,
            wtime: util.formatTime(new Date()),
            detailId: res._id
          }
          db.collection('userbao').add({
            data: {
              data
            },
            success: res => {
              console.log('bao存入成功')
            }
          })
          db.collection('baotexts').add({
            data: data,
            success: res => {
              wx.showToast({
                title: '点爆成功',
              })
              setTimeout(() => {
                wx.navigateTo({
                  url: '../selectok/selectok'
                })
              }, 1000)
              wx.hideLoading()
            }
          })
        }
      })
    }
    if(wy == 'y'){
      var data = {
        userId: wx.getStorageSync('userId'),
        openId: wx.getStorageSync('openId'),
        username: wx.getStorageSync('username'),
        gender: wx.getStorageSync('gender'),
        province: wx.getStorageSync('province'),
        avaterUrl: wx.getStorageSync('avater'),
        filename: wx.getStorageSync('filename'),
        fileIDy: wx.getStorageSync('fileIDy'),
        ymood: wx.getStorageSync('ymood'),
        yway: wx.getStorageSync('wway'),
        temperature: wx.getStorageSync('wnum') * 10,
        ytime: util.formatTime(new Date())
      }
      db.collection('bao').add({
        data: data,
        success: res => {
          console.log('bao存入成功')
          data = {
            userId: wx.getStorageSync('userId'),
            openId: wx.getStorageSync('openId'),
            username: wx.getStorageSync('username'),
            gender: wx.getStorageSync('gender'),
            province: wx.getStorageSync('province'),
            avaterUrl: wx.getStorageSync('avater'),
            filename: wx.getStorageSync('filename'),
            fileIDy: wx.getStorageSync('fileIDy'),
            ymood: wx.getStorageSync('ymood'),
            yway: wx.getStorageSync('wway'),
            temperature: wx.getStorageSync('wnum') * 10,
            ytime: util.formatTime(new Date()),
            detailId: res._id
          }
          db.collection('userbao').add({
            data: data,
            success: res => {
              console.log('bao存入成功')
            }
          })
          db.collection('baoyuyins').add({
            data: data,
            success: res => {
              wx.showToast({
                title: '点爆成功',
              })
              setTimeout(() => {
                wx.navigateTo({
                  url: '../selectok/selectok'
                })
              }, 1000)
              wx.hideLoading()
            }
          })
        }
      })
    }
  },
  //封存
  fengcun: function(){
    wx.showLoading({
      title: '',
      mask: true
    })
    var wy = wx.getStorageSync('wy')
    if (wy == 'w') {
      var data = {
        userId: wx.getStorageSync('userId'),
        openId: wx.getStorageSync('openId'),
        username: wx.getStorageSync('username'),
        gender: wx.getStorageSync('gender'),
        province: wx.getStorageSync('province'),
        avaterUrl: wx.getStorageSync('avater'),
        wtext: wx.getStorageSync('wtext'),
        wmood: wx.getStorageSync('wmood'),
        wway: wx.getStorageSync('wway'),
        temperature: wx.getStorageSync('wnum') * 10,
        wtime: util.formatTime(new Date())
      }
      db.collection('fengcun').add({
        data: data,
        success: res => {
          wx.showToast({
            title: '封存成功',
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '../selectok/selectok'
            })
          }, 1000)
          wx.hideLoading()
        }
      })
    }
    if (wy == 'y') {
      var data = {
        userId: wx.getStorageSync('userId'),
        openId: wx.getStorageSync('openId'),
        username: wx.getStorageSync('username'),
        gender: wx.getStorageSync('gender'),
        province: wx.getStorageSync('province'),
        avaterUrl: wx.getStorageSync('avater'),
        filename: wx.getStorageSync('filename'),
        fileIDy: wx.getStorageSync('fileIDy'),
        ymood: wx.getStorageSync('ymood'),
        yway: wx.getStorageSync('wway'),
        temperature: wx.getStorageSync('wnum') * 10,
        ytime: util.formatTime(new Date())
      }
      db.collection('fengcun').add({
        data: data,
        success: res => {
          wx.showToast({
            title: '封存成功',
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '../selectok/selectok'
            })
          }, 1000)
          wx.hideLoading()
        }
      })
    }
  },
  onLoad: function() {
    let temperature = wx.getStorageSync('wnum')*10
    this.setData({
      wtemperature: temperature
    })
  }
})