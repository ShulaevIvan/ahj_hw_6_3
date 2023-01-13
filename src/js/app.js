import file1 from '../assets/file1.pdf';
import file2 from '../assets/file2.pdf';
import file3 from '../assets/file3.pdf';
import file4 from '../assets/file4.pdf';

class DownloadManager {
    constructor(appTag) {
        this.appContainer = document.querySelector(appTag);
        this.fileRow = Array.from(this.appContainer.querySelectorAll('.position-row'));
        this.allLinks = Array.from(this.appContainer.querySelectorAll('.file-link'));
        this.allFiles = { file1, file2, file3, file4 };
        this.allFilesParam = [];
        this.total = this.appContainer.querySelector('.size');

        this.download = (e) => {
            const link = e.target.closest('.file-link')
            const name = e.target.parentNode.parentNode.querySelector('.position-name');
            const hrefData = e.target.href;
            const file = new File([hrefData], '');
            const fileSize = (file.size /1024 / 1024).toFixed(1)
            const reader = new FileReader();
            reader.readAsDataURL(file);
            link.setAttribute('download', name.textContent);
            this.total.textContent.replace(' ', '');
            console.log(this.total.textContent.replace('Mb', ''));
            this.total.textContent = `${Number(this.total.textContent) + Number(fileSize) } Mb`;


            return false;
        }
    }

    addFiles() {
        let counter = 1;
        Object.entries(this.allFiles).forEach((item) => {
            const file = new File([item], item[0]);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            const fileParam = {
                name: file.name,
                size: (file.size / 1024 / 1024).toFixed(1) + 'Mb',
            }
            this.allFilesParam.push(fileParam)
        });

        for (let i = 0; i < this.fileRow.length; i++) {
            let positionSize = this.fileRow[i].querySelector('.position-size');
            this.allLinks[i].addEventListener('click', this.download);
            positionSize.textContent = this.allFilesParam[i]['size'];
        }

        this.allLinks.forEach((item) => {
            if (counter < Object.keys(this.allFiles).length + 1) {
                item.setAttribute('data-link', `file${counter}`);
                item.href = this.allFiles[item.dataset.link];
                counter += 1;
                item.addEventListener('click', this.download)
            }
        });
    }
}
window.addEventListener('DOMContentLoaded', (e) => {
    const downloadManager = new DownloadManager('.app-container')
    downloadManager.addFiles()
})