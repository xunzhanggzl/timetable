// pages/telephone/telephone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dailyContent:[
      {
        place: "校园班车",
        tele: 83885871
      },
      {
        place: "校园巴士",
        tele: 15150008191
      },
      {
        place: "南湖校区菜鸟驿站",
        tele: 83592392
      },
      {
        place: "文昌校区菜鸟驿站",
        tele: 15105210598
      },
      {
        place: "紧急供电",
        tele: 83592396
      },
      {
        place: "图书馆",
        tele: 83592099
      },
      {
        place: "博物馆",
        tele: 83592150
      },
      {
        place: "国家大学科技园",
        tele: 83885630
      },
      {
        place: "保卫处",
        tele: 83590114
      },
      {
        place: "矿大邮箱",
        tele: 83592137 
      },
      {
        place: "总务部",
        tele: 83592333 
      },
      {
        place: "档案馆",
        tele: 83592107
      },
      {
        place: "财务资产部",
        tele: 83590217
      }
    ],
    purchaseContent:[
      {
        place: '南湖一店（地超）',
        tele: 83592301
      },
      {
        place: '纪念品店（矿大记忆）',
        tele: 83884828
      },
      {
        place: '行健楼用品店',
        tele: 83592309
      },
      {
        place: '文昌一店',
        tele: 83884663
      },
      {
        place: '文昌教工服务中心店',
        tele: 83995973
      }
    ],
    eatContent: [
      {
        place: '桃苑餐厅一楼',
        tele: 83592303,
      },
      {
        place: '桃苑餐厅二楼',
        tele: 83592305,
      },
      {
        place: '松苑餐厅一楼',
        tele: 83592321,
      },
      {
        place: '松苑餐厅二楼',
        tele: 83592319,
      },
      {
        place: '梅苑餐厅一楼',
        tele: 83592318,
      },
      {
        place: '梅苑餐厅二楼',
        tele: 83592359,
      },
      {
        place: '南湖教工餐厅（松苑餐厅三层）',
        tele: 83592345,
      },
      {
        place: '南湖书香餐舍（桃苑餐厅一层）',
        tele: 83592317,
      },
      {
        place: '南湖音乐餐厅（松苑餐厅一层）',
        tele: 83592397,
      },
      {
        place: '南湖包子铺（桃苑/松苑/梅苑）',
        tele: 83592320,
      },
      {
        place: 'A吧',
        tele: 18626028656,
      },
      {
        place: 'C吧',
        tele: 15852477276,
      },
      {
        place: '1909书吧',
        tele: 83885668,
      }
    ],
    liveContent:[
      {
        place:"学生公寓服务中心(杏一南侧24h)",
        tele: 83592396
      },
      {
        place: "桃苑主管",
        tele: 83592800
      },
      {
        place: "桃1",
        tele: 83592801
      },
      {
        place: "桃2",
        tele: 83592802
      },
      {
        place: "桃3",
        tele: 83592803
      },
      {
        place: "桃4",
        tele: 83592804
      },
      {
        place: "桃5",
        tele: 83592805
      },
      {
        place: "松、杏主管",
        tele: 83592334
      },
      {
        place: "松1",
        tele: 83592322
      },
      {
        place: "松2",
        tele: 83592324
      },
      {
        place: "松3",
        tele: 83592325
      },
      {
        place: "松4",
        tele: 83592327
      },
      
      {
        place: "杏1",
        tele: 83592362
      },
      {
        place: "杏2",
        tele: 83592364
      },
      {
        place: "杏3",
        tele: 83592784
      },

      {
        place: "竹苑主管",
        tele: 83592061
      },
      {
        place: "竹1",
        tele: 83592329
      },
      {
        place: "竹2",
        tele: 83592330
      },
      {
        place: "竹3",
        tele: 83592331
      },
      {
        place: "竹4",
        tele: 83592332
      },

      {
        place: "梅、研主管",
        tele: 83592363
      },
      {
        place: "梅1",
        tele: 83592357
      },
      {
        place: "梅2",
        tele: 83592343
      },
      {
        place: "梅3",
        tele: 83592344
      },
      {
        place: "研1",
        tele: 83592788
      },
      {
        place: "研2",
        tele: 83592787
      },
      {
        place: "研3",
        tele: 83591439
      },

      {
        place: "直供热水",
        tele: 83597783
      },
      {
        place: "美的空调",
        tele: 85715279
      },
      {
        place: "格力空调",
        tele: 85601408
      },
      {
        place: "居委会（办公楼）",
        tele: 83885513
      },
      {
        place: "电子锁",
        tele: 18148516620
      }
      
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  tele(event){
    // console.log(event)
    let tele = event.currentTarget.dataset.tele.toString();
    wx.makePhoneCall({
      phoneNumber: tele
    })
  }
  
})