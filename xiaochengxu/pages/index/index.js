//index.js
//获取应用实例
var util = require('../../utils/util.js');
var XRegExp = require('../../lib/xregexp/xregexp');

var app = getApp()
Page({
  data: {
    userInfo: {},
    dateFourWeeksAgo: 0.0,
    hs300FourWeeksAgo: 0.0,
    zs300FourWeeksAgo: 0.0,
    dateCurrent: 0.0,
    hs300Current: 0.0,
    zs300Current: 0.0,
    hs300Compare: 0.0,
    zs300Compare: 0.0,
    hs300ComparePercent: 0.0,
    zs300ComparePercent: 0.0,
    dateRealtime: '',
    hs300Realtime: 0.0,
    zs300Realtime: 0.0,
  },
  //onLoad start
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {

      var indexData = {};
      //沪深300n-4周数据
      wx.request({
        url: "https://gupiao.baidu.com/api/stocks/stockweekbar?from=pc&os_ver=2&cuid=xxx&vv=100&format=json&stock_code=sh000300&count=5",
        success: function (res) {
          // console.log(res.data)
          var indexFourWeeksAgo = parseFloat(res.data.mashData[4].kline.close).toFixed(3)
          var indexCurrent = parseFloat(res.data.mashData[0].kline.close).toFixed(3)
          // console.log(indexFourWeeksAgo)
          // console.log(indexCurrent)
          indexData.hs300FourWeeksAgo = indexFourWeeksAgo
          indexData.hs300Current = indexCurrent
          indexData.hs300Compare = (indexCurrent - indexFourWeeksAgo).toFixed(3)
          indexData.hs300ComparePercent = ((indexCurrent - indexFourWeeksAgo) / indexCurrent).toFixed(3)
        }
      })

      //中小300n-4周数据 sz399008 
      //中证500n-4周数据 sh000905 
      wx.request({
        url: "https://gupiao.baidu.com/api/stocks/stockweekbar?from=pc&os_ver=2&cuid=xxx&vv=100&format=json&stock_code=sh000905&count=5",
        success: function (res) {
          // console.log(res.data)
          var indexFourWeeksAgo = parseFloat(res.data.mashData[4].kline.close).toFixed(3)
          var indexCurrent = parseFloat(res.data.mashData[0].kline.close).toFixed(3)
          indexData.dateFourWeeksAgo = res.data.mashData[4].date
          indexData.dateCurrent = res.data.mashData[0].date
          // console.log(indexFourWeeksAgo)
           console.log(indexCurrent)

          indexData.zs300FourWeeksAgo = indexFourWeeksAgo
          indexData.zs300Current = indexCurrent
          indexData.zs300Compare = (indexCurrent - indexFourWeeksAgo).toFixed(3)
          indexData.zs300ComparePercent = ((indexCurrent - indexFourWeeksAgo) / indexCurrent).toFixed(3)
        },
      })
               console.log(indexData)

      //更新数据
      that.setData({
        userInfo: userInfo,
        dateFourWeeksAgo: indexData.dateFourWeeksAgo,
        hs300FourWeeksAgo: indexData.hs300FourWeeksAgo,
        zs300FourWeeksAgo: indexData.zs300FourWeeksAgo,
        dateCurrent: indexData.dateCurrent,
        hs300Current: indexData.hs300Current,
        zs300Current: indexData.zs300Current,
        hs300Compare: indexData.hs300Compare,
        zs300Compare: indexData.zs300Compare,
        hs300ComparePercent: indexData.hs300ComparePercent,
        zs300ComparePercent: indexData.zs300ComparePercent,
      })
    })
  },
  //onLoad end
  //事件处理函数 start
  bindViewTap: function () {
    console.log('bindViewTap')
    var that = this
  },
  //事件处理函数 end
})
