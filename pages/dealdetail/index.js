// 0 引入 用来发送请求的 方法 一定要把路径补全
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    toUsers: ["张三","李四","王五"],
    toUser_index: undefined,
    toUser: '',

    ccPeoples: ["张三","李四","王五"],
    ccPeople_index: undefined,
    ccPeople: '',

    risks: ["一级","二级","三级","四级"],
    risk_index: undefined,
    risk: undefined,

    endDate: undefined,
    checkTypes: ["安全", "质量"],
    checkType_index: undefined,
    checkType: undefined,

    checkTypeZis: [],
    checkTypeZi_index: undefined,
    checkTypeZi: undefined,

    context: '',
    construction_site_name: '',
    from_user: '',
    toUserTF: false,
    ccPeopleTF: false,
    riskTF: false,
    checkTypeTF: false,
    checkTypeZiTF: false,

    processArr: ['未处理', '处理中', '已完成'],
    process_index: undefined,
    process_status: '未处理',


    imgs: [],

   
    
    openId: undefined
  },
  

  onShow: function(options) {
    var openid = wx.getStorageSync("openId")
    var username = wx.getStorageSync("userName")
    var construction_site_name = wx.getStorageSync("construction_site_name")
    console.log("openid是：", openid)
    this.setData({
      openId: openid,
      from_user: username,
      construction_site_name: construction_site_name
    })
    
  
      
  },
  // 页面开始加载 就会触发
  onLoad: function (options) {
    var obj = {
      construction_site_name: '项目A',
      from_user: '王二',
      to_user: '张三',
      cc_people: '李四',
      context: 'aaaaaaaaa',
      image_url: ['http://tmp/wx4c73c80e2e139b2d.o6zAJs1NAT64OS_9LH6z….kNenUHWIMWOQfad59a245550b9aa3aa43ebe66e6d493.jpg'],
      risk_level: 1,
      set_end_time: "2020-09-20",
      check_type: 1,
      check_type_offspring: '深基坑',
      process_status: 1
    }
    // var userIndex = this.findToUserIndex(obj.to_user)
    // var ccIndex = this.findCcIndex(obj.cc_people)
    // var riskIndex = this.findRiskIndex(obj.risk_level)
    // var checkTypeIndex = this.findCheckIndex(obj.check_type)
    // var processIdex = this.findProcessIndex(obj.process_status)
    // console.log("userIndex",userIndex)
    // console.log("ccIndex", ccIndex)
    // console.log("riskIndex", riskIndex)
    // console.log("checkTypeIndex", checkTypeIndex)
    // console.log("processIdex", processIdex)

    var typezi = this.getCheckTypeZiList(this.reverseCheckType(obj.check_type))
    this.setData({
      checkTypeZis: typezi
    })
    

    this.setData({
      toUser: obj.to_user,
      ccPeople: obj.cc_people,
      context: obj.context,
      imgs: obj.image_url,
      risk: this.reverseRisk(obj.risk_level),
      //risk_index: riskIndex,
      riskTF: true,
      endDate: obj.set_end_time,
      process_status: this.reverseStatus(obj.process_status),
      checkType: this.reverseCheckType(obj.check_type),
      checkTypeTF: true,
      checkTypeZi: obj.check_type_offspring,
      checkTypeZiTF: true,
      //toUser_index: 0,
      toUserTF: true,
      //ccPeople_index: ccIndex,
      ccPeopleTF: true
      

    })

    console.log(this.data.risk)
    console.log(this.data.checkType)
    console.log(this.data.toUser_index)

    
      
  },

  // findToUserIndex(name) {
  //   console.log("users",this.data.toUsers)
  //   return this.data.toUsers.findIndex((item) => {
  //     return item === name
  //   })
  // },
  // findCcIndex(name) {
  //   console.log("ccPeople",this.data.ccPeople)
  //   return this.data.ccPeoples.findIndex((item) => {
  //     return item === name
  //   })
  // },
  // findRiskIndex(risk) {
    
  //   var riskName = this.reverseRisk(risk)
  //   console.log("risk",riskName)
  //   return this.data.risks.findIndex((item) => {
  //     return item === riskName
  //   })
  // },
  // findCheckIndex(checkType) {
  //   var checkName = ''
  //   if(checkType === 0) {
  //     checkName = '安全'
  //   } else {
  //     checkName = '质量'
  //   }
  //   console.log("checkName",checkName)
  //   return this.data.checkTypes.findIndex((item) => {
  //     return item === checkName
  //   })
  // },
  // findProcessIndex(process) {
  //   var processName = this.reverseStatus(process)
  //   return this.data.processArr.findIndex((item) => {
  //     return item === processName
  //   })
  // },
  


  // bind函数系列
  bindToUser() {
    this.setData({
      toUserTF: true
    })
  },
  bindCcPeople() {
    this.setData({
      ccPeopleTF: true
    })
  },
  bindRisk() {
    this.setData({
      riskTF: true
    })
  },
  // bindProcess() {
  //   this.setData({
  //     riskTF: true
  //   })
  // },
  bindCheckType() {
    this.setData({
      checkTypeTF: true
    })
  },
  bindCheckTypeZi() {
    this.setData({
      checkTypeZiTF: true
    })
  },

  //bindChange函数系列
  bindToUserChange(e) {
    console.log("ToUSer", e.detail.value)
    console.log(e)

    var temp = this.data.toUsers[e.detail.value]
   
    this.setData({
      toUser_index: e.detail.value,
      toUser: temp
    })
  },

  bindCcPeopleChange(e) {
    console.log("ccPeople", e.detail.value)
    console.log(e)

    var temp = this.data.ccPeoples[e.detail.value]
   
    this.setData({
      ccPeople_index: e.detail.value,
      ccPeople: temp
    })
  },

  bindRiskChange(e) {
    console.log("risk", e.detail.value)
    console.log(e)

    var temp = this.data.risks[e.detail.value]
   
    this.setData({
      risk_index: e.detail.value,
      risk: temp
    })
  },

  bindDateChange(e) {
    console.log("endDate", e.detail.value)
    console.log(e)

    this.setData({
      endDate: e.detail.value
      
    })
  },
  bindProcessChange(e) {
    console.log("process", e.detail.value)
    console.log(e)

    var temp = this.data.processArr[e.detail.value]
    console.log(temp)
     this.setData({
       process_index: e.detail.value,
       process_status: temp
     })
     console.log("process_status",this.data.process_status)
  },
  

  bindCheckTypeChange(e) {
    console.log("checkType", e.detail.value)
    console.log(e)
   
    var temp = this.data.checkTypes[e.detail.value]
   console.log(temp)
    this.setData({
      checkType_index: e.detail.value,
      checkType: temp
    })
    console.log("checkType",this.data.checkType)
    this.getCheckTypeZiList(temp)
  },


  bindCheckTypeZiChange(e) {
    console.log("checkTypeZi", e.detail.value)
    console.log(e)
   
    var temp = this.data.checkTypeZis[e.detail.value]
   
    this.setData({
      checkTypeZi_index: e.detail.value,
      checkTypeZi: temp
    })
    console.log("checkTypeZi", this.data.checkTypeZi)
  },
  async getCheckTypeZiList(checkType) {
    if(checkType === '安全') {
      var tmp = ["安全1", "安全2", "安全3"]
    } else {
      var tmp = ["质量1", "质量2", "质量3"]
    }
    this.setData({
      checkTypeZis: tmp
    })
  },

  
  

  tianxieContent(e) {
    console.log("content", e.detail.value)
    this.setData({
      context: e.detail.value
    })
  },

  riskLevelConvert(riskLevel) {
    if(riskLevel === '一级') {
      return 1
    } else if(riskLevel === '二级') {
      return 2
    } else if(riskLevel === '三级') {
      return 3
    } else {
      return 4
    }
  },
  reverseRisk(num) {
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
  },
  reverseStatus(num) {
    if(num === 0) {
      return '未处理'
    }
    if(num === 1) {
      return '处理中'
    }
    if(num === 2) {
      return '已完成'
    }
  },
  reverseCheckType(num) {
    if(num === 0) {
      return '安全'
    } else {
      return '质量'
    }
  },

  




  async tianbao() {
    if(this.data.toUser === '') {
      wx.showToast({
        title: '请先选择接收人',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if(this.data.ccPeople === '') {
      wx.showToast({
        title: '请先选择抄送人',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if(this.data.endDate === '') {
      wx.showToast({
        title: '请先选择预计结束时间',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if(this.data.risk === '') {
      wx.showToast({
        title: '请先选择风险等级',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if(this.data.checkType === '') {
      wx.showToast({
        title: '请先选择检查类型',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if(this.data.checkTypeZi === '') {
      wx.showToast({
        title: '请先选择子检查类型',
        icon: 'none',
        duration: 2000
      })
      return
    }


   
    
    
    
    

    const submitParam = {
      openid: this.openId,
      construction_site_name: this.data.construction_site_name,
      from_user: this.data.from_user,
      to_user: this.data.toUser,
      cc_people: this.data.ccPeople,
      context: this.data.context,
      image_url: this.data.imgs,
      risk_level: this.riskLevelConvert(this.data.risk),
      set_end_time: this.data.endDate,
      check_type: this.data.checkType,
      check_type_offspring: this.data.checkTypeZi
    }

    console.log(submitParam)

    wx.switchTab({
      url: '/pages/myfaqi/index',
      
      success: function(e) {
        console.log('aaa')
        var page =  getCurrentPages().pop();
        console.log(page)
        if(page == undefined || page == null) return;
        // page.onShow();
        page.onLoad();
      }

    })
    
    
    // var url = `/school/saveUserInfo?openid=${this.openId}&province=${this.data.provinceCode}&category=${this.data.leibie}&batch=${this.data.pici}&subject=${allSubject}&city=${this.data.city}&citycode=${this.data.cityCode}&address=${this.data.address}&addresscode=${this.data.addressCode}&schoolname=${this.data.schoolName}`
    // const res = await request({url:url,method:"post"});
    // console.log(res)
    // if(res.msg === '成功') {
      
    //   wx.switchTab({
    //     url: '/pages/user1/index',
        
    //     success: function(e) {
    //       console.log('aaa')
    //       var page =  getCurrentPages().pop();
    //       console.log(page)
    //       if(page == undefined || page == null) return;
    //       // page.onShow();
    //       page.onLoad();
    //     }

    //   })
    // } else {
    //   wx.showToast({
    //     title: '提交失败',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return
    // }

  },


   // 上传图片
   chooseImg: function (e) {
    var that = this;
    var imgs = this.data.imgs;
    if (imgs.length >= 9) {
      this.setData({
        lenMore: 1
      });
      setTimeout(function () {
        that.setData({
          lenMore: 0
        });
      }, 2500);
      return false;
    }
    wx.chooseImage({
      // count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs = that.data.imgs;
        // console.log(tempFilePaths + '----');
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 9) {
            that.setData({
              imgs: imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
        // console.log(imgs);
        that.setData({
          imgs: imgs
        });
      }
    });
    
  },


  // 删除图片
  deleteImg: function (e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs
    });
  },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },



 

  


  
})
