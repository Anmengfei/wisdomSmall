// pages/user/index.js
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userinfo:{},
    tiaozhuanTF: false,
    yixiangProvince: undefined,
    yixiangZhuanye: undefined,
    myGoal:{
      province: undefined,
      category: undefined,
      batch: undefined,
      userHeaderimgurl: undefined,
      userName: undefined,
    },
    goal: {
      city: undefined,
      major: undefined,
    },
    openid: undefined,
    showAbout: false,
    showCall: false,
    shouquan: false,
    subList: [],
    usText: '高考预测平台是在整合中科院及教育行业的科技和教育专家基础上，研发出的一款服务考生信息查询与志愿优选的参考推荐系统。\n' +
        '通过对高校及所招专业在各省区历年录取情况的海量数据，以及各省区考试情况数据的综合建模分析，且运用大数据、机器学习、算法和数据库等技术，为高考考生提供全方位的信息查询与报考志愿预测与推荐服务。',
    dataText: '系统数据来源于网络，版权归原作者所有，如有侵权请与我们联系，我们将及时清除。'
  },
  openId: undefined,

  
  onLoad: function (options) {
    const openid = wx.getStorageSync("openId")
    this.setData({
      openid: openid
    })
    this.openId = openid
    const _this = this
    // 查看是否授权
    
    wx.getSetting({
      success (res){
        
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          
          wx.getUserInfo({
            success: function(res) {
              console.log('授权；', res.userInfo)
              const name = 'myGoal.userName'
              const img = 'myGoal.userHeaderimgurl'
              _this.setData({
                [name]: res.userInfo.nickName,
                [img]: res.userInfo.avatarUrl
              });
              // _this.getUserInfo()
            }
          })
        }
      }
    })
  },
  async bindGetUserInfo (e) {
    console.log('信息：', e.detail.userInfo)
    // const params = {
    //   openid: this.openId,
    //   nickName: e.detail.userInfo.nickName,
    //   userImg: e.detail.userInfo.avatarUrl
    // }
    const url = `/user/putUserInfo?openid=${this.openId}&nickName=${e.detail.userInfo.nickName}&userImg=${e.detail.userInfo.avatarUrl}`;
    const res = await request({url:url, method: "PUT"});
    console.log('res', res)
    // 这样可以只更改部分值，如果是直接myGoal去setData，将会把其他值覆盖为空
    const name = 'myGoal.userName'
    const img = 'myGoal.userHeaderimgurl'
    // this.getUserInfo()
    this.setData({
      shouquan: true,
      [name]: res.data.username,
      [img]: res.data.userHeaderimgurl
    });
    
   
    // this.data.myGoal.userName = res.data.username
    // this.data.myGoal.userHeaderimgurl = res.data.userHeaderimgurl
    console.log(this.data.myGoal)
  },

  onShow: function(options) {
    this.getUserInfo()
    this.getUserSubjects()
   
    this.getGoalCity()
    
    
    // var that = this
    // const userinfo=wx.getStorageSync("userinfo");
    // const userYixiangCity = wx.getStorageSync("yixiangCity");
    // const userYixiangZhuanye = wx.getStorageSync("yixiangZhuanye");
      
    // that.setData({userinfo});
    
    
    // var province = wx.getStorageSync("province");
    // //var city = wx.getStorageSync("city");
    // var leibie = wx.getStorageSync("leibie");
    // var pici = wx.getStorageSync("pici");
    // var info = {
    //   province: province,
    //   //city: "没数据",
    //   category: leibie,
    //   batch: pici
    // }
    // that.setData({
    //   myGoal: info,
    //   yixiangProvince: userYixiangCity,
    //   yixiangZhuanye: userYixiangZhuanye
    // })
    
  },
  gotoOpen() {
    this.setData({
      showAbout: !this.data.showAbout
    })
  },
  gotoOpenCall() {
    this.setData({
      showCall: !this.data.showCall
    })
  },

  async getUserInfo() {
    var params = {
      openid: this.openId
      // openid: "oMXOb1fL8RtRe67m4Uf_3EPsdimE"
    }
    const res=await request({url:"/user/findUserInfo",data:params});
    var userinfo = {
      province: res.data.province,
      userHeaderimgurl: res.data.userHeaderimgurl,
      batch: res.data.batch,
      category: res.data.category,
      userName: res.data.userNickname
    }
    if(res.data.userNickname !== null && res.data.userHeaderimgurl !== null) {
      this.setData({
        shouquan: true
      })
    }
    this.setData({
      myGoal: userinfo
    })
    console.log(this.data.myGoal.userHeaderimgurl)
    
  },
  async getUserSubjects() {
    var params = {
      openid: this.openId
    }
    const res=await request({url:"/school/findnewsubject",data:params});
    this.setData({
      subList: res.data
    })
    
  },
  async getGoalCity() {
    var params = {
      openid: this.openId
    }
    const res=await request({url:"/user/checkgoal",data:params});
    var goalinfo = {
      city: res.data.city,
      major: res.data.majorname
    }
    this.setData({
      goal: goalinfo
    })
    console.log(res)
  },

  
})