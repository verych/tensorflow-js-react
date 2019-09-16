import React, { Component } from 'react';
import I18nComponent from '../components/i18n-base.jsx';

import {connect} from 'react-redux';

class Header extends I18nComponent {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="header">
        <div className="header-logo"></div>
      </div>
    );
  }
}

export default Header;