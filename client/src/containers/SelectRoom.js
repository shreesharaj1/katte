// Game.js
import React, { Component, useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from "react-router";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/uikit.min.css';
import '../css/app.css';
import Jaggery from '../imgs/jaggery.png';
import { createRoom, joinRoom, socketShare } from '../actions/Game';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import socket from './socket';


function SelectRoom(props) {
    const [roomNumber, setRoomNumber] = useState();
    const [roomNumberInput, setRoomNumberInput] = useState(false);
    const [show, setShow] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const roomNumberInputRef = useRef(null);    
    let [soc, setSoc] = useState();

    useEffect(() => {
        if(roomNumberInput){
            roomNumberInputRef.current.focus();
        }
    },[roomNumberInput]);
    
    useEffect(() => {
       setSoc(socket()); 
    },[]);
    
    useEffect(() => {
       if(props.roomNumber && !props.joinedRoom) {
        const roomObj = { creator:{userid: props.userid, name: props.username}, numOfPlayers: props.numOfPlayers, id: props.roomNumber };
        soc.createRoom(roomObj, (e)=>console.log(e));
        soc.registerHandler((e)=>
            console.log('ee',e)
            );
       }
    },[props.roomNumber]);
    

    function handleSubmit(event) {
		console.log('sign-up handleSubmit, username: ');
        event.preventDefault();

    }
    
    function callCreateRoom (number) {
        setShowSpinner(true);
        const roomObj = { creator:{userid: props.userid}, numOfPlayers: number, id: roomNumber };
        props.createRoomAction(roomObj);
        props.socketAction(soc);
        // velocity(modal, {opacity: 1}, {display: 'block'}, 300);
        // velocity(dialog, {translateY: 1, opacity: 1}, {display: 'block'}, 200);
      }
    
    function callJoinRoom () {
        setShowSpinner(true);
        const roomObj = { user:{userid: props.userid, name: props.username}, userid: props.userid, id: roomNumber, roomNumber };

        //setSoc(socket());
        soc.joinRoom(roomObj, (e,users) => {
            console.log('existing users', users);
            props.joinRoomAction(roomObj, users);
        });
        props.socketAction(soc);
        // velocity(modal, {opacity: 1}, {display: 'block'}, 300);
        // velocity(dialog, {translateY: 1, opacity: 1}, {display: 'block'}, 200);
    }


    if(!props.username) {
        return <Redirect to="/login"></Redirect>
    }

    if(props.roomNumber) {
        return <Redirect to="/game"></Redirect>
    }

    return (
    <div>
        <div className="home-background">
            <div className="layer">
                <div className="row justify-content-md-center welcome-bar">
                    <div className="welcome-text col-md-auto">
                        Welcome {props.username}
                    </div>
                    <div className="col-md-auto col-xs-6">
                        { <img src={Jaggery}/> }
                    </div>
                </div>
                <div className="welcome-bar uk-grid uk-container-center uk-vertical-align">
                    <div className="uk-width-1-4 uk-hidden-small"></div>
                    <div className="uk-width-1-4 uk-container-center">
                        <div className="card-btn uk-card uk-card-primary uk-card-body"
                            onClick={()=> {
                                setShow(true);
                            }}>
                            <div className="uk-card-title">
                                Create room
                            </div>
                        </div>  
                    </div>
                    <div className="uk-width-1-4 uk-container-center">
                        <div 
                            className={`card-btn uk-card uk-card-primary uk-card-body 
                                ${roomNumberInput? 'card-btn-active':''}`}
                                    onClick={()=> {
                                        setRoomNumberInput(true);
                                    }}>
                            <div className="uk-card-title">Join room</div>
                        </div>
                            { roomNumberInput && 
                              <div>  
                                <input 
                                    placeholder="Room number" 
                                    className={`uk-input big-input ${roomNumberInput? 'open':''}`} 
                                    type="text" 
                                    value={roomNumber}
                                    onChange={(e)=>setRoomNumber(e.target.value)}
                                    ref={roomNumberInputRef}
                                /> 
                                <input 
                                    placeholder="Room number" 
                                    className={`join-submit uk-button uk-width-1-1 uk-button-primary`} 
                                    type="submit" 
                                    value={'Join'}
                                    onClick={(e)=>callJoinRoom(e)}
                                />
                              </div>  
                            }
                    </div>
                </div>
            </div>
            <Modal
                className="k-modal"
                show={show}
                onHide={()=>setShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create game room
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { !showSpinner ? 
                        <div className="">
                            <div className="row">
                                <div className="col-md-6 col-sm-6">
                                    <div className="card-btn uk-card uk-card-primary uk-card-body"
                                            onClick={()=> {
                                                callCreateRoom(2);
                                            }}>
                                            <div className="uk-card-title">
                                                2 Players
                                            </div>
                                    </div> 
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <div className="card-btn uk-card uk-card-primary uk-card-body"
                                            onClick={()=> {
                                                callCreateRoom(3);
                                            }}>
                                            <div className="uk-card-title">
                                                3 Players
                                            </div>
                                    </div> 
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-sm-6">
                                    <div className="card-btn uk-card uk-card-primary uk-card-body"
                                            onClick={()=> {
                                                callCreateRoom(4);
                                            }}>
                                            <div className="uk-card-title">
                                                4 Players
                                            </div>
                                    </div> 
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <div className="card-btn uk-card uk-card-primary uk-card-body"
                                            onClick={()=> {
                                                callCreateRoom(5);
                                            }}>
                                            <div className="uk-card-title">
                                                5 Players
                                            </div>
                                    </div> 
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border text-warning" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                            <div className="creating-txt">Creating room..</div>
                        </div>
                    }
                </Modal.Body>
            </Modal>
        </div>   
    </div> 
    )
}


function mapStateToProps(state) {
    return state.GameReducer;
}

const mapDispatchToProps = dispatch => ({
    createRoomAction: (roomObj) => { dispatch(createRoom(roomObj)) },
    joinRoomAction: (roomObj, users) => { dispatch(joinRoom(roomObj, users)) },
    socketAction: (soc) => { dispatch(socketShare(soc)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectRoom);    
    