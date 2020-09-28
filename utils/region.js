export function transRegion (regionName) {
    
    var regions = [
        "上海",
        "云南",
        "内蒙古",
        "北京",
        "台湾",
        "吉林",
        "四川",
        "天津",
        "宁夏",
        "安徽",
        "山东",
        "山西",
        "广东",
        "广西",
        "新疆",
        "江苏",
        "江西",
        "河北",
        "河南",
        "浙江",
        "海南",
        "湖北",
        "湖南",
        "澳门",
        "甘肃",
        "福建",
        "西藏",
        "贵州",
        "辽宁",
        "重庆",
        "陕西",
        "青海",
        "香港",
        "黑龙江"
    ]
    for(var i = 0; i < regions.length; i++) {
        if(regionName.slice(0,2) === regions[i].slice(0, 2)) {
            var tmp = {
                index: i,
                name: regions[i]
            }
            return tmp;
        }
    }
}



export function transRegion2 (regionName) {
    
    var regions = [
        "北京市",
        "天津市",
        "河北省",
        "山西省",
        "内蒙古自治区",
        "辽宁省",
        "吉林省",
        "黑龙江省",
        "上海市",
        "江苏省",
        "浙江省",
        "安徽省",
        "福建省",
        "江西省",
        "山东省",
        "河南省",
        "湖北省",
        "湖南省",
        "广东省",
        "广西壮族自治区",
        "海南省",
        "重庆市",
        "四川省",
        "贵州省",
        "云南省",
        "西藏自治区",
        "陕西省",
        "甘肃省",
        "青海省",
        "宁夏回族自治区",
        "新疆维吾尔族自治区",
        "台湾省",
        "香港特别行政区",
        "澳门特别行政区"
    ]
    for(var i = 0; i < regions.length; i++) {
        if(regionName.slice(0,2) === regions[i].slice(0, 2)) {
            var tmp = {
                index: i,
                name: regions[i]
            }
            return tmp;
        }
    }
}