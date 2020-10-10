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
    deptName: ''
  },
  

  onShow: function(options) {
    
    
  
      
  },
  // 页面开始加载 就会触发
  onLoad: function (options) {
    var userName = wx.getStorageSync("userName")
    var deptName = wx.getStorageSync("deptName")
    console.log("userName是：", userName)

    this.setData({
      name: userName,
      deptName: deptName
    })
    this.searchList()
    this.getCheckType()
      
  },

  async selectStatus(e) {
    console.log(e.detail)
    var status = e.detail.id

    var url = `system/safe/getInfoByCcPeople?name=${this.data.name}&status=${status}&sitename=${this.data.deptName}`
    const res=await request({url:url});
    console.log("statusLists",res)
    
    this.setData({
      myFaqiList: res.data
    })
    
  },

  async selectType(e) {
    console.log(e.detail)
    var type = e.detail

    var url = `system/safe/getInfoByCcPeople?name=${this.data.name}&type=${type}&sitename=${this.data.deptName}`
    const res=await request({url:url});
    console.log("statusLists",res)
    
    this.setData({
      myFaqiList: res.data
    })
  },


  async searchList() {
    /** 请求我发起的列表 */
    // var name = '抄送人3'
    // var url = `system/safe/getInfoByCcPeople?name=${name}`
    var url = `system/safe/getInfoByCcPeople?name=${this.data.name}&sitename=${this.data.deptName}`
    const res=await request({url:url});
    console.log("抄送Lists",res)
    
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
