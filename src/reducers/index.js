import {combineReducers} from 'redux';
import AppReducer from './app.js';

export default combineReducers({
        app: AppReducer
    });