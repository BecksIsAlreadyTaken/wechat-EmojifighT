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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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