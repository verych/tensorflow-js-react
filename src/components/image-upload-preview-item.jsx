import React, { Component } from 'react';
import I18nComponent from './i18n-base.jsx';
import {connect} from 'react-redux';
import Recognizer from '../libs/tf/recognizer.js'

class ImageUploadPreviewItem extends I18nComponent {
  constructor() {
    super();
  }

  getLabel() {
      if (this.props.prediction && this.props.prediction.length) {
        return this.props.prediction.map(item => item.className).join(', ');
      }
      return 'thinking...';
  }

  render() {
    let label = this.getLabel();
    return (
        <div className="image-upload-preview-item">
            <div className="image-upload-preview-item-caption">{label}</div>
            <img src={this.props.src} />
        </div>
    );
  }
}

export default connect(s => (s))(ImageUploadPreviewItem);