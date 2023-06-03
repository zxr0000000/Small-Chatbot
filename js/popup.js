"use strict";

const sendButton = document.getElementById("send-button");
const showButton = document.getElementById("show-button");
const chatWindow = document.getElementById("chat-window");
const input = document.getElementById("message-input");

// 发送按钮点击触发
sendButton.addEventListener("click", function () {
  //发送信息给后台脚本
  chrome.runtime.sendMessage({ text: input.value });

  // 创建新的消息元素
  const newMessage = document.createElement("div");
  newMessage.classList.add("chat-message", "sender");
  newMessage.textContent = input.value;

  //将新的消息元素添加到聊天窗口
  chatWindow.appendChild(newMessage);

  //清空已输入信息
  input.value = "";

  //设置焦点
  input.focus();
});

// 按下 enter 触发
input.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    sendButton.click();
  }
});

//接收到信息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // 创建新的消息元素
  const newMessage = document.createElement("div");
  newMessage.classList.add("chat-message", "receiver");
  newMessage.textContent = message.data;

  //将新的消息元素添加到聊天窗口
  chatWindow.appendChild(newMessage);
});
