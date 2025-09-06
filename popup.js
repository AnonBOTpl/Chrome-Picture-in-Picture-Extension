document.addEventListener('DOMContentLoaded', () => {
  // Inicjalizacja tekstów w języku użytkownika
  initializeTexts();
  
  const activateBtn = document.getElementById('activatePiP');
  const findBtn = document.getElementById('findVideos');
  const status = document.getElementById('status');

  function initializeTexts() {
    // Pobierz wszystkie teksty z plików językowych
    document.getElementById('popupHeader').textContent = chrome.i18n.getMessage('popupHeader');
    document.getElementById('activatePiP').textContent = chrome.i18n.getMessage('activatePipButton');
    document.getElementById('findVideos').textContent = chrome.i18n.getMessage('findVideosButton');
    document.getElementById('howToUseLabel').textContent = chrome.i18n.getMessage('howToUse');
    document.getElementById('shortcutCtrlAltPLabel').textContent = chrome.i18n.getMessage('shortcutCtrlAltP');
    document.getElementById('shortcutDoubleClickLabel').textContent = chrome.i18n.getMessage('shortcutDoubleClick');
    document.getElementById('shortcutHoverButtonLabel').textContent = chrome.i18n.getMessage('shortcutHoverButton');
    document.getElementById('hoverOnVideoLabel').textContent = chrome.i18n.getMessage('hoverOnVideo');
    document.getElementById('hoverOnVideoLabel2').textContent = chrome.i18n.getMessage('hoverOnVideo');
    document.getElementById('status').textContent = chrome.i18n.getMessage('statusReady');
  }

  function updateStatus(messageKey, substitutions = []) {
    let message = chrome.i18n.getMessage(messageKey, substitutions);
    status.textContent = message;
    setTimeout(() => {
      status.textContent = chrome.i18n.getMessage('statusReady');
    }, 3000);
  }

  // Aktywuj PiP dla bieżącego video
  activateBtn.addEventListener('click', async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      const result = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
          const videos = document.querySelectorAll('video');
          let targetVideo = null;
          
          // Znajdź odtwarzane video
          for (let video of videos) {
            if (!video.paused) {
              targetVideo = video;
              break;
            }
          }
          
          // Jeśli nic się nie odtwarza, weź pierwsze video
          if (!targetVideo && videos.length > 0) {
            targetVideo = videos[0];
          }
          
          if (targetVideo) {
            if (document.pictureInPictureEnabled && !targetVideo.disablePictureInPicture) {
              targetVideo.requestPictureInPicture()
                .then(() => console.log('PiP activated'))
                .catch(err => console.log('PiP error:', err));
              return { success: true, key: 'pipActivated' };
            } else {
              return { success: false, key: 'pipNotAvailable' };
            }
          } else {
            return { success: false, key: 'noVideoFound' };
          }
        }
      });
      
      const response = result[0].result;
      updateStatus(response.key);
    } catch (error) {
      updateStatus('errorMessage');
      console.error('Error:', error);
    }
  });

  // Znajdź video na stronie
  findBtn.addEventListener('click', async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      const result = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
          const videos = document.querySelectorAll('video');
          return {
            count: videos.length,
            playing: Array.from(videos).filter(v => !v.paused).length
          };
        }
      });
      
      const { count, playing } = result[0].result;
      
      // Użyj placeholder do podstawienia liczb w tłumaczeniu
      const message = chrome.i18n.getMessage('videosFound', [count.toString(), playing.toString()]);
      status.textContent = message;
      
      setTimeout(() => {
        status.textContent = chrome.i18n.getMessage('statusReady');
      }, 3000);
      
    } catch (error) {
      updateStatus('errorMessage');
      console.error('Error:', error);
    }
  });
});