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
   
    
    openId: undefined
  },
  

  onShow: function(options) {
    var openid = wx.getStorageSync("openId")
    console.log("openid是：", openid)
    this.setData({
      openId: openid
    })
    
  
      
  },
  // 页面开始加载 就会触发
  onLoad: function (options) {
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
    var name = '发起人3'
    var url = `system/safe/getInfoByFromUser?name=${name}`
    const res=await request({url:url});
    console.log("发起Lists",res)
    
    this.setData({
      myFaqiList: res.data
    })

    
  },

  async selectWeichuli() {
    /** 请求未处理的列表 */
    // const res=await request({url:"/extends/sectioninfo"});
    // console.log(res)
    
    // this.setData({
    //   myFaqiList: res
    // })

    var arr = [
      {
        id: 1,
        description: '未来两年，在线教育的市场规模仍有增长趋势。总体来说：对于K12教育市场，随着在线教育产品的效果及口碑逐渐提升，加上2020年上半年疫情促使在线教育常态化、市场刚需等原因，未来K12在线教育市场还大有可为。',
        time: '2020-9-27 18:20:20',
        type:'深基坑',
        status: '未处理'
      }

      

      
    ]

    this.setData({
      myFaqiList: arr
    })

  },

  async selectChulizhong() {
    /** 请求未处理的列表 */
    // const res=await request({url:"/extends/sectioninfo"});
    // console.log(res)
    
    // this.setData({
    //   myFaqiList: res
    // })

    var arr = [
      {
        id: 1,
        description: '未来两年，在线教育的市场规模仍有增长趋势。总体来说：对于K12教育市场，随着在线教育产品的效果及口碑逐渐提升，加上2020年上半年疫情促使在线教育常态化、市场刚需等原因，未来K12在线教育市场还大有可为。',
        time: '2020-9-27 18:20:20',
        type:'塔吊',
        status: '处理中'
      }

      

      
    ]

    this.setData({
      myFaqiList: arr
    })

  },

  async selectFinish() {
    /** 请求未处理的列表 */
    // const res=await request({url:"/extends/sectioninfo"});
    // console.log(res)
    
    // this.setData({
    //   myFaqiList: res
    // })

    var arr = [
      {
        id: 1,
        description: '未来两年，在线教育的市场规模仍有增长趋势。总体来说：对于K12教育市场，随着在线教育产品的效果及口碑逐渐提升，加上2020年上半年疫情促使在线教育常态化、市场刚需等原因，未来K12在线教育市场还大有可为。',
        time: '2020-9-27 18:20:20',
        type: '升降机',
        status: '已完成'
      }
      
    ]

    this.setData({
      myFaqiList: arr
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
