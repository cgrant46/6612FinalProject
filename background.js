chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Service worker recieved message.');
  if (message.action === 'parseAndCheckSafety') {
    console.log('Service worker got message to parse; sending to content script');
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'parseAndCheckSafety' });
    });
  }
  
  if (message.urls) {
    function checkSafety(urls) {
      // Your safety check logic here
      return false; // Dummy function; always returns true for now
    }
    console.log('Service worker got message to check safety of urls.');
    const isSafe = checkSafety(message.urls);
    const displayMessage = isSafe ? 'This webpage is safe.' : 'This webpage may contain unsafe URLs.';
    const iconPath = isSafe ? 'images/safe_icon.png' : 'images/unsafe_icon.png';

    chrome.runtime.sendMessage({ action: 'updatePopup', message: displayMessage, imageURL: iconPath });
  }
});
