// 0 引入 用来发送请求的 方法 一定要把路径补全
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    
   
    setInter: '',
    openId: undefined
  },
  

  onShow: function(options) {
    
    
  
      
  },
  // 页面开始加载 就会触发
  onLoad: function (options) {
    
    this.startSetInter()
  },

  startSetInter: function () {
    var that = this;
    //将计时器赋值给setInter
    that.data.setInter = setInterval(
       function () {
           that.queryUser() //这里的queryUser()是我自己写的去云数据库获取数据的接口
       }, 2000);
  },
  queryUser() {
    var openid = wx.getStorageSync("openId")
    var bindStatus = wx.getStorageSync("bind")
 
    if(openid !== undefined) {
      clearInterval(this.data.setInter) // 关闭定时器
      console.log("openid是：", openid)
      console.log("绑定状态:", bindStatus)
      this.setData({
        openId: openid
      })
      if(bindStatus === false) {
        setTimeout(function(){
          wx.navigateTo({
            url: '../zhuce/index',
          })
        },3000);
      }
    }
    
    
  },

  navigateTo() {
    wx.switchTab({
      url: '/pages/myinfo/index',
      
      success: function(e) {
        console.log('aaa')
        var page =  getCurrentPages().pop();
        console.log(page)
        if(page == undefined || page == null) return;
        // page.onShow();
        page.onLoad();
      }

    })
  }

  


  
})
