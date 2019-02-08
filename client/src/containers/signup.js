// Game.js
import React, { Component } from 'react';
import Input from '../components/inputWithLabel';
import '../css/uikit.min.css';

class Signup extends Component {
  constructor(props) {
    super(props);
  }

  render () {
      return (
        <div className="uk-container">
            <div className="uk-grid uk-position-center">
                <form className="uk-form-stacked">
                    <Input label="Username" />
                    <Input label="Email" />
                    <Input label="Password" type="password" />
                </form>
            </div>    
        </div>    
      )
  }
}

export default Signup;    
    