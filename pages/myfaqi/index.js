// 0 引入 用来发送请求的 方法 一定要把路径补全
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    statusList: [
      {
        "id": 1,
        "value": "未处理"
      },
      {
        "id": 2,
        "value": "处理中"
      },
      {
        "id": 3,
        "value": "已完成"
      },
      
      {
        "id": 4,
        "value": "逾期"
      }
    ],

    typeList: [],
    myFaqiList: [],
    name: '',
    deptId: undefined,
    deptName: ''
    
    
  },
  

  onShow: function(options) {
    
    
  
      
  },
  // 页面开始加载 就会触发
  onLoad: function (options) {

    var userName = wx.getStorageSync("userName")
    var deptId = wx.getStorageSync("site_id")
    var deptName = wx.getStorageSync("deptName")
    console.log("deptName是：", deptName)
    console.log("userName", userName)

    this.setData({
      name: userName,
      deptId: deptId,
      deptName: deptName
    })
    this.searchList()
    this.getCheckType()
      
  },

  async selectStatus(e) {
    console.log(e.detail)
    var status = e.detail.id

    var params = {
      name: this.data.name,
      status: status,
      sitename: this.data.deptName
    }

    //var url = `system/safe/getInfoByFromUser?name=${this.data.name}&status=${status}&sitename=${this.data.deptName}`
    var url = "system/safe/getInfoByFromUser"
    const res=await request({url:url, data: params, method: 'get'});
    console.log("statusLists",res)
    
    this.setData({
      myFaqiList: res.data
    })
    
  },

  async selectType(e) {
    console.log(e.detail)
    var type = e.detail
    console.log("AAA", this.data.name)
    var params = {
      name: this.data.name,
      type: type,
      sitename: this.data.deptName
    }

    //var url = `system/safe/getInfoByFromUser?name=${this.data.name}&type=${type}&sitename=${this.data.deptName}`
    var url = "system/safe/getInfoByFromUser"
    const res=await request({url:url, data: params, method: 'get'});
    console.log("statusLists",res)
    
    this.setData({
      myFaqiList: res.data
    })
  },


  async searchList() {
    /** 请求我发起的列表 */
    
    // var url = `system/safe/getInfoByFromUser?name=${this.data.name}`
    //var url = `system/safe/getInfoByFromUser?name=${this.data.name}&sitename=${this.data.deptName}`
    var params = {
      name: this.data.name,
      sitename: this.data.deptName
    }

    var url = "system/safe/getInfoByFromUser"
    const res=await request({url:url, data: params, method: 'get'});
    console.log("发起Lists",res)
    
    
    this.setData({
      myFaqiList: res.data
    })

    
  },

 

  async getCheckType() {
    const res=await request({url:"system/safe/getCheckType", method: 'get'});
    console.log("获取checkTypeList",res)
    
    this.setData({
      typeList: res.data
    })
  },

  

  parseWenzi(num) {
    if(num === 1) {
      return '一级'
    } 
    if(num === 2) {
      return '二级'
    } 
    if(num === 3) {
      return '三级'
    } 
    if(num === 4) {
      return '四级'
    } 
  }

  


  
})
