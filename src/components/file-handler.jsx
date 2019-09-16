import I18nComponent from './i18n-base.jsx'
import Recognizer from '../libs/tf/recognizer.js'

class FileHandler extends I18nComponent {
  constructor() {
    super();
  }
  
  filterFiles (file, info) {
    if( /^image/.test(file.type) ) {
        return	info.width >= this.props.app.uploadFileMinSize && info.height >= this.props.app.uploadFileMinSize;
    }
    return false;
  }

  handleFiles (files, rejected) {
    let images = [];
    let promises = [];

    if(files.length > this.props.app.uploadCountMax) {
      files = files.slice(0, this.props.app.uploadCountMax);
    }

    if(files.length) {
        FileAPI.each(files, file => {
            promises.push(
                new Promise((resolve, reject) => {
                    FileAPI.Image(file).preview(this.props.app.uploadFilePreviewSize).get((err, img) => {
                        images.push(img);
                        resolve();
                    });
                })
            );
        });
        Promise.all(promises).then( result => {
            this.props.onFilesChanged(images);
            this.getPredictions(images);
        });
    }
  }

  getPredictions(images) {
    let predictions = [];
    let recognizer = new Recognizer();
    images.forEach((image, i) => {
      recognizer.predict(image).then(data => {
        predictions[i] = data;
        this.props.onPredictionsReceived(predictions);
      });
    });
  }
}

export default FileHandler;