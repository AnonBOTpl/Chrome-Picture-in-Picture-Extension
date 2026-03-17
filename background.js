chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-pip') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'togglePiP' });
      }
    });
  }
});

let activeTabId = null;

chrome.tabs.onActivated.addListener((activeInfo) => {
  const newActiveTabId = activeInfo.tabId;

  if (activeTabId !== null && activeTabId !== newActiveTabId) {
    // Karta przestała być aktywna
    chrome.tabs.sendMessage(activeTabId, { action: 'tabLostFocus' }).catch(() => {});
  }

  // Nowa karta stała się aktywna
  chrome.tabs.sendMessage(newActiveTabId, { action: 'tabGainedFocus' }).catch(() => {});
  activeTabId = newActiveTabId;
});

chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    if (activeTabId !== null) {
      // Okno Chrome straciło focus
      chrome.tabs.sendMessage(activeTabId, { action: 'tabLostFocus' }).catch(() => {});
    }
  } else {
    chrome.tabs.query({ active: true, windowId: windowId }, (tabs) => {
      if (tabs[0]) {
        activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, { action: 'tabGainedFocus' }).catch(() => {});
      }
    });
  }
});