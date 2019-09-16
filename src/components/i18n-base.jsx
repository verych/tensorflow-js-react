import React, { Component } from 'react';
import en from '../resources/lang/en.js';
import ru from '../resources/lang/ru.js';

class I18nComponent extends Component {
  constructor() {
    super();
    this.state = {};
    this.initLangs();
  }

  initLangs() {
    this.state.data = {
        'en': en,
        'ru': ru
    }
  }

  i18n(text) {
    let section = this.constructor.name.toLowerCase();
    return this.getTranslated(section, text);
  }

  getTranslated(section, text) {
    let app = this.props.app;
    let data = this.state.data;

    if(!data[app.lang][section]) {
      data[app.lang][section] = {};
    }
    if(!data[app.lang][section][text]) {
      data[app.lang][section][text] = text;
    }
    return data[app.lang][section][text];
  }
}

export default I18nComponent;