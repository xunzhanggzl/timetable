Page({
  data:{
    hasSubject:true,
    detail:[]
  },
  onLoad:function(e){
    this.getDetailInfo(e.start,e.day);
    //console.log(this.data.detail);
    //console.log(this.data.hasSubject);
  },

  getDetailInfo:function(start,day){
    var kb = wx.getStorageSync("kb") || null;
    let setClass = wx.getStorageSync("setClass") || null;
    if(kb === null && setClass === null){
      this.setData({hasSubject:false});
      return;
    }
    //console.log(kb);
    let that = this;
    var kblist=[];
    if (kb) {
      kb.forEach(item => {
        // 这里不能用 === ，因为typeof检测出一个是string，一个是number
        if (start == item["start"] && day == item["day"]) {
          // console.log(item);
          item.showtime = item['start'] + "-" + (item['start'] + item['step'] - 1) + "节";
          kblist.push(item);
        }
      });
    }
    if (setClass) {
      setClass.forEach(item => {
        if (start == item["start"] && day == item["day"]) {
          // console.log(item);
          item.showtime = item['start'] + "-" + (item['start'] + item['step'] - 1) + "节";
          kblist.push(item);
        }
      });
    }
    // console.log(kblist)

    that.setData({ detail: kblist });
  }
})
