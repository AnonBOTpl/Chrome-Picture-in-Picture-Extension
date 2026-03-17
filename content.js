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
  }
}

// Funkcja do dodawania przycisku PiP do video
function addPiPButton(video) {
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
  button.innerHTML = '📺';
  
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
  video.addEventListener('mouseenter', () => {
    buttonContainer.style.opacity = '1';
  });

  video.addEventListener('mouseleave', () => {
    buttonContainer.style.opacity = '0';
  });
}

// Znajdź wszystkie video na stronie
function findAndProcessVideos() {
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    addPiPButton(video);
  });
}

// Obsługa skrótu klawiszowego Ctrl+Alt+P
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'p') {
    e.preventDefault();
    const videos = document.querySelectorAll('video');
    
    // Znajdź aktualnie odtwarzane video lub pierwsze dostępne
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

// Podwójne kliknięcie na video = PiP
document.addEventListener('dblclick', (e) => {
  if (e.target.tagName === 'VIDEO') {
    e.preventDefault();
    enterPictureInPicture(e.target);
  }
});

// Uruchom przy załadowaniu strony
document.addEventListener('DOMContentLoaded', findAndProcessVideos);

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