import React, { useState, useEffect } from "react";
import Taro, { useDidShow, useRouter } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import "./index.less";

const app = () => {
  const [sum, setSum] = useState(0);
  const fnCreateReport = () => {
    console.log("fnCreateReport...");
    Taro.navigateTo({
      url: "/pages/poster/index"
    });
  };
  const fnSubscribeMsg = () => {
    Taro.requestSubscribeMessage({
      tmplIds: ["dkmahtGe9f5QJSCLjfjKEoDuOAHTqyuGbfo9N0sNonw"],
      success: res => {
        console.log("tmplIds", res);
      }
    });
  };
  const fnSendMsg = () => {
    Taro.cloud.callFunction({
      name: "taro-yun",
      data: {
        type: "send-msg"
      },
      success: res => {
        console.log("sendMsg", res);
      }
    });
  };
  useEffect(() => {
    Taro.cloud.callFunction({
      name: "taro-yun",
      data: {
        type: "sum",
        x: 10,
        y: 20
      },
      success: res => {
        console.log("xxx", res);
        setSum(res.result.sum);
      }
    });
  }, []);
  const router = useRouter();
  useDidShow(() => {
    const options = router.params;
    console.log("useDidShow...", options);
  });
  const fnCreateOrder = () => {
    Taro.cloud.callFunction({
      name: "taro-yun",
      data: {
        type: "make-order"
      },
      success: res => {
        console.log("make-order", res);
        const payment = res.result.payment;
        wx.requestPayment({
          ...payment,
          success(res) {
            console.log("pay success", res);
          },
          fail(err) {
            console.error("pay fail", err);
          }
        });
      },
      fail: console.error
    });
  };
  return (
    <>
      <View>{sum}</View>
      <Button
        type="primary"
        class="custom-btn"
        size="small"
        onClick={fnCreateReport}
      >
        海报
      </Button>
      <Button
        type="primary"
        class="custom-btn"
        size="small"
        onClick={fnSubscribeMsg}
      >
        订阅
      </Button>
      <Button
        type="primary"
        class="custom-btn"
        size="small"
        onClick={fnSendMsg}
      >
        发送
      </Button>
      <Button
        type="primary"
        class="custom-btn"
        size="small"
        onClick={fnCreateOrder}
      >
        支付
      </Button>
    </>
  );
};

export default app;
