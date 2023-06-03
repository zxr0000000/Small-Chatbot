"use strict";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const url = `http://api.brainshop.ai/get?bid=175781&key=Nouvy6jS5W3UFMMO&uid=175781&msg=${request.text}`;

  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      chrome.runtime.sendMessage({
        type: "BACKGROUND_TO_POPUP",
        data: result.cnt,
      });
    })
    .catch((error) => {
      console.error(error);
      sendResponse({
        error: "Failed to fetch response from BrainShop AI API.",
      });
    });

  return true;
});
