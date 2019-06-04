// pages/bookdetail/bookdetail.js
let util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    marc:'',
    title:'',
    content:[
      // {
      //   suoshuhao: "TP312/C-487",
      //   tiaomahao: "C01706163",
      //   guancangdi: " 南湖密集书库Ⅱ\n\t\t\t\t\t\t\t\t ",
      //   shukanzhuangtai: "可借"
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.title)
    this.setData({
      marc: options.marc,
      title: options.title
    })
    this.searchDetail();
  },

  searchDetail(){
    let that = this;
    let marc = this.data.marc;
    let data = {};
    data.marc = marc;
    util.getReq("book1", data, function (res) {
      if (res['code'] === 0) {
        // console.log(res);
        let data = [...res['data']];
        data.splice(0, 5);
        data = that.group(data, 5);

        let content = that.data.content;
        for(let i = 0; i < data.length; i ++) {
          let obj = {};
          obj['suoshuhao'] = data[i][0];
          obj['tiaomahao'] = data[i][1];
          obj['nianjuanqi'] = data[i][2];
          obj['guancangdi'] = data[i][3];
          obj['shukanzhuangtai'] = data[i][4];
          content.push(obj);
        }
        that.setData({
          content:content
        })
        // console.log(typeof(data))
      }
    })
  },

  group(array, subGroupLength) {
    let index = 0;
    let newArray = [];
    while (index < array.length) {
      newArray.push(array.slice(index, index += subGroupLength));
    }
    return newArray;
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