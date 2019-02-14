// Game.js
import React, { Component, useState } from 'react';
import axios from 'axios';
import '../css/uikit.min.css';
import Jaggery from '../imgs/jaggery.png';

function Signup() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    function handleSubmit(event) {
		console.log('sign-up handleSubmit, username: ');
		console.log(username);
        event.preventDefault();
    

		//request to server to add a new username/password
		axios.post('http://localhost:3001/user/', {
			username: username,
			password: password
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('successful signup')
					this.setState({ //redirect to login page
						redirectTo: '/login'
					})
				} else {
					console.log('username already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}
    return (
    <div className="home-background">
        <div className="layer">
            <div className="uk-grid uk-position-center">
                <form className="uk-form-stacked" onSubmit={(e) => handleSubmit(e)}>
                    <div className="uk-margin">
                        <label className="uk-form-label" htmlFor="Username">Username</label>
                        <div className="uk-form-controls">
                            <input className="uk-input uk-form-width-large" id="Username" 
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                    </div>
                    <div className="uk-margin">
                        <label className="uk-form-label" htmlFor="Email">Email</label>
                        <div className="uk-form-controls">
                            <input className="uk-input uk-form-width-large" id="Email" 
                                type="text"
                                placeholder="Email"
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <button className="uk-button uk-button-primary uk-width-1-1">Signup</button>
                </form>
                <div>
                    {/* <img src={Jaggery}/> */}
                </div>
            </div>
        </div>     
    </div>    
    )
}

export default Signup;    
    