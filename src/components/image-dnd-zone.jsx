import React, { Component } from 'react';
import I18nComponent from './i18n-base.jsx';
import {connect} from 'react-redux';
import FileAPI from 'fileapi';
import Dropzone from 'react-dropzone';
import FileHandler from './file-handler.jsx';

class ImageDNDZone extends FileHandler {
  constructor() {
    super();
  }

  onDrop(files) {
    FileAPI.filterFiles(files, 
        this.filterFiles.bind(this),
        this.handleFiles.bind(this)        
    );
    this.updateDragState(false);
  }

  onDragEnter(cb) {
    this.updateDragState(true);
  }

  onDragLeave(cb) {
    this.updateDragState(false);
  }

  updateDragState(newState) {
    if(this.state.over != newState) {
      this.setState({over: newState});
    }
  }

  render() {
    let dndZoneClass = 'image-dnd-zone';
    if(this.state.over) {
        dndZoneClass += ' image-dnd-zone-highlight';
    }
    return (
        <div className="image-dnd">
          <Dropzone 
            onDrop={acceptedFiles => {this.onDrop(acceptedFiles)}}
            onDragEnter={cb => {this.onDragEnter(cb)}}
            onDragLeave={cb => {this.onDragLeave(cb)}}
          >
          {({getRootProps, getInputProps}) => (
            <section className={dndZoneClass}>
              <div className="image-dnd-input-wrapper" {...getRootProps()}>
                <input {...getInputProps()} />
                {this.props.children}
              </div>
            </section>
          )}
        </Dropzone>
        </div>
    );
  }
}

export default connect(s => (s),
    dispatch => ({ 
        onFilesChanged: data => {
          dispatch({type: 'FILES_CHANGED', 'payload': data});
        },
        onPredictionsReceived: data => {
          dispatch({type: 'PREDICTIONS_CHANGED', 'payload': data});
        }, 
    }))(ImageDNDZone);