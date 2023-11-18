chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received in background script:", message.urls); // Check if the message is received
    
    // Function to check safety
    function checkSafety(urls) {
      // Implement your safety check logic here and return true/false accordingly
      // Example: Dummy function for checking if URLs contain "unsafe" keyword
      return true; //dummy function; always returns true for now
    }
  
    const isSafe = checkSafety(message.urls);
    const displayMessage = isSafe ? "This webpage is safe." : "This webpage may contain unsafe URLs.";
  
    console.log("Safety check result:", displayMessage); // Check the safety check result
    
    const iconPath = isSafe ? 'images/safe_icon.png' : 'images/unsafe_icon.png'; // Replace with your icon paths
    console.log("Icon path:", iconPath); // Check the icon path
    
    chrome.runtime.sendMessage({ action: "updatePopup", message: displayMessage, imageURL: iconPath });

  
   /* chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      func: updatePopupMessage,
      args: [displayMessage, iconPath]
    });
*/});/*
  
function updatePopupMessage(message, imageURL) {
  console.log("Updating popup with message:", message, "and image:", imageURL); // Check if this function is called
  // Modify DOM elements in the popup to update status and icon


}*/
  