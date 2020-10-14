// 0 引入 用来发送请求的 方法 一定要把路径补全
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    toUsers: [],
    toUser_index: undefined,
    toUser: '',

    ccPeoples: [],
    ccPeople_index: undefined,
    ccPeople: '',

    risks: ["一级","二级","三级","四级"],
    risk_index: undefined,
    risk: undefined,

    endDate: undefined,
    checkTypes: [],
    checkType_index: undefined,
    checkType: undefined,

    checkTypeZis: [],
    checkTypeZi_index: undefined,
    checkTypeZi: undefined,

    schedules: [],
    schedule_index: undefined,
    schedule: undefined,
    scheduleId: undefined,

    scheduleZis: [],
    scheduleZi_index: undefined,
    scheduleZi: undefined,
    scheduleZiId: undefined,

    context: '',
    construction_site_name: '',
    from_user: '',
    toUserTF: false,
    ccPeopleTF: false,
    riskTF: false,
    checkTypeTF: false,
    checkTypeZiTF: false,
    scheduleTF: false,
    scheduleZiTF: false,
    lenMore: 0,
    imgs: [],

   
    
    
  },
  

  onShow: function(options) {
    
    
  
      
  },
  // 页面开始加载 就会触发
  onLoad: function (options) {

    var username = wx.getStorageSync("userName")
    var construction_site_name = wx.getStorageSync("deptName")
  
    this.setData({
      from_user: username,
      construction_site_name: construction_site_name
    })
    this.getCheckType()
    this.getSchedule()
    this.getPerson()
   
  },

  async getPerson() {
    var deptId = wx.getStorageSync("deptId")
    
    var url =  `system/safe/getPerson?deptId=${deptId}`
    const res=await request({url:url, method: 'get'});
    console.log("获取PersonList",res)
    
    this.setData({
      toUsers: res.data,
      ccPeoples: res.data
    })
  },

  // async getToUSers() {
  //   const res=await request({url:"system/safe/getAllToUser", method: 'get'});
  //   console.log("获取ToUsersList",res)
    
  //   this.setData({
  //     toUsers: res.data
  //   })
  // },

  // async getCcPeoples() {
  //   const res=await request({url:"system/safe/getAllCcPeople", method: 'get'});
  //   console.log("获取CcPeopleList",res)
    
  //   this.setData({
  //     ccPeoples: res.data
  //   })
  // },

  findToUserIndex(name) {
    console.log("users",this.data.toUsers)
    return this.data.toUsers.findIndex((item) => {
      return item === name
    })
  },
  


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

  bindSchedule() {
    this.setData({
      scheduleTF: true
    })
  },
  bindScheduleZi() {
    this.setData({
      scheduleZiTF: true
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

  bindScheduleChange(e) {
    console.log("scheduleSSS", e.detail.value)
    console.log("eee", e)
   
    var temp = this.data.schedules[e.detail.value].durationDictName
   console.log(temp)
    this.setData({
      schedule_index: e.detail.value,
      schedule: temp,
      scheduleId: this.data.schedules[e.detail.value].id
    })
    console.log("schedule",this.data.schedule)
    this.getScheduleZiList(this.data.schedules[e.detail.value].id)
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

  bindScheduleZiChange(e) {
    console.log("scheduleZi", e.detail.value)
    console.log(e)
   
    var temp = this.data.scheduleZis[e.detail.value]
   
    this.setData({
      scheduleZi_index: e.detail.value,
      scheduleZi: temp,
      scheduleZiId: this.data.scheduleZis[e.detail.value].id
    })
    console.log("scheduleZi", this.data.scheduleZi)
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
    if(num === 1) {
      return '未处理'
    }
    if(num === 2) {
      return '处理中'
    }
    if(num === 3) {
      return '已完成'
    }
    if(num === 4) {
      return '逾期'
    }
  },

  async getCheckType() {
    const res=await request({url:"system/safe/getCheckType", method: 'get'});
    console.log("获取checkTypeList",res)
    
    this.setData({
      checkTypes: res.data
    })
  },
  async getSchedule() {
    var deptId = wx.getStorageSync("deptId")
    var url =`schedule/getOneSche?siteId=${deptId}`
    const res=await request({url:url, method: 'get'});
    console.log("获取ScheduleList",res)
    
    this.setData({
      schedules: res.data
    })
  },

  async getCheckTypeZiList(checkType) {
    var url = `system/safe/getCheckTypeOffspring?type=${checkType}`
    const res=await request({url:url});
    console.log("获取checkTypeziList",res)
    this.setData({
      checkTypeZis: res.data
    })
  },

  async getScheduleZiList(id) {
    var url = `schedule/getTwoSche?planId=${id}`
    const res=await request({url:url});
    console.log("获取ScheduleziList",res)
    this.setData({
      scheduleZis: res.data
    })
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

    if(this.data.schedule === '') {
      wx.showToast({
        title: '请先选择一级进度',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if(this.data.scheduleZi === '') {
      wx.showToast({
        title: '请先选择二级进度',
        icon: 'none',
        duration: 2000
      })
      return
    }
    var endTime = `${this.data.endDate} 00:00:00`
    console.log(endTime)


   
    
    
    
    

    const submitParam = {
      openid: this.openId,
      constructionSiteName: this.data.construction_site_name,
      fromUser: this.data.from_user,
      toUser: this.data.toUser,
      ccPeople: this.data.ccPeople,
      context: this.data.context,
      imageUrl: this.data.imgs,
      riskLevel: this.riskLevelConvert(this.data.risk),
      setEndTime: endTime.toString(),
      checkType: this.data.checkType,
      checkTypeOffspring: this.data.checkTypeZi
    }

    console.log(submitParam)
    
    
    var url = `system/safe/getSafetyAndQualityInitInfo?setEndTime=${endTime}&constructionSiteName=${this.data.construction_site_name}&fromUser=${this.data.from_user}&toUser=${this.data.toUser}&ccPeople=${this.data.ccPeople}&context=${this.data.context}&imageUrl=${this.data.imgs}&riskLevel=${this.riskLevelConvert(this.data.risk)}&checkType=${this.data.checkType}&checkTypeOffspring=${this.data.checkTypeZi}&planId=${this.data.scheduleId}&sectionId=${this.data.scheduleZiId}`
    //var url = 'system/safe/getSafetyAndQualityInitInfo?'
    const res = await request({url:url,method:"post"});
    console.log("提交信息:", res)
    if(res.code === 200) {
      console.log("AAAAA")
      wx.navigateTo({
        url: '/pages/myfaqi/index',
        
        success: function(e) {
          console.log('aaa')
          // var page =  getCurrentPages().pop();
          // console.log(page)
          // if(page == undefined || page == null) return;
          // // page.onShow();
          // page.onLoad();
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
        console.log("选取照片的res", res)
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


  uploadImage() {
    console.log("!!!")
    var that = this;
   
    wx.chooseImage({
      count: 9,  //最多可以选择的图片总数
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log("路径：", tempFilePaths[0])
        //启动上传等待中...
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        console.log("AAA")

        // var url = `system/safe/uploadFile?`
        // const res=await request({url:"system/safe/uploadFile", method: 'post', data: tempFilePaths[0]});
        // console.log("获取checkTypeList",res)
   
          wx.uploadFile({
            url: 'https://zhgdxcs.jiangongtong.cn/wechat/system/safe/checkImg',
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              
            },
            header: {
              "Content-Type": "multipart/form-data"
            },
            success: function (res) {
              wx.hideToast();
              var data = JSON.parse(res.data);
              //服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }
              console.log(data);
              console.log("res", res)
              if(data.msg === "error") {
                wx.showModal({
                  title: '上传错误',
                  content: '图片涉及敏感信息，请重新上传',
                  showCancel: false,
                  success: function (res) { }
                })
              } else {
                var tmpArr = []
                tmpArr.push(data.data)
                console.log("tmpArr", tmpArr)
                that.setData({
                  imgs: tmpArr
                })
              }
            },
            fail: function (res) {
              wx.hideToast();
              wx.showModal({
                title: '错误提示',
                content: '上传图片失败',
                showCancel: false,
                success: function (res) { }
              })
            }
          });
      }
    });
  },



 

  


  
})
