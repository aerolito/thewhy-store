// page loader progress bar for the client side

const pageLoaderProgressbar = () => {
  const progressBar = document.getElementById('progress-bar');
  const progressBarWidth = document.getElementById('progress-bar-width');
  const progressBarText = document.getElementById('progress-bar-text');

  if (progressBar) {
    progressBar.style.display = 'block';
    progressBarWidth.style.width = '0%';
    progressBarText.innerHTML = '0%';
  }

  const loadPage = () => {
    if (progressBar) {
      progressBar.style.display = 'none';
    }
  };

  const updateProgress = (percentage) => {
    if (progressBar) {
      progressBarWidth.style.width = percentage + '%';
      progressBarText.innerHTML = percentage + '%';
    }
  };

  return {
    loadPage,
    updateProgress,
  };
};
