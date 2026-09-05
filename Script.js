let introFinished = false;

function endIntro() {
  if (introFinished) return;
  introFinished = true;

  const introScreen = document.getElementById('intro-screen');
  const mainContent = document.getElementById('main-content');

  if (mainContent) {
    mainContent.style.display = 'block';
  }

  if (introScreen) {
    introScreen.style.opacity = '0';
    introScreen.style.pointerEvents = 'none';
    setTimeout(() => {
      introScreen.style.display = 'none';
    }, 600);
  }
}

// Page load hote hi timers setup karo
document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('intro-video');

  if (video) {
    video.onended = endIntro;
    video.onerror = () => {
      // Video na mile toh auto transition
      setTimeout(endIntro, 3000);
    };
  }

  // Backup fallback: 3.5 seconds mein apne aap home page aayega
  setTimeout(endIntro, 3500);
});

// Tab Switcher (Insta / FB / YouTube)
function switchTab(platform, element) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));

  if (element) element.classList.add('active');
  const target = document.getElementById(`${platform}-panel`);
  if (target) {
    target.classList.add('active');
  }
}

// YouTube Filter (Shorts vs Full Videos)
function switchYtFilter(filter, element) {
  const shorts = document.getElementById('yt-shorts-container');
  const videos = document.getElementById('yt-videos-container');

  document.querySelectorAll('.sub-tab-btn').forEach(btn => btn.classList.remove('active'));
  if (element) element.classList.add('active');

  if (filter === 'shorts') {
    if (shorts) shorts.style.display = 'grid';
    if (videos) videos.style.display = 'none';
  } else {
    if (shorts) shorts.style.display = 'none';
    if (videos) videos.style.display = 'grid';
  }
}
