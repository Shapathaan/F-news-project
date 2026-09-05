
// Intro Screen Handler
const video = document.getElementById('intro-video');
const introScreen = document.getElementById('intro-screen');
const mainContent = document.getElementById('main-content');

function endIntro() {
  introScreen.style.opacity = '0';
  introScreen.style.transform = 'scale(1.03)';
  setTimeout(() => {
    introScreen.classList.add('hidden');
    mainContent.classList.remove('hidden');
  }, 650);
}

// Check if video is playable, warna 3.5s me auto transition
if (video) {
  video.onended = endIntro;
}
setTimeout(endIntro, 3500);

// Tab Switcher (Insta / FB / YouTube)
function switchTab(platform, element) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));

  element.classList.add('active');
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
  element.classList.add('active');

  if (filter === 'shorts') {
    shorts.classList.remove('hidden');
    videos.classList.add('hidden');
  } else {
    shorts.classList.add('hidden');
    videos.classList.remove('hidden');
  }
}
