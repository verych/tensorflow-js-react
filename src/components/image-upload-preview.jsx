import React, { Component } from 'react';
import I18nComponent from './i18n-base.jsx';
import {connect} from 'react-redux';
import ImageUploadPreviewItem from './image-upload-preview-item.jsx';

class ImageUploadPreview extends I18nComponent {
  constructor() {
    super();
  }

  render() {
    let items = this.props.app.files;
    let predictions = this.props.app.predictions;

    return (
      <div className='image-upload-preview'>
        {
            items.map((item, i) => 
              <ImageUploadPreviewItem
                key={i}
                src={item.toDataURL()}
                prediction={predictions[i]} 
              />
            )
        }
      </div>
    );
  }
}

export default connect(s => (s))(ImageUploadPreview);