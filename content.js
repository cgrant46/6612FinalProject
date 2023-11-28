chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'parseAndCheckSafety') {
    let urls = [];
    const allLinks = document.querySelectorAll('a[href]');
    allLinks.forEach(link => {
      urls.push(link.href);
    });

    const allImages = document.querySelectorAll('img[src]');
    allImages.forEach(img => {
      urls.push(img.src);
    });

    console.log("URLs parsed.");
    chrome.runtime.sendMessage({ urls: urls });
  }
});
