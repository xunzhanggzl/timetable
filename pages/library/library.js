// pages/library/library.js
// import Toast from '../../vant-weapp/toast/toast';
let util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: true,
    inputValue: '',
    content:[
      // {
      //   "author": "Flanagan, David.",
      //   "callNo": "TP312/F583",
      //   "docTypeName": "西文图书",
      //   "isbn": "9787564107680 :",
      //   "marcRecNo": "655658686574704a55722f61567446506d69437038513d3d",
      //   "num": 1,
      //   "pubYear": "2007.",
      //   "publisher": "东南大学出版社,",
      //   "title": "JavaScript : the definitive guide = JavaScript权威指南 / 第5版."
      // }, 
      // {
      //   "author": "David Flanagan著",
      //   "callNo": "TP312/F-485.2",
      //   "docTypeName": "中文图书",
      //   "isbn": "978-7-111-37661-3",
      //   "marcRecNo": "6d37534f562f6857306d6a6a36684f6535425a4e61413d3d",
      //   "num": 2,
      //   "pubYear": "2012",
      //   "publisher": "机械工业出版社",
      //   "title": "JavaScript权威指南.JavaScript : the definitive guide"
      // }
    ]
  },

  // 获取input输入框的内容
  inputChange(e) {
    let that = this;
    let value = e.detail.value;
    value = value.trim();
    that.setData({
      inputValue: value,
    })
  },

  // 点击查询
  search() {
    let that = this;
    // console.log(111);
    let value = this.data.inputValue;
    if (value === '') {
      wx.showToast({
        title: '书名不能为空',
        icon: 'none',
        duration: 1000
      })
      // Toast.fail('书名不能为空');
      return;
    }
    let data = {};
    data.strText = value;
    wx.showToast({
      title: '加载中',
    })
    util.getReq("lib", data, function (res) {
      if (res['code'] === 0) {
        wx.hideToast();
        that.setData({
          content: res['data']['content']
        })
      }
    })
  },

  toMyBook(){
    let identityusername = wx.getStorageSync("identityusername") || null;
    let identitypassword = wx.getStorageSync("identitypassword") || null;

    if (identityusername === null) {
      wx.showModal({
        content: '登录后方可查看,是否立即登录',
        success(res) {
          if (res.confirm) {
            // console.log('用户点击确定')
            wx.navigateTo({
              url: '/pages/identitylogin/identitylogin',
            })
          } else if (res.cancel) {
            return;
          }
        }
      })
    } else {
      wx.navigateTo({
        url: `../../pages/mybook/mybook`,
      })
    }
    
  },

  showBookDetail(e) {
    // console.log(e);
    let marc = e.currentTarget.dataset.marc;
    let title = e.currentTarget.dataset.title;

    wx.navigateTo({
      url: `../../pages/bookdetail/bookdetail?marc=${marc}&title=${title}`,
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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