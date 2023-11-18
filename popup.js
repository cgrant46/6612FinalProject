function updateStatus(message, imageURL) {
  document.getElementById('status').innerText = message;
  document.getElementById('icon_check').innerHTML = `<img src="${imageURL}" style="width:30px;height:30px">`;
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updatePopup") {
    updateStatus(message.message, message.imageURL);
  }
});

//const initialMessage = { action: "updatePopup", message: "Checking URLs in page...", imageURL: 'images/loading.gif' };
//updateStatus(initialMessage.message, initialMessage.imageURL);
