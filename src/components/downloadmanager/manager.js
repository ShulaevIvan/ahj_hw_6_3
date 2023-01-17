export default class DownloadManager {
  constructor(appTag) {
    this.appContainer = document.querySelector(appTag);
    this.fileRow = Array.from(this.appContainer.querySelectorAll('.position-row'));
    this.allLinks = Array.from(this.appContainer.querySelectorAll('.file-link'));
    this.allFiles = {
      file1:this.allLinks[0].href, 
      file2:this.allLinks[1].href, 
      file3:this.allLinks[2].href, 
      file4:this.allLinks[3].href,
    };
    this.allFilesParam = [];
    this.totalTag = this.appContainer.querySelector('.size');
    this.totalSum = 0;

    this.onprogress = (e) => {
      this.totalSum += e.loaded / 1024 / 1024;
    };

    this.download = (e) => {
      const link = e.target.closest('.file-link');
      const name = e.target.parentNode.parentNode.querySelector('.position-name');
      const hrefData = e.target.href;
      const file = new File([hrefData], '');
      const reader = new FileReader();
      reader.onprogress = this.onprogress;
      reader.readAsDataURL(file);
      link.setAttribute('download', name.textContent);
      if (this.totalSum === 0) this.totalSum += Number(file.size / 1024 / 1024);
      this.totalTag.textContent = `${this.totalSum.toFixed(2)}Mb`;
      return false;
    };
  }

  init() {
    let counter = 1;
    Object.entries(this.allFiles).forEach((item) => {
      const file = new File([item], item[0]);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const fileParam = {
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)}Mb`,
      };
      this.allFilesParam.push(fileParam);
    });

    for (let i = 0; i < this.fileRow.length; i += 1) {
      const positionSize = this.fileRow[i].querySelector('.position-size');
      this.allLinks[i].addEventListener('click', this.download);
      positionSize.textContent = this.allFilesParam[i].size;
    }

    this.allLinks.forEach((item) => {
      if (counter < Object.keys(this.allFiles).length + 1) {
        item.setAttribute('data-link', `file${counter}`);
        // eslint-disable-next-line
        item.href = this.allFiles[item.dataset.link];
        counter += 1;
        item.addEventListener('click', this.download);
      }
    });
  }
}
