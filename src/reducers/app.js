//import Recognizer from '../libs/tf/recognizer.js'

const initState = {
    page: 'upload',
    lang: 'en',
    uploadCountMax: 50,
    uploadFileMinSize: 224,
    uploadFileMaxSize: 1000,
    uploadFilePreviewSize: 224,
    files: [],
    predictions: []
}

export default (state = initState, action) => {
    if(action['type'] == 'FILES_CHANGED') {
        let newState = Object.assign({}, state);
        newState['files'] = action.payload;
        return newState;
    }
    if(action['type'] == 'PREDICTIONS_CHANGED') {
        let newState = Object.assign({}, state);
        newState['predictions'] = action.payload;
        return newState;
    }
    return state;
}