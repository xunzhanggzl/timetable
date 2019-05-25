Page({

  data: {
    
  },

  storePicture: function () {
    var current = "//icon/image/calendar.png";
    wx.saveImageToPhotosAlbum({
      filePath: current,
      success(res){
        wx.showToast({
          title: '保存成功'
        })
      },
      fail(){
        wx.showToast({
          title: '保存失败'
        })
      }
    })
  },

  // FullScreenPreview(event) {
  //   let src = event.currentTarget.dataset.src; //获取data-src
  //   console.log(src)
  //   wx.previewImage({
  //     // current: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1560955273,4108460138&fm=26&gp=0.jpg',
  //     urls: ['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1560955273,4108460138&fm=26&gp=0.jpg'],
  //     success: (result)=>{

  //     },
  //     fail: ()=>{},
  //     complete: ()=>{}
  //   });
  // }
})