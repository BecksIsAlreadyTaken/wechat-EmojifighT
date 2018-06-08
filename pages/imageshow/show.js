var app = getApp();

var util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gifUrl: '',
    imgName: '',
    newName: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var gifUrl = app.globalData.viewGifUrl;
    var name = app.globalData.name;
    // var thumbnail = app.globalData.thumbnail;
    this.setData({
        gifUrl: gifUrl,
        imgName: name
    });
  },

  bindInput(event){
      var newName = event.detail.value;
      this.setData({
        newName: newName
      });
  },
   
  errmsg(event){
    wx.getStorage({
      key: 'history',
      success: function(res) {
        var items = new Array();
        items = res.data;
        var target = {
          name: app.globalData.name,
          gifUrl: app.globalData.viewGifUrl,
          thumbnail: app.globalData.thumbnail
        };
        let i = 0;
        for(;i<items.length;i++){
          if(items[i].gifUrl == target.gifUrl)
            break;
        }
        items.splice(i,1);
        wx.setStorage({
          key: 'history',
          data: items,
        });
        app.globalData.viewGifUrl = null;
        app.globalData.name = null;
        app.globalData.thumbnail = null;
      },
    });
    // TODO: 弹出资源不存在 点击确定后返回
    wx.navigateBack({
      url: '../history/history'
    });
  },
 
  bindModifyBtnTap(event){
    if(this.data.newName==''||this.data.newName === this.data.imgName) {
      this.setData({newName:''});
      return;
    }
    else {
      var newName = this.data.newName;
      var oldName = this.data.imgName;
      var url = this.data.gifUrl;
      wx.getStorage({
        key: 'history',
        success: function(res) {
          var items = new Array();
          items = res.data;
          items.forEach(function(item){
            if(item.name === oldName && item.gifUrl === url){
              item.name = newName;
              app.globalData.name = newName;
            }
          });
          wx.setStorage({
            key: 'history',
            data: items,
          });
        },
      });
    }
    // TODO: 弹出修改成功
  },

  /**
   * 点击图片，显示图片
   */
  bindGifImageTap(event) {
    wx.previewImage(
      { urls: [event.currentTarget.dataset.src] }
    )
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