chrome.runtime.onMessage.addListener( async (message, sender, sendResponse) => {
  console.log('Service worker recieved message.');
  if (message.action === 'parseAndCheckSafety') {
    console.log('Service worker got message to parse; sending to content script');
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'parseAndCheckSafety' });
    });
  }
  
  if (message.urls) {
    async function checkSafety(urls) {
      // Your safety check logic here
      data = {}
      for( let i = 0; i < urls.length; ++i )
        data[ encodeURIComponent(String(i)) ] = encodeURIComponent(urls[i])
      const params = new URLSearchParams(data)
      fetch( 'http://18.191.212.53/?' + params, {
        'method': 'GET'
      } ).then( response =>  response.json() )
      .then( ( response ) => {
        score = parseFloat(response);
        console.log(response)
        if ( score >= 0.3333 ) {
          console.log("ISSAFE");
          const displayMessage = 'This webpage is safe.';
          const iconPath = 'images/safe_icon.png';
          chrome.runtime.sendMessage({ action: 'updatePopup', message: displayMessage, imageURL: iconPath });
          return true;
        }
        else {
          console.log("ISNOTSAFE");
          const displayMessage = 'This webpage may contain unsafe URLs.';
          const iconPath = 'images/unsafe_icon.png';
          chrome.runtime.sendMessage({ action: 'updatePopup', message: displayMessage, imageURL: iconPath });
          return false;
        }
      } )
    }
    console.log('Service worker got message to check safety of urls.');
    const isSafe = await checkSafety(message.urls);
    /* const displayMessage = isSafe ? 'This webpage is safe.' : 'This webpage may contain unsafe URLs.';
    const iconPath = isSafe ? 'images/safe_icon.png' : 'images/unsafe_icon.png';

    chrome.runtime.sendMessage({ action: 'updatePopup', message: displayMessage, imageURL: iconPath }); */
  }
});
