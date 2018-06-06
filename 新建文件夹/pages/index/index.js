//index.js
//获取应用实例
const app = getApp()

function getImglistData() {
  let images = [
    '../image/1.jpg',
    '../image/2.jpg',
    '../image/3.jpg',
    '../image/4.jpg',
    '../image/5.jpg',
    '../image/6.jpg',
    '../image/7.jpg',
    '../image/8.jpg',
    '../image/9.jpg',
    '../image/10.jpg',
  ]
  images = images.concat(images.slice(0, 0))
  return images.map(item => {
    return {
      src: item
    }
  })
}

Page({
  data: {
    array: getImglistData(),
    /*华丽的分割线，这下面的才是重头戏*/
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
      url: 'https://gifmaker.develophelper.com/gif/category',
      //url: 'http://www.moodiary.top:8080/gif/category',
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