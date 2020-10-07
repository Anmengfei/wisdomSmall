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
    password: ''
    
    
  },
  
  openId: undefined,

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
    var openid = wx.getStorageSync("openId")
    this.openId = openid
    console.log(this.openId)
    
    
    
  },
  onShow: function(options) {
    
    
    
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

    const zhuceParams = {
      
      userName: this.data.userName,
      password: this.data.password
      
    }
    console.log(zhuceParams)
    
    // var url = `/school/saveUserInfo?openid=${this.openId}&province=${this.data.provinceCode}&category=${this.data.leibie}&batch=${this.data.pici}&subject=${allSubject}&city=${this.data.city}&citycode=${this.data.cityCode}&address=${this.data.address}&addresscode=${this.data.addressCode}&schoolname=${this.data.schoolName}`
    var url = `wechat_login?username=${this.data.userName}&password=${this.data.password}`
    const res = await request({url:url,method:"get"});
    console.log(res)
    var id = res.site_id
    if(res.code === 200) {
      wx.setStorageSync("site_id", res.site_id);
      wx.setStorageSync("nickName", res.userinfo.nickName);
      wx.setStorageSync("remark", res.userinfo.remark); // 项目管理员
      wx.setStorageSync("userName", res.userinfo.userName); 
      wx.setStorageSync("roleName", res.userinfo.roles[0].roleName); 
      wx.setStorageSync("phonenumber", res.userinfo.phonenumber); 
      wx.switchTab({
        url: '/pages/index/index',
        
        success: function(e) {
          this.getNameById(id)
          console.log('aaa')
          var page =  getCurrentPages().pop();
          console.log(page)
          if(page == undefined || page == null) return;
          // page.onShow();
          page.onLoad();
        }

      })
    } else {
      wx.showToast({
        title: '提交失败',
        icon: 'none',
        duration: 2000
      })
      return
    }

  },

  async getNameById(id) {
    var url = `getSite?siteId=${id}`
    const res = await request({url:url,method:"get"});
    console.log(res)
    wx.setStorageSync("deptName", res.data.deptName);

  }

  
})
