// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { OPENID } = wxContext
  try {
    const res = await cloud.openapi.subscribeMessage.send({
        "touser": OPENID,
        "page": 'pages/index/index',
        "lang": 'zh_CN',
        "data": {
          "thing1": {
            "value": '吃瓜活动'
          },
          "time2": {
            "value": '2015年01月05日'
          },
          "thing3": {
            "value": 'TIT创意园'
          }
        },
        "templateId": 'dkmahtGe9f5QJSCLjfjKEoDuOAHTqyuGbfo9N0sNonw',
        "miniprogramState": 'developer'
      })
    return res
  } catch (err) {
    return err
  }
}