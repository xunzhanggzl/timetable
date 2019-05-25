// pages/info/index.js
let util = require("../../utils/util.js");
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    records:[],
    exams:[],
    isUpdate: false,
    showHideFlag:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({isUpdate: this.isUpdate()});
    this.isUpdate();
    this.getExamInfo();
    this.getRecordInfo();
  },

  getExamInfo: function(){
    let that = this;
    let exams = wx.getStorageSync("exams");
    if(that.data.isUpdate || (exams === null) || (exams == false)){
      util.getReq("exams", {}, function (res) {
        // console.log('请求了');
        if (res['code'] === 0) {
          console.info(res);
          let exams = [...res['data']['exams']];
          exams.forEach(item => {

            let examTimeDay = item['time'];
            let examTimeStart = item['time'];

            examTimeDay = examTimeDay.substring(0, 10);
            examTimeDay = examTimeDay.replace(/-/g, '/');

            examTimeStart = examTimeStart.substring(11, 16);

            let examTime = examTimeDay + " " + examTimeStart;
            // console.log(examTime)

            let openDate = new Date(examTime).getTime();
            let day = Math.floor((openDate - new Date().getTime()) / (1000 * 60 * 60 * 24) + 1);
            if (day >= 0) {
              item.relese = "剩余" + day + "天";
            } else {
              item.relese = "已结束";
            }

          });
          wx.setStorageSync("exams", exams);
          that.setData({ exams: exams });
        }

      });
    }else{
      // exams.forEach(item => {
      //   let examTimeDay = item['time'];
      //   let examTimeStart = item['time'];

      //   examTimeDay = examTimeDay.substring(0, 10);
      //   examTimeDay = examTimeDay.replace(/-/g, '/');

      //   examTimeStart = examTimeStart.substring(11, 16);

      //   let examTime = examTimeDay + " " + examTimeStart;
      //   // console.log(examTime)

      //   let openDate = new Date(examTime).getTime();
      //   let day = Math.floor((openDate - new Date().getTime()) / (1000 * 60 * 60 * 24) + 1);
      //   // console.log(day)
      //   if (day >= 0) {
      //     item.relese = "剩余" + day + "天";
      //   } else {
      //     item.relese = "已结束";
      //   }

      // });
      let exams = [...wx.getStorageSync("exams")];
      that.setData({ exams: exams });
    }
  },

  // setExamInfo() {

  // },

  getRecordInfo: function(){
    let that = this;
    let records = wx.getStorageSync("records");

    if (that.data.isUpdate || !(records === null) || (records == false)) {
      util.getReq("record", {}, function (res) {
        if (res['code'] === 0) {
          console.info(res);
          that.setData({ records: res['data']['records'] });
          wx.setStorageSync("records", res['data']['records']);
        }
      });
    }else{
      let records = [...wx.getStorageSync("records")];
      that.setData({ records: records });
    }

  },

  isUpdate: function(){
    let lastTime = wx.getStorageSync("infoUpdate")||null;
    if (lastTime === null){
      wx.setStorageSync("infoUpdate", new Date().getTime());
      this.setData({ isUpdate:true });
      console.info("lastTime is null");
      return;
    }
    
    if ((new Date().getTime() - lastTime) / (1000 * 60 * 60 * 8) >= 1) {
      // console.log("设置了超过一天重新请求")
      wx.setStorageSync("infoUpdate", new Date().getTime());
      console.info((new Date().getTime() - lastTime) / (1000 * 60 * 60 * 8));
      this.setData({ isUpdate: true });
      return;
    }else{
      this.setData({ isUpdate: false });
      return;
    }

  },

  /**
   点击显示或者隐藏已结束的考试
   */
  showHideEnd(){
    // console.log(this.data.showHideFlag)
    // console.log(this.data.exams)
    let all = [...wx.getStorageSync('exams')];
    if (this.data.showHideFlag) {
      const afterchange = all.filter((arr) => {
        return arr.relese !== "已结束";
      })
      // console.log(this.data.exams)
      // console.log(after)
      this.setData({
        exams: afterchange,
        showHideFlag: false
      })
    } else {
      this.setData({
        exams: all,
        showHideFlag: true
      })
    }
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
    // let showHideFlag = !this.data.showHideFlag;
    wx.showNavigationBarLoading();
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    this.isUpdate();
    if (this.data.isUpdate) {
      this.getExamInfo();
      this.getRecordInfo();
    }
    setTimeout(() => {
      // this.getExamInfo();
      // this.getRecordInfo();
      // this.setData({
      //   showHideFlag: showHideFlag
      // })
      // this.showHideEnd()
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);
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