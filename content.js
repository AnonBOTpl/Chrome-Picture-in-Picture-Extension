// Funkcja do włączania Picture-in-Picture
async function enterPictureInPicture(video) {
  try {
    if (document.pictureInPictureEnabled && !video.disablePictureInPicture) {
      if (document.pictureInPictureElement === video) {
        await document.exitPictureInPicture();
      } else {
        await video.requestPictureInPicture();
      }
    }
  } catch (error) {
    console.log('Nie można włączyć/wyłączyć PiP:', error);
    throw error;
  }
}

// Zmienne do ustawień
let settings = {
  showHoverBtn: true,
  enableDoubleClick: true,
  blacklist: []
};

// Aktualizuj ustawienia
function updateSettings(callback) {
  chrome.storage.sync.get({
    showHoverBtn: true,
    enableDoubleClick: true,
    blacklist: ''
  }, (items) => {
    settings.showHoverBtn = items.showHoverBtn;
    settings.enableDoubleClick = items.enableDoubleClick;
    settings.blacklist = items.blacklist.split('\n').map(d => d.trim()).filter(d => d);

    if (callback) callback();
  });
}

function isDomainBlacklisted() {
  const currentDomain = window.location.hostname;
  return settings.blacklist.some(domain =>
    currentDomain === domain || currentDomain.endsWith('.' + domain)
  );
}

// Funkcja do dodawania przycisku PiP do video
function addPiPButton(video) {
  if (isDomainBlacklisted() || !settings.showHoverBtn) {
    return;
  }

  // Sprawdź czy przycisk już istnieje
  if (video.hasAttribute('data-pip-button-added') || !video.parentNode) {
    return;
  }
  video.setAttribute('data-pip-button-added', 'true');
  // Stwórz kontener dla przycisku
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'pip-button-container';
  
  const button = document.createElement('button');
  button.className = 'pip-button';
  button.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <rect x="12" y="12" width="7" height="7" rx="1" ry="1"></rect>
    </svg>
  `;
  
  // Użyj tłumaczenia dla tooltip
  button.title = chrome.i18n.getMessage('pipTooltip');
  
  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    enterPictureInPicture(video);
  });

  buttonContainer.appendChild(button);
  
  // Pozycjonuj przycisk względem video
  video.parentNode.style.position = 'relative';
  video.parentNode.appendChild(buttonContainer);

  // Pokaż przycisk po najechaniu na video
  let hideTimeout;

  const showButton = () => {
    clearTimeout(hideTimeout);
    buttonContainer.style.opacity = '1';
  };

  const hideButton = () => {
    hideTimeout = setTimeout(() => {
      buttonContainer.style.opacity = '0';
    }, 100);
  };

  video.addEventListener('mouseenter', showButton);
  video.addEventListener('mouseleave', hideButton);
  buttonContainer.addEventListener('mouseenter', showButton);
  buttonContainer.addEventListener('mouseleave', hideButton);
}

// Znajdź wszystkie video na stronie
function findAndProcessVideos() {
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    addPiPButton(video);
  });
}

// Podwójne kliknięcie na video = PiP
document.addEventListener('dblclick', (e) => {
  if (e.target.tagName === 'VIDEO' && settings.enableDoubleClick) {
    e.preventDefault();
    enterPictureInPicture(e.target);
  }
});

// Aktualizacja po zmianie ustawień w locie
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync') {
    updateSettings();
  }
});

// Nasłuchuj wiadomości od background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'togglePiP') {
    const videos = document.querySelectorAll('video');
    let targetVideo = null;
    for (let video of videos) {
      if (!video.paused) {
        targetVideo = video;
        break;
      }
    }
    if (!targetVideo && videos.length > 0) {
      targetVideo = videos[0];
    }
    if (targetVideo) {
      enterPictureInPicture(targetVideo);
    }
  }
});


// Uruchom od razu lub poczekaj na załadowanie
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    updateSettings(findAndProcessVideos);
  });
} else {
  updateSettings(findAndProcessVideos);
}

// Uruchom dla dynamicznie dodawanego contentu
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1) { // Element node
        if (node.tagName === 'VIDEO') {
          addPiPButton(node);
        } else {
          // Sprawdź czy w dodanym elemencie są video
          const videos = node.querySelectorAll && node.querySelectorAll('video');
          if (videos) {
            videos.forEach(video => addPiPButton(video));
          }
        }
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Uruchom po załadowaniu
setTimeout(findAndProcessVideos, 1000);

// Export for testing
if (typeof module !== 'undefined') {
  module.exports = { isDomainBlacklisted, settings };
}