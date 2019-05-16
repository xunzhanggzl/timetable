//获取应用实例
let util = require("../../utils/util.js");
var app = getApp();


Page({
  data: {
    // colorArrays: ["#55efc4", "#81ecec", "#55efc4", "#fd79a8", "#74b9ff", "#55efc4", "#81ecec", "#fd79a8"],
    colorArrays: ["#55efc4", "#81ecec", "#fd79a8", "#74b9ff", 
                  "#f38181", "#fce38a", "#d6f7ad", "#95e1d3", 
                  "#e94822", "#f2910a", "#efd510", "#f57170",
                  "#7045ff", "#c768ff", "#ffaded"],
    colorObj : {},
    wlist: [],
    currentWeek: 16,
    copyWeek: 16,
    weekName: "第一周",
    activeName: '0',
    show: false,
    columns: [],
    typeIndex: 0,

    // time
    classTimestart: ["08:00", "08:55", "10:15", "11:10", "14:00", "14:55", "16:15", "17:10", "19:00", "19:55"],
    classTimeend: ["08:50", "09:45", "11:05", "12:00", "14:50", "15:45", "17:05", "18:00", "19:50", "20:45"],
    month: 2,
    days:[],
    currentweekday: [{ DayOfTheWeek: "周一" }, { DayOfTheWeek: "周二" }, { DayOfTheWeek: "周三" }, { DayOfTheWeek: "周四" },
      { DayOfTheWeek: "周五" }, { DayOfTheWeek: "周六" }, { DayOfTheWeek: "周日" }]
  },

  /*
    相同颜色相同课程
  */
  setSameColor(){
    let ids = [];
    let arr1 = wx.getStorageSync("kb");  // 原有课程
    let arr2 = wx.getStorageSync("setClass"); // 添加课程
    let len1 = arr1.length;
    let len2 = arr2.length;
    for(let i = 0; i < len1; i ++ ) {
      if (!ids.includes(arr1[i]["id"])) {
        ids.push(arr1[i]["id"]);
      }
    }
    for(let i = 0; i < len2; i ++ ) {
      if (!ids.includes(arr2[i]["id"])) {
        ids.push(arr2[i]["id"]);
      }
    }
    // console.log(ids)
    let obj = {};
    let colorArrays = this.data.colorArrays;
    // console.log(colorArrays);

    for (let i = 0; i < ids.length; i++) {
      obj[ids[i]] = colorArrays[i];
    }
    // console.log(obj)
    this.setData({
      colorObj:obj
    })
  },
  
  /*
    获取月份
  */
  gettheMonth(){
    let currentweekday = this.data.currentweekday[0]["riqi"];
    console.log(currentweekday)
    this.setData({
      month: new Date(currentweekday).getMonth() + 1
    })
    console.log(this.data.month)
  },
  /*
    获取这一周的日期
  */
  getCurrentWeekDay(){
    let currentweekday = this.data.currentweekday;
    let days = this.data.days;
    for(let i = 0; i < 7; i ++) {
      currentweekday[i]["riqi"] = days[(this.data.currentWeek - 1) * 7 + i]
    }
    this.setData({
      currentweekday: currentweekday
    })
  },
  /*
    获取这一学期第一天开始到学期末的日期
  */
  getTermDay(){
    function GetDateStr(AddDayCount) {
      let openDate = wx.getStorageSync("openDate") || 1551053280000;
      let dd = new Date(openDate)
      dd.setDate(dd.getDate() + AddDayCount);
      //获取AddDayCount天后的日期  
      var y = dd.getFullYear();
      var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0  
      var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0  
      return y + "-" + m + "-" + d;
      // return m + "-" + d;
    }
    let days = [];
    for (let i = 0; i < 133; i++) {
      days.push(GetDateStr(i))
    }
    wx.setStorageSync("days",days)
    let daysMonthAndDay = [];
    for(let i = 0; i < 133; i ++) {
      daysMonthAndDay.push(days[i].substring(5))
    }
    // storage 里的是2019-02-25带年份的
    // data 里的 days 只保留月份和几号 如 02-25
    this.setData({
      days: daysMonthAndDay
    })
  },

  onChange: function (event) {
    this.setData({
      activeName: event.detail,
    });

  },

  onPickerChange: function (event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      typeIndex: index,
    });
  },

  onClose(event) {
    if (event.detail === 'confirm') {
      this.setData({
        show: false,
        currentWeek: this.data.typeIndex + 1,
        weekName: "第" + (this.data.typeIndex + 1) + "周"
      });
      console.log(this.data.weekName);
      wx.setNavigationBarTitle({
        title: "第" + this.data.currentWeek + "周",
      })
      this.getTimeTableInfo();
    } else {
      this.setData({
        show: false
      });
    }
    // this.getTermDay()
    this.getCurrentWeekDay();
    this.gettheMonth();
  },

  OpenDialog: function () {
    this.setData({
      activeName: 0,
      show: true
    });

  },

  returnCurrentWeek: function () {
    this.setData({
      currentWeek: this.data.copyWeek
    });
    wx.setNavigationBarTitle({
      title: "第" + this.data.currentWeek + "周",
    })
    this.getTimeTableInfo();

    this.getCurrentWeekDay();
    this.gettheMonth();
  },

  onLoad: function () {
    console.log('onLoad');
    this.getInfo();
    this.getTimeTableInfo();

    this.getTermDay();
    this.getCurrentWeekDay();
    this.gettheMonth();

    this.setSameColor();
  },
  onClickRight: function () {
    console.log(this.data.weekName);
  },
  getInfo: function () {
    let currentDay = wx.getStorageSync("currentDay") || 1;
    let currentWeek = wx.getStorageSync("currentWeek") || 1;
    this.setData({
      currentWeek: currentWeek
    });
    //  this.setData({ weekName: "第" + currentWeek + "周" });
    wx.setNavigationBarTitle({
      title: "第" + currentWeek + "周"
    })
    var week = [];
    for (var i = 1; i <= 20; i++) {
      week.push("第" + i + "周");
    }
    this.setData({
      columns: week,
      copyWeek: currentWeek
    });
  },

  /*  getData: function() {
      let that = this;
      let kbList = wx.getStorageSync("kb") || [];
      console.info(kbList.length);
      if(kbList.length > 0){
        let kbListCurWeek = [];
        kbList.forEach(item => {
          if (that.hasSubject(item['week_list'], that.data.currentWeek)) {
            var subject = {}
            subject.xqj = item['day'];
            subject.skjc = item['start'];
            subject.skcd = item['step'];
            subject.kcmc = item['name'] + "@" + item['room'];
            kbListCurWeek.push(subject);
          }
        });
        that.setData({ wlist: kbListCurWeek });
      }else{
        util.getReq("kb", {}, function (res) {
          console.info(res);
          if (res['code'] === 0) {
            wx.setStorageSync("kb", res['data']['timetable']);
            let kbList = res['data']['timetable'];
            let kbListCurWeek = [];
            kbList.forEach(item => {
              if (that.hasSubject(item['week_list'], that.data.currentWeek)) {
                var subject = {}
                subject.xqj = item['day'];
                subject.skjc = item['start'];
                subject.skcd = item['step'];
                subject.kcmc = item['name'] + "@" + item['room'];
                kbListCurWeek.push(subject);
              }
            });
            that.setData({ wlist: kbListCurWeek });
          }
        });
      }
    },

  */

  getTimeTableInfo: function () {
    let that = this;
    let kb = wx.getStorageSync("kb") || null;
    // console.log(kb)
    //新的改动
    let setclass = wx.getStorageSync("setClass") || null;
    // console.log(setclass);
    //结束
    if (that.data.isUpdate || kb == null) {
      console.info("need to update")
      util.getReq("kb", {}, function (res) {
        // console.info(res);
        if (res['code'] === 0) {
          wx.setStorageSync("kb", res['data']['timetable']);
          let kbList = res['data']['timetable'];
          let kbListCurWeek = [];
          kbList.forEach(item => {
            if (that.hasSubject(item['week_list'], that.data.currentWeek)) {
              var subject = {}
              subject.xqj = item['day'];
              subject.skjc = item['start'];
              subject.skcd = item['step'];
              subject.kcmc = item['name'] + "@" + item['room'];
              subject.id = item['id'];
              kbListCurWeek.push(subject);
            };

          });
          //新的改动
          if (setclass != null) {
            setclass.forEach(item => {
              if (that.hasSubject(item['week_list'], that.data.currentWeek)) {
                var subject = {}
                subject.xqj = item['day'];
                subject.skjc = item['start'];
                subject.skcd = item['step'];
                subject.kcmc = item['name'] + "@" + item['room'];
                subject.id = item['id'];
                //不完善。。。
                kbListCurWeek.push(subject);
              }
            })
          }
          //结束
          that.setData({
            wlist: kbListCurWeek
          });

        }
      });
    } else {
      console.info("not need update")
      // let kbList = kb;
      let kbList = wx.getStorageSync("kb") || [];
      // console.log(kbList)
      let kbListCurWeek = [];
      kbList.forEach(item => {
        if (that.hasSubject(item['week_list'], that.data.currentWeek)) {
          var subject = {}
          subject.xqj = item['day'];
          subject.skjc = item['start'];
          subject.skcd = item['step'];
          subject.kcmc = item['name'] + "@" + item['room'];
          subject.id = item['id'];
          kbListCurWeek.push(subject);
        }

      });
      //新的改动
      if (setclass != null) {
        setclass.forEach(item => {
          if (that.hasSubject(item['week_list'], that.data.currentWeek)) {
            var subject = {}
            subject.xqj = item['day'];
            subject.skjc = item['start'];
            subject.skcd = item['step'];
            subject.kcmc = item['name'] + "@" + item['room'];
            subject.id = item['id'];
            //不完善。。。
            kbListCurWeek.push(subject);
          }
        })
      }
      
      // console.log(kbListCurWeek)
      //结束
      that.setData({
        wlist: kbListCurWeek
      });
      // console.log(that.data.wlist)
    }


  },

  isUpdate: function () {
    let lastTime = wx.getStorageSync("TimeTableUpdate") || null;
    if (lastTime == null) {
      this.setData({
        isUpdate: true
      });
      console.info("lastTime is null");
    }
    if ((new Date().getTime() - lastTime) / (1000 * 60 * 60 * 8) >= 1) {
      wx.setStorageSync("TimeTableUpdate", new Date().getTime());
      console.info((new Date().getTime() - lastTime) / (1000 * 60 * 60 * 8));
      this.setData({
        isUpdate: true
      });
    } else {
      this.setData({
        isUpdate: false
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

  showCardView: function (e) {
    //console.log(e);
    wx.navigateTo({
      url: '../../pages/timetable_detail/timetable_detail?start=' + e.currentTarget.dataset.index + "&day=" + e.currentTarget.dataset.statu,
    })

  },

  add_class: function () {
    wx.navigateTo({
      url: '../../pages/class_add/class_add'
    })

  },

  onShareAppMessage: function () {

  },
  onPullDownRefresh: function () {
    // this.getData();
    wx.showNavigationBarLoading();
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    setTimeout(() => {
      this.getInfo();
      this.getTimeTableInfo();

      // this.getTermDay();
      this.getCurrentWeekDay();
      this.gettheMonth();

      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);
  }
})