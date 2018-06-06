var app = getApp();

var util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gifUrl: '',
    imgName: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var gifUrl = app.globalData.viewGifUrl;
    var timestamp = util.formatTime(new Date);
    var thumbnail = app.globalData.thumbnail;
    this.setData({
        gifUrl: gifUrl,
        imgName: timestamp
    })
    wx.setStorage({
        key: 'history',
        data: {
            name: timestamp,
            gifUrl: gifUrl,
            thumbnail: thumbnail
        },
    })
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})