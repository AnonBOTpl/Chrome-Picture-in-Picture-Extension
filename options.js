document.addEventListener('DOMContentLoaded', () => {
  // Localization
  document.title = chrome.i18n.getMessage('optionsTitle') || 'Options';
  document.querySelector('h2').textContent = chrome.i18n.getMessage('optionsTitle') || 'Options';
  document.getElementById('labelShowHoverBtn').textContent = chrome.i18n.getMessage('optShowHoverBtn') || 'Show hover button on videos';
  document.getElementById('labelEnableDoubleClick').textContent = chrome.i18n.getMessage('optEnableDoubleClick') || 'Enable double click to toggle PiP';
  document.getElementById('labelEnableAutoPip').textContent = chrome.i18n.getMessage('optEnableAutoPip') || 'Auto-PiP on tab change (Experimental)';
  document.getElementById('labelBlacklist').textContent = chrome.i18n.getMessage('optBlacklist') || 'Blacklist domains (one per line):';
  document.getElementById('saveBtn').textContent = chrome.i18n.getMessage('optSave') || 'Save';

  const showHoverBtnEl = document.getElementById('showHoverBtn');
  const enableDoubleClickEl = document.getElementById('enableDoubleClick');
  const enableAutoPipEl = document.getElementById('enableAutoPip');
  const blacklistEl = document.getElementById('blacklist');
  const saveBtn = document.getElementById('saveBtn');
  const status = document.getElementById('status');

  // Load saved options
  chrome.storage.sync.get({
    showHoverBtn: true,
    enableDoubleClick: true,
    enableAutoPip: false,
    blacklist: ''
  }, (items) => {
    showHoverBtnEl.checked = items.showHoverBtn;
    enableDoubleClickEl.checked = items.enableDoubleClick;
    enableAutoPipEl.checked = items.enableAutoPip;
    blacklistEl.value = items.blacklist;
  });

  // Save options
  saveBtn.addEventListener('click', () => {
    const showHoverBtn = showHoverBtnEl.checked;
    const enableDoubleClick = enableDoubleClickEl.checked;
    const enableAutoPip = enableAutoPipEl.checked;
    const blacklist = blacklistEl.value;

    chrome.storage.sync.set({
      showHoverBtn: showHoverBtn,
      enableDoubleClick: enableDoubleClick,
      enableAutoPip: enableAutoPip,
      blacklist: blacklist
    }, () => {
      status.textContent = chrome.i18n.getMessage('optSavedMsg') || 'Options saved.';
      setTimeout(() => {
        status.textContent = '';
      }, 2000);
    });
  });
});