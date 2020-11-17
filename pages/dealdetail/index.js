// 0 引入 用来发送请求的 方法 一定要把路径补全
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import qs from "../../utils/qs"

Page({
  data: {
    showForm: false,
    toUsers: [],
    toUser_index: undefined,
    toUser: '',

    ccPeoples: [],
    ccPeople_index: undefined,
    ccPeople: '',
    schedule: undefined,
    scheduleZi: undefined,

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

    context: '',
    dealcontext: '',
    construction_site_name: '',
    from_user: '',
    toUserTF: false,
    ccPeopleTF: false,
    riskTF: false,
    checkTypeTF: false,
    checkTypeZiTF: false,

    processArr: ['未处理', '处理中', '已完成', '逾期'],
    process_index: undefined,
    process_status: '',


    imgs: [],
    videos: [],
    dealimgs: [],
    dealVideos: [],

    id: undefined,
   
    
    openId: undefined
  },
  

  onShow: function(options) {
    
  
      
  },
  // 页面开始加载 就会触发
  onLoad: function (options) {
    var id = options.id;
    this.setData({
      id: id
    })
    this.getCheckType()
    // this.getToUSers()
    // this.getCcPeoples()
    this.getInfoById(id)
      
  },


  async getCheckType() {
    const res=await request({url:"system/safe/getCheckType", method: 'get'});
    console.log("获取checkTypeList",res)
    
    this.setData({
      checkTypes: res.data
    })
  },

  async getToUSers() {
    const res=await request({url:"system/safe/getAllToUser", method: 'get'});
    console.log("获取ToUsersList",res)
    
    this.setData({
      toUsers: res.data
    })
  },

  async getCcPeoples() {
    const res=await request({url:"system/safe/getAllCcPeople", method: 'get'});
    console.log("获取CcPeopleList",res)
    
    this.setData({
      ccPeoples: res.data
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

  async getInfoById(id) {
    var url = `system/safe/getCheckInfoById?id=${id}`
    const res=await request({url:url, method: 'get'});
    console.log("获取List",res)
    var obj = res.data
    var riskName = this.reverseRisk(obj.riskLevel)
    var processName = this.reverseStatus(obj.processStatus)
    
    var img_1 = []
    var dealimg_1 = []
    var videos_1 = []
    var dealvideo_1 = []
    img_1.push(obj.imageUrl)
    if(obj.videoUrl === null) {
      videos_1 = []
    } else {
      videos_1.push(obj.videoUrl)
    }
    if(obj.processStatus === 3 && obj.safetyAndQualityProcessList.length > 1) {
      var safetyAndQualityProcessList1 = obj.safetyAndQualityProcessList[1]
      var dealcontext = safetyAndQualityProcessList1.context
      dealimg_1.push(safetyAndQualityProcessList1.imageUrl)
      if(safetyAndQualityProcessList1.videoUrl === null) {
        dealvideo_1 = []
      } else {
        dealvideo_1.push(safetyAndQualityProcessList1.videoUrl)
      }
    }
    
    
    
    
    
    var typezi = this.getCheckTypeZiList(obj.checkType)
    this.setData({
      checkTypeZis: typezi
    })
    this.setData({
      ccPeople: obj.ccPeople,
      checkType: obj.checkType,
      checkTypeZi: obj.checkTypeOffspring,
      schedule: obj.planName,
      scheduleZi: obj.sectionName,
      construction_site_name: obj.constructionSiteName,
      context: obj.context,
      from_user: obj.fromUser,
      imgs: img_1,
      videos: videos_1,
      process_status: processName,
      risk: riskName,
      endDate: obj.setEndTime.split(" ")[0],
      toUser: obj.toUser,
      checkTypeTF: true,
      riskTF: true,
      checkTypeZiTF: true,
      toUserTF: true,
      ccPeopleTF: true,
      dealcontext: dealcontext,
      dealimgs: dealimg_1,
      dealVideos: dealvideo_1
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
  

  tianxieContent(e) {
    console.log("content", e.detail.value)
    this.setData({
      dealcontext: e.detail.value
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
  

  




  async tianbao() {
    if(this.data.dealcontext === '') {
      wx.showToast({
        title: '请先填写处理内容',
        icon: 'none',
        duration: 2000
      })
      return
    }

    
    // const submitParam = {
    //   openid: this.openId,
    //   construction_site_name: this.data.construction_site_name,
    //   from_user: this.data.from_user,
    //   to_user: this.data.toUser,
    //   cc_people: this.data.ccPeople,
    //   context: this.data.context,
    //   image_url: this.data.imgs,
    //   risk_level: this.riskLevelConvert(this.data.risk),
    //   set_end_time: this.data.endDate,
    //   check_type: this.data.checkType,
    //   check_type_offspring: this.data.checkTypeZi
    // }

    // console.log(submitParam)

    //var url = `system/safe/insertCheckProcessInfo?initCheckId=${this.data.id}&status=3&context=${this.data.dealcontext}&imageUrl=${this.data.dealimgs}&videoUrl=${this.data.dealVideos}`
    var params = {
      initCheckId: this.data.id,
      status: 3,
      context: this.data.dealcontext,
      imageUrl:this.data.dealimgs[0],
      videoUrl: this.data.dealVideos[0]
    }
    var url = `system/safe/insertCheckProcessInfo?${qs.stringify(params)}`
    const res=await request({url:url, method: 'post'});
    console.log("状态变成处理中",res)

    if(res.code === 200) {
      wx.showToast({
        title: '状态修改成功',
        icon: 'none',
        duration: 2000
      })
      wx.navigateTo({
        url: '/pages/mydeal/index',
        
        success: function(e) {
          console.log('aaa')
        }

      })
    } else {
      wx.showToast({
        title: '修改失败',
        icon: 'none',
        duration: 2000
      })
    }

  },


   // 上传图片
   chooseImg: function (e) {
    var that = this;
    var dealimgs = this.data.dealimgs;
    if (dealimgs.length >= 9) {
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
        var dealimgs = that.data.dealimgs;
        // console.log(tempFilePaths + '----');
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (dealimgs.length >= 9) {
            that.setData({
              dealimgs: dealimgs
            });
            return false;
          } else {
            dealimgs.push(tempFilePaths[i]);
          }
        }
        // console.log(imgs);
        that.setData({
          dealimgs: dealimgs
        });
      }
    });
    
  },

  uploadImage() {
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
                  dealimgs: tmpArr
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


  // 删除图片
  deleteImg: function (e) {
    var dealimgs = this.data.dealimgs;
    var index = e.currentTarget.dataset.index;
    dealimgs.splice(index, 1);
    this.setData({
      dealimgs: dealimgs
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

  previewDealImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var dealimgs = this.data.dealimgs;
    wx.previewImage({
      //当前显示图片
      current: dealimgs[index],
      //所有图片
      urls: dealimgs
    })
  },


  async clickChulizhong() {

    this.setData({
      showForm: false
    })
    
    var url = `system/safe/insertCheckProcessInfo?initCheckId=${this.data.id}&status=2`

    const res=await request({url:url, method: 'post'});
    console.log("状态变成处理中",res)

    if(res.code === 200) {
      wx.showToast({
        title: '状态修改成功',
        icon: 'none',
        duration: 2000
      })
      wx.navigateTo({
        url: '/pages/mydeal/index',
        
        success: function(e) {
          console.log('aaa')
        }

      })
    } else {
      wx.showToast({
        title: '修改失败',
        icon: 'none',
        duration: 2000
      })
    }
  },
  async clickFinish() {
    this.setData({
      showForm: true
    })
    
  },
  uploadVideo() {
    console.log("!!!")
    var that = this;
   
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      compressed: true,
      maxDuration: 10,
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log("视频:", res)
        // if(res.duration > 10) {
        //   wx.showModal({
        //     title: '错误提示',
        //     content: '视频不能超过10秒',
        //     showCancel: false,
        //     success: function (res) { }
        //   })
        //   return;
        // }
        var tmpFilePath = res.tempFilePath;
        console.log("路径：", tmpFilePath)
        //启动上传等待中...
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        console.log("AAA")

       
   
          wx.uploadFile({
            url: 'https://zhgdxcs.jiangongtong.cn/wechat/system/safe/uploadFile',
            filePath: tmpFilePath,
            name: 'file',
            
            header: {
              "Content-Type": "multipart/form-data"
            },
            success: function (res) {
              wx.hideToast();
              console.log("上传视频:", res)
              var data = JSON.parse(res.data);
              //服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }
              console.log(data);
              console.log("res", res)
              if(data.code !== 200) {
                wx.showModal({
                  title: '上传错误',
                  content: '上传失败，请重新上传',
                  showCancel: false,
                  success: function (res) { }
                })
              } else {
                var tmpArr = []
                tmpArr.push(data.data)
                console.log("tmpArr", tmpArr)
                that.setData({
                  dealVideos: tmpArr
                })
              }
            },
            fail: function (res) {
              wx.hideToast();
              wx.showModal({
                title: '错误提示',
                content: '上传视频失败',
                showCancel: false,
                success: function (res) { }
              })
            }
          });
      }
    });
  },
  deleteVideo: function (e) {
    var videos = this.data.dealVideos;
    var index = e.currentTarget.dataset.index;
    videos.splice(index, 1);
    this.setData({
      dealVideos: videos
    });
  },




 

  


  
})
