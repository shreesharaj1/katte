// Game.js
import React, { Component, useState } from 'react';
import Input from '../components/inputWithLabel';
import '../css/uikit.min.css';
import Jaggery from '../imgs/jaggery.png';

function Signup() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    console.log(useState);
    return (
    <div className="home-background">
        <div className="layer">
            <div className="uk-grid uk-position-center">
                <form className="uk-form-stacked">
                    <div className="uk-margin">
                        <label className="uk-form-label" htmlFor="Username">Username</label>
                        <div className="uk-form-controls">
                            <input className="uk-input uk-form-width-large" id="Username" 
                                type="text"
                                placeholder="Username"/>
                        </div>
                    </div>
                    <div className="uk-margin">
                        <label className="uk-form-label" htmlFor="Email">Email</label>
                        <div className="uk-form-controls">
                            <input className="uk-input uk-form-width-large" id="Email" 
                                type="text"
                                placeholder="Email"/>
                        </div>
                    </div>
                    <div className="uk-margin">
                        <label className="uk-form-label" htmlFor="Password">Password</label>
                        <div className="uk-form-controls">
                            <input className="uk-input uk-form-width-large" id="Password" 
                                type="password" 
                                placeholder="Password"/>
                        </div>
                    </div>
                    <button class="uk-button uk-button-primary uk-width-1-1">Signup</button>
                </form>
                <div>
                    <img src={Jaggery}/>
                </div>
            </div>
        </div>     
    </div>    
    )
}

export default Signup;    
    