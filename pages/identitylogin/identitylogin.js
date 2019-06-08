// pages/jwxt/index.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'username': "",
    "password": ""
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

  formSubmit: function () {
    let that = this;
    if (this.data.username.length == 0) {
      wx.showToast({
        title: '用户名不能为空'
      });
      return;
    }
    if (this.data.password.length == 0) {
      wx.showToast({
        title: 'password能为空',
      });
      return;
    }
    // console.info(this.data.username + this.data.password);
    let username = this.data.username;
    let password = this.data.password;

    wx.showToast({
      title: '正在加载中',
      duration: 10000

    })

    wx.request({
      url: 'https://liuh321.club/balance',
      data: {
        username: username,
        password: password
      },
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        console.log(result);
        if (result['data']['code'] === 0) {
          let str = result['data']['data'];
          let index = str.indexOf('（');
          let strNew = str.slice(0, index);
          wx.setStorageSync("balance", strNew);
          wx.setStorageSync("identityusername", username);
          wx.setStorageSync("identitypassword", password);

          wx.reLaunch({
            url: '/pages/index/index',
          })
        } else {
          wx.showToast({
            title: "登录失败, 可能是账户密码错误",
            icon: "none"
          });
        }
      },
      fail: ()=>{},
      complete: ()=>{}
    });

    wx.request({
      url: 'https://liuh321.club/book',
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
          let account = [...result['data']['data']['account']];
          let history = [...result['data']['data']['history']];
          let list = [...result['data']['data']['list']];


          if (account.length > 1) {
            account.splice(0, 6);
            account = that.group(account, 6);
            let TotalAmount = account.pop();
            TotalAmount = TotalAmount[0].trim();
    
            let newAccount = {
              total:TotalAmount,
              allArr:[]
            };

            for(let i = 0; i < account.length; i ++) {
              let obj = {};
              obj['time'] = account[i][0];
              obj['type'] = account[i][1];
              obj['refund'] = account[i][2];
              obj['payment'] = account[i][3];
              obj['method'] = account[i][4];
              obj['number'] = account[i][5];
              newAccount['allArr'].push(obj);
            }
            console.log(newAccount)
            wx.setStorageSync('account', newAccount);
          } 

          if (history.length > 1) {
            history.splice(0, 7);
            history = that.group(history, 7);
            let newHistory = [];
            for (let i = 0; i < history.length; i++) {
              let obj = {};
              obj['ind'] = history[i][0];
              obj['barcode'] = history[i][1];
              obj['title'] = history[i][2];
              obj['author'] = history[i][3];
              obj['borrowtime'] = history[i][4];
              obj['returntime'] = history[i][5];
              obj['place'] = history[i][6];

              newHistory.push(obj);
            }
            wx.setStorageSync('history', newHistory);
          }

          if (list.length > 4) {
            list.splice(0, 8);
            list = that.group(list, 8);

            let newList = [];

            for (let i = 0; i < list.length; i++) {
              let obj = {};
              obj['barcode'] = list[i][0];
              obj['title'] = list[i][1];
              obj['borrowtime'] = list[i][2];
              obj['returntime'] = list[i][3];
              obj['renewamount'] = list[i][4];
              obj['place'] = list[i][5];
              obj['enclosure'] = list[i][6];
              obj['renew'] = list[i][7];
              newList.push(obj);
            }
            console.log(newList);
            wx.setStorageSync('list', newList);
          }
          
        }
        
      },
      fail: () => {},
      complete: () => {}
    });

  },

  group(array, subGroupLength) {
    let index = 0;
    let newArray = [];
    while (index < array.length) {
      newArray.push(array.slice(index, index += subGroupLength));
    }
    return newArray;
  },

  bindUserNameInput: function (e) {
    this.setData({
      username: e.detail.value
    });
  },
  bindPasswordInput: function (e) {
    this.setData({
      password: e.detail.value
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})