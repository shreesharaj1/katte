// inputWithLabel.js
import React, { Component, useState } from 'react';
import '../css/app.css';

function InputWithLabel(props) {
    console.log('sasddddddddddddddddd',useState);
    return (
      <div className="uk-margin">
          <label className="uk-form-label" htmlFor={props.label}>{props.label}</label>
          <div className="uk-form-controls">
              <input className="uk-input uk-form-width-large" id={props.label} 
                  type={props.type ? props.type : "text"} 
                  placeholder={props.label}/>
          </div>
      </div>
    )
}

export default InputWithLabel;