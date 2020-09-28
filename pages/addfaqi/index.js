// 0 引入 用来发送请求的 方法 一定要把路径补全
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    myFaqiList: [],
   
    
    openId: undefined
  },
  

  onShow: function(options) {
    var openid = wx.getStorageSync("openId")
    console.log("openid是：", openid)
    this.setData({
      openId: openid
    })
    
  
      
  },
  // 页面开始加载 就会触发
  onLoad: function (options) {
    
      
  },

 

  


  
})
