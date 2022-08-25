// 云函数入口文件
const cloud = require('wx-server-sdk')
const sum = require("./sum")
const getQr = require("./get-qr")
const sendMsg = require('./send-msg')
const makeOrder = require('./make-order')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const {
    type
  } = event

  switch (type) {
    case "sum":
      return await sum.main(event, context)
    case "get-qr":
      return await getQr.main(event, context)
    case "send-msg":
      return await sendMsg.main(event, context)
    case "make-order":
      return await makeOrder.main(event, context)
    default:
      return {
        event,
        openid: wxContext.OPENID,
          appid: wxContext.APPID,
          unionid: wxContext.UNIONID,
      }
  }
}