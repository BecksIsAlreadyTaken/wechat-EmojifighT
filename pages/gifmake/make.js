/**
 * 获取这个小程序的实例
 */
var app = getApp();
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    thumbnail: '',
    modalHidden: true,
    gifData: {
      gifDemoUrl: '',
      gifType: 0,
      contents: ['第一句']
    },
    name: '',
    newGifConetents: [],
    gifImgsrc: '',
    gifUrl: '',
    downloadStatues: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var gifData = app.globalData.gifData;
    var name = app.globalData.name;
    var thumbnail = gifData.thumbnail;
    var newContents = gifData.contents.split('##$@?$?@$##');
    this.setData({
      gifData: {
        gifDemoUrl: gifData.gifDemoUrl,
        gifType:gifData.gifType,
        contents: newContents
      },
      name: name,
      newGifContents: newContents,
      thumbnail: thumbnail
    })
    
  },
  
  /**
   * 输入文本
   */
  bindInput(event) {
    var detail = event.detail.value;
    var index = event.currentTarget.dataset.index;
    this.data.newGifContents[index] = detail;
  },

  /**
   * 点击生成按钮，跳转到“图片显示”页面
   */
  bindMakeupBtnTap(event) {
    var that = this;
    that.makeupGif((a) => {
      app.globalData.thumbnail = this.data.thumbnail;
      app.globalData.viewGifUrl = a.gifurl;
      var timestamp = util.formatTime(new Date);
      app.globalData.name = timestamp;
      wx.getStorage({
        key: 'history',
        success: function(res) {
          var newData = new Array();
          newData = res.data;
          newData.push({
            name: app.globalData.name,
            gifUrl: app.globalData.viewGifUrl,
            thumbnail: app.globalData.thumbnail
          });
          wx.setStorage({
            key: 'history',
            data: newData,
          });
        },
        fail: function(res){
          
        }
      });
      wx.navigateTo({
          url: '../imageshow/show',
      });
    });

  },
  makeupGif(callback) {
    wx.showLoading({ title: '动图生成中...'}),
    wx.request({
      url: 'https://www.moodiary.top/gif/make',
      method: 'POST',
      data:{
        from: 1,
        templateId: this.data.gifData.gifType,
        content: this.data.newGifContents.join('##$@?$?@$##')
      },
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        
        wx.hideLoading();
        if (res.data.m == 0)
          callback(res.data.d);
        else
          wx.showToast({
            title: '服务器繁忙，请稍后再试',
            icon: 'none'
          })
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({
          title: '服务器繁忙，请稍后再试',
          icon: 'none'
        })
      }
    })
  },

  bindGifImageTap(event) {
    wx.previewImage(
      { urls: [event.currentTarget.dataset.src] }
    )
  }
})