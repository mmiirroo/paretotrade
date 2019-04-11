var xregexp = require('../lib/xregexp/xregexp');
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year, month, day].map(formatNumber).join('')
}


function formatDay(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year, month, day].map(formatNumber).join('')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function loadIndexData(callback) {
  console.log('loadIndexData');
  var that = this

  var indexData = {};
  wx.request({
    url: "https://api.money.126.net/data/feed/1399008,1399300",
    header: {
      // "Content-Type":"application/json"
    },
    success: function (res) {
      var patternRealtime = xregexp('_ntes_quote_callback\\((.*)\\);');
      var match = xregexp.exec(res.data, patternRealtime);
      //console.log(match[1]); 
      var realtime = JSON.parse(match[1]);

      indexData.zs300Realtime = parseFloat(realtime['1399008'].price).toFixed(3);
      indexData.hs300Realtime = parseFloat(realtime['1399300'].price).toFixed(3);
      indexData.dateRealtime = realtime['1399300'].update
      console.log(indexData.dateRealtime + ' in util');

    },
    fail: function (err) {
      console.log(err)
    }

  })

  //中小300n-4周数据
  wx.request({
    url: "https://gupiao.baidu.com/api/stocks/stockweekbar?from=pc&os_ver=2&cuid=xxx&vv=100&format=json&stock_code=sz399008&count=5",
    header: {
      // "Content-Type":"application/json"
    },
    success: function (res) {
      // console.log(res.data)
      var indexFourWeeksAgo = parseFloat(res.data.mashData[4].kline.close).toFixed(3)
      var indexCurrent = parseFloat(res.data.mashData[0].kline.close).toFixed(3)
      indexData.dateFourWeeksAgo = res.data.mashData[4].date
      indexData.dateCurrent = res.data.mashData[0].date
      // console.log(indexFourWeeksAgo)
      // console.log(indexCurrent)

      indexData.zs300FourWeeksAgo = indexFourWeeksAgo
      indexData.zs300Current = indexCurrent
      indexData.zs300Compare = (indexCurrent - indexFourWeeksAgo).toFixed(3)
      indexData.zs300ComparePercent = ((indexCurrent - indexFourWeeksAgo) / indexCurrent).toFixed(3)
    },
    fail: function (err) {
      console.log(err)
    }
  })

  //沪深300n-4周数据
  wx.request({
    url: "https://gupiao.baidu.com/api/stocks/stockweekbar?from=pc&os_ver=2&cuid=xxx&vv=100&format=json&stock_code=sh000300&count=5",
    header: {
      // "Content-Type":"application/json"
    },
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
    },
    fail: function (err) {
      console.log(err)
    }
  })
  console.log('loadIndexData, indexData');
  console.log(indexData);
  console.log(indexData.hs300Current);

  callback(indexData);

}

module.exports = {
  formatDay: formatDay,
  formatTime: formatTime,
  loadIndexData: loadIndexData,
}
