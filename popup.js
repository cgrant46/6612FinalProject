function updateStatus(message, imageURL) {
  document.getElementById('status').innerText = message;
  document.getElementById('icon_check').innerHTML = `<img src="${imageURL}" style="width:30px;height:30px;visiblity:visible;">`;
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('checkSafetyButton').addEventListener('click', function () {
    updateStatus('Checking website safety...', '/images/loading.gif');
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'parseAndCheckSafety' });
    });
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updatePopup") {
    updateStatus(message.message, message.imageURL);
  }
});
