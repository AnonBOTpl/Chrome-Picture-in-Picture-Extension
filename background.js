chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-pip') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        // Zignorowanie błędu jeśli ramka nie nasłuchuje (np. ramka reklamowa)
        chrome.tabs.sendMessage(tabs[0].id, { action: 'togglePiP' }).catch(() => {});
      }
    });
  }
});