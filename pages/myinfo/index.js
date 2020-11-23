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
    postName: '',
    siteList: [],
    selectedSite: '',
    siteIndex: undefined,
    siteTF: false,
    userId: undefined

    
    
    
    
  },
  

  onShow: function(options) {
    
    
  
      
  },
  // 页面开始加载 就会触发
  onLoad: function (options) {

    var username = wx.getStorageSync("userName")
    var danwei = wx.getStorageSync("deptName")
    var role = wx.getStorageSync("roleName")
    var tel = wx.getStorageSync("phonenumber")
    // var userType = wx.getStorageSync("userType")
    // var postName = wx.getStorageSync('postName')
    
    this.setData({
      username: username,
      danwei: danwei,
      role: role,
      tel: tel

    })
    this.getInfoByTel()
    
      
  },

  selectSite(e) {
    console.log(e.detail)
    
    this.setData({
      selectedSite: e.detail
    })
    
  },
  async getInfoByTel() {
    var url = `people/user/getUserInfoByPhone?phone=${this.data.tel}`
    const res = await request({url:url,method:"get"});
    console.log(res)
    this.setData({
      siteList: res.data
    })
  },

  // async changeSite() {
  //   console.log(this.data.selectedSite)
  // },

  bindSite() {
    this.setData({
      siteTF: true
    })
  },

  bindSiteChange(e) {
    console.log("siteSS", e.detail.value)
    console.log("eee", e)
   
    var temp = this.data.siteList[e.detail.value].deptName
   console.log(temp)
    this.setData({
      siteIndex: e.detail.value,
      selectedSite: temp,
      userId: this.data.siteList[e.detail.value].userId
    })
    console.log("userId",this.data.userId)
    this.getUpdateInfo()
    // this.getScheduleZiList(this.data.schedules[e.detail.value].id)
  },
  async getNameById(id) {
    var url = `getSite?siteId=${id}`
    const res = await request({url:url,method:"get"});
    console.log(res)
    wx.setStorageSync("deptName", res.data.deptName);

  },
  async getUpdateInfo() {
    var url = `switchUser?phoneNumber=${this.data.tel}&userid=${this.data.userId}`
    const res = await request({url:url,method:"get"});
    console.log(res)
    if(res.code === 200) {
      wx.clearStorageSync()
      console.log(wx.getStorageSync("site_id"))
      wx.setStorageSync("site_id", res.site_id);
      // wx.setStorageSync("userType", res.userinfo.nickName);
      //wx.setStorageSync("postName", res.postName);

      wx.setStorageSync("deptId", res.userinfo.deptId)
      wx.setStorageSync("userName", res.userinfo.userName); 
      if(res.userinfo.roles.length !== 0) {
        wx.setStorageSync("roleName", res.userinfo.roles[0].roleName); 
      } else {
        wx.setStorageSync("roleName", null); 
      }
      wx.setStorageSync("phonenumber", res.userinfo.phonenumber); 
      this.getNameById(res.site_id)
      //this.postprogramName(deptName)
      wx.switchTab({
        url: '/pages/index/index',
        
        success: function(e) {
          
          console.log('aaa')
          var page =  getCurrentPages().pop();
          console.log(page)
          if(page == undefined || page == null) return;
          // page.onShow();
          page.onLoad();
        }

      })
    } else {
      wx.showModal({
        title: '切换失败',
        content: res.msg,
        showCancel: false,
        success: function (res) { }
      })
      return
    }
  },

  logout() {
    var tmpOpenid = wx.getStorageSync("openId")
    wx.clearStorageSync()
    wx.setStorageSync("openId", tmpOpenid)
    wx.navigateTo({
      url: '../zhuce/index',
    })
  }



  


  
})
