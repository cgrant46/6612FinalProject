let urls = [];

const allLinks = document.querySelectorAll('a[href');
allLinks.forEach(link => {
    urls.push(link.href);
});

function checkSafety(urls) {
    //TODO: fill in this
    return true;
}

chrome.runtime.on.addListener((message, sender ,sendResponse) => {
    const isSafe = checkSafety(urls)
})