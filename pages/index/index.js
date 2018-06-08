//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    currentPage: 1,
    packetDatas: [],
  },

  imageError: function (e) {
    console.log('image3发生error事件，携带值为', e.detail.errMsg)
  },
  /*--------------------------------------------------- */
  /*初始载入函数*/
  onLoad: function (options) {
    var that = this;
    this.loadData(that, that.currentPage);
  },
  loadData(targetPage, callback) {
    var that = this;
    wx.request({
      //url: 'https://gifmaker.develophelper.com/gif/category',
      url: 'https://www.moodiary.top/gif/category',
      method: "GET",
      success: function (res) {
        if (res == null ||
          res.data == null ||
          res.data.m != 0) {
          console.error(res);
          return;
        }
        that.setData({
          packetDatas: res.data.d,
          hidden: true
        });

        that.currentPage = targetPage;

        if (callback) callback();
      }
    })
  },
  /*监听下拉动作 */
  onPullDownRefresh: function () {
    console.log("下拉刷新"),
    wx.stopPullDownRefresh(),
    wx.showNavigationBarLoading(),
    this.loadData(1,function () {
      wx.hideNavigationBarLoading()
    })
  },
  /**
   * 到达底部加载更多
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '加载更多中...'
    }),
      this.data.currentPage++ ,
      console.log(this.data.currentPage),
      this.loadData(this.data.currentPage, function () { wx.hideLoading() })
  },
  /**
   * 点击跳转页面
   */
  bindCellViewTap(temp) {
    var index = temp.currentTarget.dataset.idx;

    //利用这个globalData全局变量来传值给make/index
    app.globalData.gifData = this.data.packetDatas[index];
    app.globalData.name = this.data.packetDatas[index].name;
    wx.navigateTo({
      url: '../gifmake/make',
    })
  }
})