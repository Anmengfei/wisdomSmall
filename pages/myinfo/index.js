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

    
    
    var tel = wx.getStorageSync("phonenumber")
    this.setData({
      
      tel: tel

    })
    this.getInfoByInfo()
    this.getInfoByTel()
      
  },

  selectSite(e) {
    console.log(e.detail)
    
    this.setData({
      selectedSite: e.detail
    })
    
  },

  async getInfoByInfo () {
    var openid = wx.getStorageSync("openId")
    const getOpenidParams = {openid: openid}
    //  3 发送请求 获取用户的openid
    const res = await request({url:"getUserInfoByMiniOpenid",data:getOpenidParams});
    console.log("ASADAD",res)
    if(res.code === 200) {
      var tmpJuese = ''
      if(res.userinfo.roles.length === 0) {
        tmpJuese = '暂无角色'
      } else {
        tmpJuese = res.userinfo.roles[0].roleName
      }

      
      this.setData({
        username: res.userinfo.userName,
        danwei: res.userinfo.dept.deptName,
        role: tmpJuese,
        tel: res.userinfo.phonenumber
  
      })

     
    } else {
      console.log("获取信息失败")
    }

  },
  async getInfoByTel() {
    var url = `people/info/getSiteInfoByUserPhone?phone=${this.data.tel}`
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
   console.log("siteList",this.data.siteList)
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
    var openId = wx.getStorageSync("openId")
    var url = `switchUser?phoneNumber=${this.data.tel}&userid=${this.data.userId}&openid=${openId}`
    const res = await request({url:url,method:"get"});
    console.log(res)
    if(res.code === 200) {
      var openId = wx.getStorageSync("openId")
      wx.clearStorageSync()
      wx.setStorageSync("openId", openId)
      console.log(wx.getStorageSync("site_id"))
      wx.setStorageSync("site_id", res.site_id);
  

      wx.setStorageSync("deptId", res.userinfo.deptId)
      wx.setStorageSync("userName", res.userinfo.userName); 
      // if(res.userinfo.roles.length !== 0) {
      //   wx.setStorageSync("roleName", res.userinfo.roles[0].roleName); 
      // } else {
      //   wx.setStorageSync("roleName", null); 
      // }
      wx.setStorageSync("phonenumber", res.userinfo.phonenumber); 
      this.getNameById(res.site_id)
      
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
    this.setData({
      selectedSite: ''
    })
    wx.clearStorageSync()
    wx.setStorageSync("openId", tmpOpenid)
    wx.navigateTo({
      url: '../zhuce/index',
    })
  }



  


  
})
