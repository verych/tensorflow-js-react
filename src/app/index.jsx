import "@babel/polyfill";
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import PageUpload from "../pages/upload.jsx";
import I18nComponent from "../components/i18n-base.jsx";
import {Provider} from 'react-redux';
import {createStore} from "redux";
import AllReducers from "../reducers";

const store = createStore(AllReducers);

class App extends I18nComponent {

  constructor() {
    super();
  }
 
  render() {
    return (
      <div className="app">
        <Provider store={store}>
            <PageUpload  />
        </Provider>
      </div>
    );
  }
}

(() => {
    function bootstrap() {
        if (document.body) {
            let root = (document.body.children.length? document.body.children[0]: document.body);
            ReactDOM.unmountComponentAtNode(root);
            ReactDOM.render(<App/>, root);
        }
        else {
            setTimeout(() => {
                bootstrap();
            }, 50);
        }
    }
    bootstrap();
})();
