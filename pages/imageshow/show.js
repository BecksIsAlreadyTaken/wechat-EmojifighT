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
    // 提示资源不存在 进行localStorage的删除操作 以及globalData的清空操作
    // 弹出带有确定按钮的窗口
    // 点击确定后跳转至历史记录页面
  },
 
  bindModifyBtnTap(event){
    console.log(this.data);
    if(this.data.newName==''||this.data.newName === this.data.imgName) {
      this.setData({newName:''});
    }
    else {
      var newName = this.data.newName;
      var oldName = this.data.imgName;
      var url = this.data.gifUrl;
      wx.getStorage({
        key: 'history',
        success: function(res) {
          var items = res.data;
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
      wx.navigateTo({
        url: '../imageshow/show',
      });
    }
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