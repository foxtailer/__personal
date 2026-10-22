document.querySelectorAll('.project').forEach(project => {
  const video = project.querySelector('video');
  const preview = project.querySelector('.previev-img');
  if (!video || !preview) return;

  
  video.playbackRate = 1.5;

  preview.addEventListener('mouseenter', () => {
    preview.classList.add('is-zoomed');
    
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  });

  preview.addEventListener('mouseleave', () => {
    preview.classList.remove('is-zoomed');
    video.pause();
    video.currentTime = 0; // Сброс на начало
  });
});