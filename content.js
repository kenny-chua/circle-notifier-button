// content.js

(function() {
    'use strict';
  
    // Function to send a message to the service worker to show a notification
    function sendNotification(title, message) {
      chrome.runtime.sendMessage({
        type: 'showNotification',
        options: {
          title: title,
          message: message,
          iconUrl: chrome.runtime.getURL('icons/icon128.png'),
          type: 'basic',
          requireInteraction: true,
          buttons: [
            { title: 'Open Messages' },
            { title: 'Dismiss' }
          ]
        }
      });
    }
  
    // Function to check for new messages
    function checkForNewMessages() {
      // Select the unread messages indicator
      const indicator = document.querySelector('span[data-testid="unread-messages-count"]');
  
      if (indicator) {
        // Check if the indicator is visible (has unread messages)
        const isVisible = indicator.offsetParent !== null;
  
        if (isVisible) {
          // Get the number of unread messages
          const unreadCount = indicator.textContent.trim() || 'new';
  
          // Send notification
          sendNotification(
            'New Message on Circle.so',
            `You have ${unreadCount} unread message(s).`
          );
        }
      }
    }
  
    // Observe changes in the unread messages indicator
    function observeUnreadMessages() {
      const indicator = document.querySelector('span[data-testid="unread-messages-count"]');
  
      if (indicator) {
        const observer = new MutationObserver(checkForNewMessages);
        observer.observe(indicator, { attributes: true, childList: true, subtree: true });
      } else {
        // If the indicator is not found, try again after a delay
        setTimeout(observeUnreadMessages, 1000);
      }
    }
  
    // Initialize the script when the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function() {
      checkForNewMessages();
      observeUnreadMessages();
    });
  })();
  