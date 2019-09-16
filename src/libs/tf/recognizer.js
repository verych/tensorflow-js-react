import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import {IMAGENET_CLASSES} from './imagenet-classes.js';

export default class Recognizer {
    constructor () {
        this.MOBILENET_MODEL_PATH = './public/imagenet-model.json';
        this.IMAGE_SIZE = 224;
        this.TOPK_PREDICTIONS = 10;
    }

    async predict(imgElement) {
        // Note: you do not need to import @tensorflow/tfjs here.
        // Load the model.
        let model;
        if(window.imagenet) {
            model = window.imagenet;
        }
        else {
            model = await mobilenet.load();
            window.imagenet = model;
        }
        // Classify the image.
        let imgData = imgElement.getContext('2d').getImageData(0,0,imgElement.width, imgElement.height);
        const predictions = await model.classify(imgData);
        console.log(predictions);
        imagenet.model.predict(tf.zeros([1, this.IMAGE_SIZE, this.IMAGE_SIZE, 3])).dispose()
        return predictions;
    }

    async getTopKClasses(logits, topK) {
        const values = await logits.data();
        const valuesAndIndices = [];
        for (let i = 0; i < values.length; i++) {
          valuesAndIndices.push({value: values[i], index: i});
        }
        valuesAndIndices.sort((a, b) => {
          return b.value - a.value;
        });
        const topkValues = new Float32Array(topK);
        const topkIndices = new Int32Array(topK);
        for (let i = 0; i < topK; i++) {
          topkValues[i] = valuesAndIndices[i].value;
          topkIndices[i] = valuesAndIndices[i].index;
        }
      
        const topClassesAndProbs = [];
        for (let i = 0; i < topkIndices.length; i++) {
          topClassesAndProbs.push({
            className: IMAGENET_CLASSES[topkIndices[i]],
            probability: topkValues[i]
          })
        }
        return topClassesAndProbs;
    }
}