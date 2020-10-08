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
    deptId: undefined
    
    
  },
  

  onShow: function(options) {
    
    
  
      
  },
  // 页面开始加载 就会触发
  onLoad: function (options) {

    var siteName = wx.getStorageSync("nickName")
    var deptId = wx.getStorageSync("deptId")
    console.log("siteName是：", siteName)

    this.setData({
      name: siteName,
      deptId: deptId
    })
    this.searchList()
    this.getCheckType()
      
  },

  selectStatus: function(e) {
    console.log(e.detail)
  },

  selectType(e) {
    console.log(e.detail)
  },


  async searchList() {
    /** 请求我发起的列表 */
    
    // var url = `system/safe/getInfoByFromUser?name=${this.data.name}`
    var url = `system/safe/getInfoByFromUser?name=${this.data.name}`
    const res=await request({url:url});
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
