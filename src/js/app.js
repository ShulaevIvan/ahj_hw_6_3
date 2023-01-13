import DownloadManager from '../components/downloadmanager/manager';

window.addEventListener('DOMContentLoaded', (e) => {
  const downloadManager = new DownloadManager('.app-container');
  downloadManager.init();
});
