//index.js
//获取应用实例
let util = require("../../utils/util.js");
const app = getApp()

Page({
  data: {
    elec_choose_button:true,
    elec_show_text:false,
    motto: 'Hello World',
    hasSubject: false,
    subjects: [],
    currentWeek:16,
    currentDay:4,
    weekName:"第一周",
    elec:0,
    balance:"统一身份认证后可以查看"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad:function(option){
    // this.getEleInfo();
    this.getBalance();
  },

  getBalance(){
    let strNew = wx.getStorageSync('balance') || '统一身份认证后可以查看';
    this.setData({
      balance: strNew
    })
  },

  updateBalance(){
    let username = wx.getStorageSync('identityusername');
    let password = wx.getStorageSync('identitypassword');
    let that = this;

    if (this.data.balance === '统一身份认证后可以查看') {
      // wx.showToast({
      //   title: '登录后方可更新',
      //   icon: 'none',
      //   duration: 1000
      // });
      wx.showModal({
        content: '登录后方可更新,是否立即登录',
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
      return;
    }
    wx.showToast({
      title: '正在更新中',
      duration: 10000
    })
    wx.request({
      url: 'https://liuh321.club/balance',
      data: {
        username: username,
        password: password
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        console.log(result);
        if (result['data']['code'] === 0) {
          // wx.hideToast();
          let str = result['data']['data'];
          let index = str.indexOf('（');
          let strNew = str.slice(0, index);
          wx.setStorageSync("balance", strNew);
        }
        that.getBalance();
      },
      fail: () => {},
      complete: () => {
        wx.hideToast();
      }
    });
  },

  getEleInfo(){
    var elec_info = wx.getStorageSync("elec_info") || null;
    if (elec_info == null) {
      return;
    } else {
      console.log(elec_info);
      var that = this;
      wx.showNavigationBarLoading();
      util.getReq("ele", elec_info, function (res) {
        that.setData({
          elec_choose_button: false,
          elec_show_text: true,
        });
        console.log(res);
        if (res.code == 1) {
          that.setData({
            elec_choose_button: true,
            elec_show_text: false,
          });
          wx.showToast({
            title: '暂不支持该功能',
            icon: 'none',
          });
          return;
        } else {
          that.setData({
            elec: res.data.ele
          });
          wx.hideNavigationBarLoading();
        }
      });

    }
  },

  getTodaySubject: function() {
    let that = this;
    let subjectList = wx.getStorageSync("kb") || [];
    let addsubjectList = wx.getStorageSync("setClass") || [];
    //console.info(subjectList);   //本地数据查看
    if (subjectList.length > 0 || addsubjectList.length > 0) {

      let kbListCurWeek = [];
      subjectList.forEach(item => {

        //console.info(item['day']);
        if (this.hasSubject(item['week_list'], this.data.currentWeek) && item['day'] === this.data.currentDay){
          item.showTime = item['start'] + "-" + (item['start'] + item['step'] - 1) + "节";
          //console.info(item['day'])
          kbListCurWeek.push(item);
        }
      });
      addsubjectList.forEach(item => {

        //console.info(item['day']);
        if (this.hasSubject(item['week_list'], this.data.currentWeek) && item['day'] === this.data.currentDay) {
          item.showTime = item['start'] + "-" + (item['start'] + item['step'] - 1) + "节";
          //console.info(item['day'])
          kbListCurWeek.push(item);
        }
      });
      if(kbListCurWeek.length > 0){
        this.setData({
          hasSubject: true
        });
      }else{
        this.setData({
          hasSubject:false
        })
      }
      this.setData({ subjects: kbListCurWeek });

    }else{
      util.getReq("kb", {}, function (res) {
        console.info(res);
        if (res['code'] === 0) {
          wx.setStorageSync("kb", res['data']['timetable']);
          that.getTodaySubject();
        }
      });
    }
  },
  hasSubject: function (arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == val) {
        return true;
      }
    }
    return false;
  },
  onShow: function(){
    util.getOpen();
    let currentDay = wx.getStorageSync("currentDay") || 1;
    let currentWeek = wx.getStorageSync("currentWeek") || 1;
    this.setData({ currentWeek: currentWeek, currentDay: currentDay});
    this.getTodaySubject();
  },
  onPullDownRefresh: function(){
    util.getOpen();
    let currentDay = wx.getStorageSync("currentDay") || 1;
    let currentWeek = wx.getStorageSync("currentWeek") || 1;
    this.setData({ currentWeek: currentWeek, currentDay: currentDay });
    this.getTodaySubject();
  },
  onShareAppMessage: function () {

  },
})