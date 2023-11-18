let urls = [];
console.log("MADE IT HERE!");
const allLinks = document.querySelectorAll('a[href]');
allLinks.forEach(link => {
  urls.push(link.href);
});
const allLinks2 = document.querySelectorAll('img[src]');
allLinks2.forEach(link => {
  urls.push(link.href);
})
console.log(urls);

chrome.runtime.sendMessage(urls);
