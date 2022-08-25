import React, { Component, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Button, Canvas } from "@tarojs/components";
import "./index.less";

let canvas
const app = () => {
  useEffect(() => {
    setTimeout(() => {
      const query = Taro.createSelectorQuery();
      query
        .select("#myCanvas")
        .fields({ node: true, size: true })
        .exec(res => {
          console.log("res", res);
          canvas = res[0].node;
          const ctx = canvas.getContext("2d");

          const dpr = wx.getSystemInfoSync().pixelRatio;
          canvas.width = res[0].width * dpr;
          canvas.height = res[0].height * dpr;
          ctx.scale(dpr, dpr);

          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, 300, 300);

          // ctx.fillStyle = "blue";
          // ctx.fillRect(0, 0, 100, 100);

          Taro.cloud.callFunction({
            name: 'taro-yun',
            data: {
              type: 'get-qr',
              scene: "a=1"
            },
            success: res => {
              console.log("xxx", res)
              // setSum(res.result.sum)
              const qrUrl = wx.arrayBufferToBase64(res.result.buffer)
              // console.log("qrUrl", qrUrl)
              const imageEl = canvas.createImage()
              imageEl.src = 'data:image/jpg;base64,' + qrUrl
              imageEl.onload = url => {
                console.log("url", url)
                ctx.drawImage(imageEl, 100, 100, 100, 100)
              }
            }
          })
        });
    });
  }, []);
  const fnSaveReport = () => {
    Taro.canvasToTempFilePath({
      canvas,
      canvasId: 'myCanvas',
      success: function (res) {
        console.log(res.tempFilePath)
        Taro.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res2) {
            console.log("res2", res2);
          }
        })
      }
    })
  }
  return (
    <>
      <Canvas type="2d" id="myCanvas" canvasId="myCanvas" />
      <Button type="primary" onClick={fnSaveReport}>保存</Button>
    </>
  );
};

export default app;
