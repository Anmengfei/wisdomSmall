/* 
1 用户上滑页面 滚动条触底 开始加载下一页数据
  1 找到滚动条触底事件  微信小程序官方开发文档寻找
  2 判断还有没有下一页数据
    1 获取到总页数  只有总条数
      总页数 = Math.ceil(总条数 /  页容量  pagesize)
      总页数     = Math.ceil( 23 / 10 ) = 3
    2 获取到当前的页码  pagenum
    3 判断一下 当前的页码是否大于等于 总页数 
      表示 没有下一页数据

  3 假如没有下一页数据 弹出一个提示
  4 假如还有下一页数据 来加载下一页数据
    1 当前的页码 ++
    2 重新发送请求
    3 数据请求回来  要对data中的数组 进行 拼接 而不是全部替换！！！
2 下拉刷新页面
  1 触发下拉刷新事件 需要在页面的json文件中开启一个配置项
    找到 触发下拉刷新的事件
  2 重置 数据 数组 
  3 重置页码 设置为1
  4 重新发送请求
  5 数据请求回来 需要手动的关闭 等待效果

 */
import { request } from "../../request/index.js";

import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    userName: '',
    password: '',
    
    
    
  },
  
  openId: undefined,

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
    
    
    
    
  },
  onShow: function(options) {
    var openid = wx.getStorageSync("openId")
    this.openId = openid
    console.log("zhuce", this.openId)
   
    
  },
  

  tianUserName(e) {
    this.setData({
      userName:e.detail.value
    })
  },
  tianPassword(e) {
    this.setData({
      password:e.detail.value
    })
  },

  async tianbao() {
    var openid = wx.getStorageSync("openId")
    const zhuceParams = {
      
      userName: this.data.userName,
      password: this.data.password,
      wechatOpenid: this.openId
      
    }
    console.log(zhuceParams)
    
    // var url = `/school/saveUserInfo?openid=${this.openId}&province=${this.data.provinceCode}&category=${this.data.leibie}&batch=${this.data.pici}&subject=${allSubject}&city=${this.data.city}&citycode=${this.data.cityCode}&address=${this.data.address}&addresscode=${this.data.addressCode}&schoolname=${this.data.schoolName}`
    var url = `wechat_bind_user?username=${this.data.userName}&password=${this.data.password}&wechatOpenid=${openid}`
    const res = await request({url:url,method:"get"});
    console.log(res)
    var id = res.site_id
    
    if(res.code === 200) {
      this.getInfoByInfo(openid)

    } else {
      wx.showModal({
        title: '登陆错误',
        content: res.msg,
        showCancel: false,
        success: function (res) { }
      })
      return
    }

  },
  async getInfoByInfo (id) {
    const getOpenidParams = {openid: id}
    //  3 发送请求 获取用户的openid
    const res = await request({url:"getUserInfoByMiniOpenid",data:getOpenidParams});
    if(res.code === 200) {
      var id = res.site_id
      wx.setStorageSync("site_id", res.site_id);
      wx.setStorageSync("userType", res.userinfo.nickName);
      wx.setStorageSync("postName", res.postName);
      wx.setStorageSync("deptId", res.userinfo.deptId)
      wx.setStorageSync("userName", res.userinfo.userName); 
      wx.setStorageSync("roleName", res.userinfo.roles[0].roleName); 
      wx.setStorageSync("phonenumber", res.userinfo.phonenumber); 
      wx.setStorageSync("bind", true);
      this.getNameById(id)
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
      wx.setStorageSync("bind", false);
    }
    console.log('res111:', res.data)
  },

  async bangdingInfo(username, password, wechatOpenid) {
    var url = `wechat_bind_user?username=${username}&password=${password}&wechatOpenid=${wechatOpenid}`
    const res = await request({url:url,method:"get"});
    console.log("绑定信息返回数据", res)
  },

  async getNameById(id) {
    var url = `getSite?siteId=${id}`
    const res = await request({url:url,method:"get"});
    console.log(res)
    wx.setStorageSync("deptName", res.data.deptName);

  },
  async postprogramName(name) {
    var url = `system/safe/programName?name=${name}`
    const res = await request({url:url,method:"post"});
    console.log(res)
  }

  
})
