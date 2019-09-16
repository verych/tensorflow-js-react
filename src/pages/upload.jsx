import React, { Component } from 'react';
import ImageUploadPreview from '../components/image-upload-preview.jsx';
import ImageDNDZone from '../components/image-dnd-zone.jsx';
import I18nComponent from '../components/i18n-base.jsx';
import Header from '../components/header.jsx';

import {connect} from 'react-redux';

class PageUpload extends I18nComponent {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="page-upload">
        <ImageDNDZone>
          {this.i18n('Upload image')}
          <Header></Header>
        </ImageDNDZone>
        <ImageUploadPreview />
      </div>
    );
  }
}

export default connect(s => (s))(PageUpload);