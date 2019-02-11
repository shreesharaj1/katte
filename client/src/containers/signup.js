// Game.js
import React, { Component } from 'react';
import Input from '../components/inputWithLabel';
import '../css/uikit.min.css';

function Signup() {

    return (
    <div className="uk-container home-background">
        <div className="uk-grid uk-position-center">
            <form className="uk-form-stacked">
                <Input label="Username" />
                <Input label="Email" />
                <Input label="Password" type="password" />
                <button class="uk-button uk-button-primary uk-width-1-1">Submit</button>
            </form>
        </div>    
    </div>    
    )
}

export default Signup;    
    