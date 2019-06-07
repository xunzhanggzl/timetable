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
    showHideExamFlag:true,
    showHideRecordsFlag:true
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

  /**
   * 生命周期函数--监听页面显示
   */
  // onShow: function () {
  //   this.isUpdate();
  //   // console.log(this.data.isUpdate)
  //   this.getExamInfo();
  //   this.getRecordInfo();
  // },

  getExamInfo: function(){
    let that = this;
    let exams = wx.getStorageSync("exams");
    if(that.data.isUpdate || (exams === null) || (exams == false)){
      util.getReq("exams", {}, function (res) {
        if (res['code'] === 0) {
          console.log('请求了考试信息');
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
      let exams = [...wx.getStorageSync("exams")];
      that.setData({ exams: exams });
    }
  },

  // setExamInfo() {

  // },

  getRecordInfo: function(){
    let that = this;
    let records = wx.getStorageSync("records");

    if (that.data.isUpdate || (records === null) || (records == false)) {
      util.getReq("record", {}, function (res) {
        if (res['code'] === 0) {
          console.info(res);
          console.log('请求了考试成绩');
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
    let records = wx.getStorageSync("records");
    let exams = wx.getStorageSync("exams"); 
    
    if ((records === null) || (records == false) || (exams === null) || (exams == false)) {
      this.setData({ isUpdate: true });
      return;      
    }

    if ((records.length !== 0 && this.data.records == false) || (exams.length !== 0 && this.data.exams == false)) {
      this.setData({ isUpdate: true });
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
  showHideExam(){
    // let all = [...wx.getStorageSync('exams')];
    // if (this.data.showHideExamFlag) {
    //   const afterchange = all.filter((arr) => {
    //     return arr.relese !== "已结束";
    //   })
    //   this.setData({
    //     exams: afterchange,
    //     showHideExamFlag: false
    //   })
    // } else {
    //   this.setData({
    //     exams: all,
    //     showHideExamFlag: true
    //   })
    // }

    if (this.data.showHideExamFlag) {
      this.setData({
        showHideExamFlag: false
      })
    } else {
      this.setData({
        showHideExamFlag: true
      })
    }
  },

  showHideRecords() {
    if (this.data.showHideRecordsFlag) {
      this.setData({
        showHideRecordsFlag: false
      })
    } else {
      this.setData({
        showHideRecordsFlag: true
      })
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // let showHideExamFlag = !this.data.showHideExamFlag;
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
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);
  }

})