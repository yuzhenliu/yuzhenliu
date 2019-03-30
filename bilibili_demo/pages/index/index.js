Page({

  /**
   * 页面的初始数据
   */
  data: {
    //被点击的导航的索引
    currentIndexNav:0,
    //首页导航数组
    // navList:["首页","动画","番剧","国创","音乐","舞蹈","科技","游戏","娱乐","鬼畜","电影","电视剧","纪录片","影视","时尚","生活","广告","直播","相簿"]
    navList:[],
    //轮播图数据
    swiperList:[],
    // 视频列表数据
    videosList:[]
  },
  /**
   * 获取首页的导航数据
   */
  getNavList(){
   let that=this;
    //利用小程序内置的发送请求的方法
    wx.request({
      url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/navList',
      success(res){
        // console.log(res);
        if(res.data.code===0){
          that.setData({
            navList:res.data.data.navList
          })
        }
      }
    })
  },
  //点击首页导航按钮
  activeNav(e) {
    //console.log(123);
    this.setData({
      currentIndexNav: e.target.dataset.index
    })
  },
/**
 * 获取轮播图数据
 */
getSwiperList(){
  let that=this;
  wx.request({
    url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/swiperList',
    success(res){
      // console.log(res);
      if(res.data.code===0){
        that.setData({
          swiperList:res.data.data.swiperList
        })
      }
    }
  })
},

/**
 * 获取视频列表数据
 */
  getVideosList(){
    let that=this;
    wx.request({
      url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/videosList',
      success(res){
        //console.log(res);
        if(res.data.code===0){
          that.setData({
            videosList:res.data.data.videosList
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取首页导航数据
    this.getNavList();
    //获取轮播图的数据
    this.getSwiperList();
    //获取视频的数据
    this.getVideosList();
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