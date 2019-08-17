//录音管理
const recorderManager = wx.getRecorderManager()
//音频组件控制
const innerAudioContext = wx.createInnerAudioContext()
var tempFilePath;
Page({
  data: {
    navber: ['文字记录', '语音记录'],
    currentTab: 0,
    wtext: '',//文本
    wmood: '红色',//心情red,black
    ytempFilePath: '',
    ymood: '红色',
    theplay: true,//监听是否在录音
  },
  //监听页面显示,判断是否登录
  onShow: function () {
    let userOpenId = wx.getStorageSync('openId')
    if (!userOpenId) {
      wx.showToast({
        title: '请先登录~'
      })
      setTimeout(() => {
        wx.switchTab({
          url: '../user/user',
        })
      }, 1500)
    } else {
      console.log(userOpenId)
    }
  },
  //文爆与音爆导航切换
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.index
    })
  },
  // 文爆，输入文本事件
  textInput: function(e){
    this.setData({
      wtext: e.detail.value
    })
  },
  //文爆，单选按钮组
  changeMood:function(e){
    this.setData({
      wmood: e.detail.value
    })
  },
  //文爆，点爆按钮跳转
  dianbao: function(e) {
    let wtext = this.data.wtext
    let wmood = this.data.wmood
    var wy = 'w'
    if(this.data.currentTab == 0){
      if (wtext == ''){
        wx.showToast({
          title: '请输入点爆内容',
        })
      }else{
        //将数据保存到本地，保存文爆判断
        wx.setStorageSync('wtext', wtext)
        wx.setStorageSync('wmood', wmood)
        wx.setStorageSync('wy', wy)
        //跳转页面
        wx.navigateTo({
          url: '../selectbao/selectbao'
        })
      }
    }
  },
  //音爆，单选按钮组
  changeMoody: function (e) {
    this.setData({
      ymood: e.detail.value
    })
  },
  //按钮点下开始录音
  touchdown: function(){
    const options = {
      duration: 300000,//指定录音的时长，单位 ms
      sampleRate: 16000,//采样率
      numberOfChannels: 1,//录音通道数
      encodeBitRate: 96000,//编码码率
      format: 'mp3',//音频格式，有效值 aac/mp3
      frameSize: 50,//指定帧大小，单位 KB
    }
    //开始录音
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('recorder start')
    })
    //错误回调
    recorderManager.onError((res) => {
      console.log(res)
    })
  },
  //停止录音
  touchup: function () {
    wx.showLoading({
      title: '',
      mask: true
    })
    recorderManager.stop();
    recorderManager.onStop((res) => {
      this.tempFilePath = res.tempFilePath
      const { tempFilePath } = res
      //查询用户已有语音，记录，并为文件赋值
      //获取数据库引用
      const db = wx.cloud.database()
      const _ = db.command
      console.log('openId',wx.getStorageSync('openId'))
      //查找数据库,获得用户语音数量
      db.collection('users').where({
        _openid: wx.getStorageSync('openId')
      }).get({
        success(res) {
          // res.data 是包含以上定义的记录的数组
          console.log('查询用户:', res)
          //将名字定为id号+个数号+.mp3
          var newyuyin = res.data[0].yuyin + 1
          var filename = wx.getStorageSync('openId') + newyuyin + '.mp3'
          //调用云函数，修改语音数量，向云函数传值
          wx.cloud.callFunction({
            name: 'updateYuyin',
            data: {
              openId: wx.getStorageSync('openId'),
              yuyin: newyuyin
            },
            success: res => {
              //上传录制的音频到云
              wx.cloud.uploadFile({
                cloudPath: 'yuyin/' + filename,
                filePath: tempFilePath, // 文件路径
                success: res => {
                  console.log(res.fileID)
                  //保存fileID用于播放云文件语音
                  wx.setStorageSync('fileIDy', res.fileID)
                  //将数据保存到本地
                  wx.setStorageSync('filename', filename)
                  wx.setStorageSync('ytempFilePath', tempFilePath)
                  //关闭加载
                  wx.hideLoading()
                  //跳转到听语音的页面
                  wx.navigateTo({
                    url: '../yuyinbao/yuyinbao'
                  })
                },
                fail: err => {
                  // handle error
                  console.error(err)
                }
              })
            }
          })
        },
        fail: err => {

        }
      })
    })
    setTimeout((() => {
      //关闭加载
      wx.hideLoading()
    }), 4000)
  },
  //音爆，点爆按钮跳转
  ydianbao: function (e) {
      wx.showToast({
        title: '请输入点爆语音',
      })
  }
})