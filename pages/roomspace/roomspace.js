import Dialog from '../../vant-weapp/dialog/dialog';
let util = require("../../utils/util.js");

Page({
  data:{
      show_week: false,
      columns_week: [],
      typeIndex_week: 1,
      typeName_week: "第1周",
      docu_title_week: "周次:",

      show_day: false,
      columns_day: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六','星期日'],
      typeIndex_day: 1,
      typeName_day: "星期一",
      docu_title_day: "星期:",

      show_jc: false,
      columns_jc: [],
      typeIndex_jc_all: [],
      typeName_jc: "",
      docu_title_jc: "节次:",

      show_lh: false,
      columns_lh: ['博1', '博2', '博3', '博4', '博5'],
      typeIndex_lh: 1,
      typeName_lh: "博1",
      docu_title_lh: "楼号:",

      week:1,
      day:1,
      classTime:1,
      flat:'博1',
      roomspace:[],

      // 新增
      showData:false,
      zhen:true

  },

  onLoad:function(){
    this.oninit();
  },

  oninit: function () {
    var week = [];
    var jc = [];
    for (var i = 0; i < 20; i++) {
      week[i] = "第" + (i + 1) + "周";
    };
    for (let i = 0; i < 10; i++) {
      let obj = {};
      obj.name = `第${i+1}节课`;
      obj.flag = false;
      jc.push(obj);
    };
    let current_week = wx.getStorageSync("currentWeek");

    this.setData({
      columns_week:week,
      columns_jc:jc,
      typeIndex_week: current_week-1,
      typeName_week: `第${current_week}周`,
      week: current_week 

    })
  },

  /* 
    选择周次
  */
  onPickerChange_week: function (event) {
    const { picker, value, index } = event.detail;
    this.setData({
      typeIndex_week: index,
      typeName_week: this.data.columns_week[index],
      week:(index+1)
    })
  },

  onPickerShow_week: function (event) {
    this.setData({ show_week: true });
  },

  onPickerClose_week: function (event) {
    this.setData({ show_week: false });
  },

  /* 
    选择星期几
  */
  onPickerChange_day: function (event) {
    // console.info(event);
    const { picker, value, index } = event.detail;
    // console.info(index);

    this.setData({
      typeIndex_day: index,
      typeName_day: this.data.columns_day[index],
      day: (index + 1)
    })
  },

  onPickerShow_day: function (event) {
    this.setData({ show_day: true });
  },

  onPickerClose_day: function (event) {
    this.setData({ show_day: false });
  },

  /* 
    选择节次
  */
  onPickerChange_jc: function (event) {
    let index = event.currentTarget.dataset.index;
    if (this.data.columns_jc[index].flag === true) {
      let columns_jc = this.data.columns_jc;
      columns_jc[index].flag = false;
      // this.data.columns_jc[index].flag = false
      this.setData({
        columns_jc: columns_jc
      })
    } else {
      let columns_jc = this.data.columns_jc;
      columns_jc[index].flag = true;
      // 直接这样不行。。。
      // this.data.columns_jc[index].flag = true  
      this.setData({
        columns_jc: columns_jc
      })
    }

    if (!this.data.typeIndex_jc_all.includes(index)) {
      this.data.typeIndex_jc_all.push(index);      
    } else {
      let i = this.data.typeIndex_jc_all.indexOf(index);
      this.data.typeIndex_jc_all.splice(i, 1);
    }
    // console.log(this.data.typeIndex_jc_all)

    let str = [...this.data.typeIndex_jc_all];
    let str1 = str.map((item) => {
      item ++;
      return item;
    })
    str1.toString();
    if (str1.length === 0) {
      this.setData({
        typeName_jc: "",
      })
    } else {
      this.setData({
        typeName_jc: `第${str1}节课`,
      })
    }
    
  },

  onPickerShow_jc: function (event) {
    this.setData({ show_jc: true });
  },

  onPickerClose_jc: function (event) {
    this.setData({ show_jc: false });
  },

  /* 
    选择楼号
  */
  onPickerChange_lh: function (event) {
    // console.info(event);
    const { picker, value, index } = event.detail;
    // console.info(index);

    this.setData({
      typeIndex_lh: index,
      typeName_lh: this.data.columns_lh[index],
      flat: this.data.columns_lh[index]
    })
  },

  onPickerShow_lh: function (event) {
    this.setData({ show_lh: true });
  },

  onPickerClose_lh: function (event) {
    this.setData({ show_lh: false });
  },

  submit:function(){
    // 计算classTime 比如选择第 1 节课和第 4 节课，classTime = 2的0次方 + 2的3次方 = 9
    let arr = [...this.data.typeIndex_jc_all];
    if (arr.length === 0) {
      wx.showToast({
        title: '未选中节数',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    let sum = 0;
    arr.forEach((item) => {
      sum = sum + Math.pow(2, item);
    })
    // console.log(sum);
    this.setData({
      classTime: sum
    })

    var info = {};
    info.zc = Number(this.data.week);
    info.xq = Number(this.data.day);
    info.jc = Number(this.data.classTime);
    info.lh = this.data.flat;
    // console.log(info);
    let that=this;
    util.req('room1',info,function(e){
      // console.log(e);
      that.setData({
        roomspace:e["data"]
      });
      if(e.code==0){
        that.setData({
          showData:true
        })
      }else{
        wx.showToast({
          title: '抓取失败，服务器错误',
          icon: 'none',
        });
      }
    })
  },
  closelist(){
    this.setData({
      showData:false
    })
  }
})