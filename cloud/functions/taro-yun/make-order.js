// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const res = await cloud.cloudPay.unifiedOrder({
    "body": "小秋 TIT 店-超市",
    "outTradeNo": "1217752501201407033233368018",
    "spbillCreateIp": "127.0.0.1",
    "subMchId": "1900009231",
    "totalFee": 1,
    "envId": "test-f0b102",
    "functionName": "pay_cb"
  })
  return res
}