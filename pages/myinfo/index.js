// 0 引入 用来发送请求的 方法 一定要把路径补全
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    username: '',
    danwei: '',
    tel: '',
    role: '',
    userType: '',
    postName: ''

    
    
    
    
  },
  

  onShow: function(options) {
    
    
  
      
  },
  // 页面开始加载 就会触发
  onLoad: function (options) {

    var username = wx.getStorageSync("userName")
    var danwei = wx.getStorageSync("deptName")
    var role = wx.getStorageSync("roleName")
    var tel = wx.getStorageSync("phonenumber")
    var userType = wx.getStorageSync("userType")
    var postName = wx.getStorageSync('postName')
    this.setData({
      username: username,
      danwei: danwei,
      role: role,
      tel: tel,
      userType: userType,
      postName: postName

    })
    
      
  },



  


  
})
