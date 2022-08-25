// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const { page, scene } = event
  console.log("event", event)
  const res = await cloud.openapi.wxacode.getUnlimited({page: page, scene: scene || "abc=1234"})
  return res
}