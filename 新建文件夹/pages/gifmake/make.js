/**
 * 获取这个小程序的实例
 */
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalHidden: true,
    gifData: {
      gifDemoUrl: '',
      gifType: 0,
      contents: ['第一句']
    },
    name: '',
    newGifConetents: [],
    qualityItems: [
      { name: '0', value: '偏低' },
      { name: '1', value: '标准', IsChecked: 'true' },
      { name: '2', value: '偏高' }  
    ],
    quality: 1,
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

    var newContents = gifData.contents.split('##$@?$?@$##');
    this.setData({
      gifData: {
        gifDemoUrl: gifData.gifDemoUrl,
        gifType:gifData.gifType,
        contents: newContents
      },
      name: name,
      newGifContents: newContents
    })
    
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
      this.setData({
        gifUrl: a.gifurl
      })
    });
    if (that.data.downloadStatus == 0) {
      console.log(1);
      wx.previewImage(
        { urls: [that.data.gifImgSrc] }
      );
    }
    else {
      console.log(2);
      wx.showLoading({ title: '正在下载中...' });
      wx.downloadFile({
        url: that.data.gifUrl,
        type: 'image',
        success: function (res) {
          wx.hideLoading();
          wx.showToast({
            title: '图片成功下载',
            icon: 'none'
          });
          that.setData({
            gifImgSrc: res.tempFilePath,
            downStatues: 0
          });
          wx.previewImage({
            urls: [that.data.gifImgSrc],
          })
        },
        fail: function (res) {
          wx.hideLoading();
          wx.showToast({
            title: '生成失败，请稍后重试',
            icon: 'none'
          })
        }
      })
    }
  },
  makeupGif(callback) {
    wx.showLoading({ title: '动图生成中...'}),
    wx.request({
      url: 'https://gifmaker.develophelper.com/gif/make',
      method: 'POST',
      data:{
        from: 1,
        tplid: this.data.gifData.gifType,
        quality: this.data.quality,
        content: this.data.newGifContents.join('##$@?$?@$##')
      },
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data.gifurl);
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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