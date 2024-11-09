// background.js
  chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
    if (buttonIndex === 0) {
      // Open messages page
      chrome.tabs.create({ url: 'https://pybites.circle.so/messages' });
    } else if (buttonIndex === 1) {
      // Dismiss notification
      chrome.notifications.clear(notificationId);
    }
  });
  