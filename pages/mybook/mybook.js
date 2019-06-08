// pages/mybook/mybook.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account:{},
    history:[],
    list:[],
    accountFlag: true,
    historyFlag: true,
    listFlag: true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.list == false)
    this.getTheData();
    // console.log(this.data.list == false)
    this.setFlag();

  },
  setFlag(){
    if (this.data.list == false) {
      this.setData({listFlag:false})
    } else {
      this.setData({listFlag:true})
    }
    if (this.data.history == false) {
      this.setData({historyFlag:false})
    } else {
      this.setData({historyFlag:true})
    }
    if (this.data.account.total === undefined) {
      this.setData({accountFlag:false})
    } else {
      this.setData({accountFlag:true})
    }
  },

  getTheData(){
    let account = wx.getStorageSync('account') || null;
    let history = wx.getStorageSync('history') || null;
    let list = wx.getStorageSync('list') || null;

    if (account) {
      this.setData({
        account:account,
      })
    } 

    if (history) {
      this.setData({
        history: history,
      })
    } 

    if (list) {
      this.setData({
        list: list,
      })
    } 

  },

  updateMyBook(){
    let that = this;
    let username = wx.getStorageSync('identityusername') || null;
    let password = wx.getStorageSync('identitypassword') || null;

    if (username === null || password === null) {
      wx.showModal({
        content: '登录后方可更新,是否立即登录',
        success(res) {
          if (res.confirm) {
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
              total: TotalAmount,
              allArr: []
            };

            for (let i = 0; i < account.length; i++) {
              let obj = {};
              obj['time'] = account[i][0];
              obj['type'] = account[i][1];
              obj['refund'] = account[i][2];
              obj['payment'] = account[i][3];
              obj['method'] = account[i][4];
              obj['number'] = account[i][5];
              newAccount['allArr'].push(obj);
            }
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
            wx.setStorageSync('list', newList);
          }

          that.getTheData();
          that.setFlag();
        }

      },
      fail: () => {},
      complete: () => {
        wx.hideToast();
      }
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