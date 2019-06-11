var app = getApp(); //获取应用实例

Page({
  data: {
    version: '',
    showLog: false
  },

  copyText: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },

  // saveqq(){
  //   wx.previewImage({
  //     // current: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1560955273,4108460138&fm=26&gp=0.jpg',
  //     urls: ['https://s2.ax1x.com/2019/06/08/VDC3AH.png'],
  //     success: (result) => {

  //     },
  //     fail: () => {},
  //     complete: () => {}
  //   });
  // },

  // savewx(){
  //   wx.previewImage({
  //     // current: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1560955273,4108460138&fm=26&gp=0.jpg',
  //     urls: ['https://s2.ax1x.com/2019/06/08/VDCrNj.jpg'],
  //     success: (result) => {

  //     },
  //     fail: () => {},
  //     complete: () => {}
  //   });
  // },

  onLoad: function () {
    this.setData({
      version: 1.2,
      year: new Date().getFullYear()
    });
  },

  toggleLog: function () {
    this.setData({
      showLog: !this.data.showLog
    });
  }
});