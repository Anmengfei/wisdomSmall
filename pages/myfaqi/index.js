// 0 引入 用来发送请求的 方法 一定要把路径补全
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    statusList: [
      {
        "id": 0,
        "value": "未处理"
      },
      {
        "id": 1,
        "value": "处理中"
      },
      {
        "id": 2,
        "value": "已完成"
      },
    ],

    typeList: [
      {
        "id": 0,
        "value": "安全"
      },
      {
        "id": 1,
        "value": "质量"
      },
      {
        "id": 2,
        "value": "绿色施工"
      },
    ],
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
      
  },

  selectStatus: function(e) {
    console.log(e.detail)
  },

  selectType(e) {
    console.log(e.detail)
  },


  async searchList() {
    /** 请求我发起的列表 */
    // const res=await request({url:"/extends/sectioninfo"});
    // console.log(res)
    
    // this.setData({
    //   myFaqiList: res
    // })

    var arr = [
      {
        id: 1,
        construction_site_name: '项目A',
        from_user: '张三',
        to_user: '李四',
        cc_people: '王五',
        context: '未来两年，在线教育的市场规模仍有增长趋势。总体来说：对于K12教育市场，随着在线教育产品的效果及口碑逐渐提升，加上2020年上半年疫情促使在线教育常态化、市场刚需等原因，未来K12在线教育市场还大有可为。',
        risk_level: 1,
        process_status: 1,
        start_time: '2020-9-27 18:20:20',
        set_end_time: '2020-9-27 18:20:20',
        handing_time: '2020-9-27 18:20:20',
        check_type:'安全',
        check_type_offspring: '深基坑',
        flag: 1
      },

      {
        id: 1,
        construction_site_name: '项目A',
        from_user: '张三',
        to_user: '李四',
        cc_people: '王五',
        context: '未来两年，在线教育的市场规模仍有增长趋势。总体来说：对于K12教育市场，随着在线教育产品的效果及口碑逐渐提升，加上2020年上半年疫情促使在线教育常态化、市场刚需等原因，未来K12在线教育市场还大有可为。',
        risk_level: 2,
        process_status: 2,
        start_time: '2020-9-27 18:20:20',
        set_end_time: '2020-9-27 18:20:20',
        handing_time: '2020-9-27 18:20:20',
        check_type:'安全',
        check_type_offspring: '深基坑',
        flag: 1
      },

      {
        id: 1,
        construction_site_name: '项目A',
        from_user: '张三',
        to_user: '李四',
        cc_people: '王五',
        context: '未来两年，在线教育的市场规模仍有增长趋势。总体来说：对于K12教育市场，随着在线教育产品的效果及口碑逐渐提升，加上2020年上半年疫情促使在线教育常态化、市场刚需等原因，未来K12在线教育市场还大有可为。',
        risk_level: 3,
        process_status: 3,
        start_time: '2020-9-27 18:20:20',
        set_end_time: '2020-9-27 18:20:20',
        handing_time: '2020-9-27 18:20:20',
        check_type:'安全',
        check_type_offspring: '深基坑',
        flag: 1
      }
    ]

    this.setData({
      myFaqiList: arr
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
