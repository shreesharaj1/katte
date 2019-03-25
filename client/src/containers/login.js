// Game.js
import React, { Component, useState } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import '../css/uikit.min.css';
import Jaggery from '../imgs/jaggery.png';

function Login(props, context) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    
    function handleSubmit(event) {
		console.log('sign-up handleSubmit, username: ');
		console.log(email);
        event.preventDefault();
    

		//request to server to add a new username/password
		axios.post('http://localhost:3006/user/login', {
            email,
            password
		})
			.then(response => {
				console.log(response)
				if (!response.data.error) {
					console.log('successful login');
					setSuccess(true);
				} else {
                    setError(true);
					console.log('something went wrong')
				}
			}).catch(error => {
				console.log('login error: ')
                console.log(error);
                setError(true);

			})
	}
    return (
    <div> { success ? <Redirect to="/game"/> :
        <div className="home-background">
            <div className="layer">
                <div className="uk-grid uk-position-center">
                    <form className="uk-form-stacked" onSubmit={(e) => handleSubmit(e)}>
                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="Email">Email</label>
                            <div className="uk-form-controls">
                                <input className="uk-input uk-form-width-large" id="Email" 
                                    type="text"
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                        </div>
                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="Password">Password</label>
                            <div className="uk-form-controls">
                                <input className="uk-input uk-form-width-large" id="Password" 
                                    type="password" 
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                        </div>
                        <button className="uk-button uk-button-primary uk-width-1-1">Login</button>
                        {error &&
                            <div className="uk-margin uk-form-width-large">
                                <div className="uk-alert-danger uk-alert" uk-alert="true">
                                    <a class="uk-alert-close" uk-close="true"></a>
                                    <p>Wrong email ID or Password.</p>
                                </div>
                            </div>
                                
                        }
                    </form>
                    <div>
                        {/* <img src={Jaggery}/> */}
                    </div>
                </div>
            </div>     
        </div>   
    }
    </div> 
    )
}



export default Login;    
    