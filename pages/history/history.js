var app = getApp();
var util = require("../../utils/util.js");
// pages/history/history.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'history',
      success: function(res) {
        var list = new Array();
        list = res.data;
        that.setData({
          list: list  
        });
      },
    });
  },

  bindViewTap(event){
    var item = event.currentTarget.dataset.item;
    app.globalData.thumbnail = item.thumbnail;
    app.globalData.viewGifUrl = item.gifUrl;
    app.globalData.name = item.name;
    wx.navigateTo({
      url: '../imageshow/show',
    });
  }

 
})