// inputWithLabel.js
import React, { Component } from 'react';
import Card from '../components/card';
import Player from '../components/player';
import '../css/app.css';

class InputWithLabel extends Component {
  constructor(props) {
    super(props);
  }

  render (props) {
      return (
        <div classNamae="uk-margin">
            <label className="uk-form-label" for={this.props.label}>{this.props.label}</label>
            <div className="uk-form-controls">
                <input className="uk-input" id={this.props.label} 
                    type={this.props.type ? this.props.type : "text"} 
                    placeholder={this.props.label}/>
            </div>
        </div>
      )
  }
}


export default InputWithLabel;