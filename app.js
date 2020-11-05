import { request } from "./request/index.js";
import regeneratorRuntime from './lib/runtime/runtime';
//app.js
App({
  //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
  onLaunch: function() {
    const _this = this
    wx.login({
      success: function (res) {
        var code = res.code;
        console.log("code是", code)
        _this.getOpenid(code)
      }
    });
    // yangmignqi
  },
  // async getOpenid (val) {
  //   const getOpenidParams = {code: val}
  //   //  3 发送请求 获取用户的openid
  //   const res = await request({url:"/user/getXCXOpenid",data:getOpenidParams});
  //   // const openid = JSON.parse(res.data).openid
  //   // console.log('resp', JSON.parse(res.data).openid)
  //   console.log(res.data)
  //   wx.setStorageSync("openId", res.data);
  //   // wx.setStorageSync("openId", "oMXOb1fL8RtRe67m4Uf_3EPsdimE")
  // },

  async getOpenid (val) {
    const getOpenidParams = {code: val}
    //  3 发送请求 获取用户的openid
    const res = await request({url:"getMiniOpenid",data:getOpenidParams});
    console.log('res:', res.data.open_id)
    console.log('length:', Object(res.data).length)
    var openid = res.data.open_id
   
    wx.setStorageSync("openId", openid);
    this.getInfoByInfo(openid)
    
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
    } else {
      wx.setStorageSync("bind", false);
    }
    console.log('res111:', res.data)
  },
  async getNameById(id) {
    var url = `getSite?siteId=${id}`
    const res = await request({url:url,method:"get"});
    console.log(res)
    wx.setStorageSync("deptName", res.data.deptName);

  },
  
  onShow: function(options) {

  },
  onHide: function() {

  },
  onError: function(msg) {

  },
  //options(path,query,isEntryPage)
  onPageNotFound: function(options) {

  }
 
});