const express = require('express')
const router = express.Router()
const user = require('../database/models/user')
var RoomCounter = require('../database/models/roomCounter')
var Room = require('../database/models/gameRoom')
const passport = require('../passport')

router.options('/', (req,res) => {
    //console.log('user signup');
    res.set('Access-Control-Allow-Origin', '*');
    res.json({});
});


router.put('/createRoom', (req, res) => {
    console.log('create room--');
    res.set('Access-Control-Allow-Origin', '*');
    const { userid, numOfPlayers } = req.body;
    // ADD VALIDATION

	RoomCounter.findOneAndUpdate(
		 {counter_id: 1},
		 {$inc: { count: 1.0 }},
         (err, room) => {
        if (err) {
            console.log('Room counter update error: ', err);
            res.json({
                room: `Room counter error: ${err}`
            })
        } else if (room) {
            const newRoom = new Room({
                        created_by:userid,
                        room_id: room.count,
                        num_of_players: numOfPlayers,
                        joinees: [],
                    });
                    newRoom.save((err, savedRoom) => {
                        if (err) return res.json(err);
                        else
                            return res.json({
                                room:savedRoom
                            })
                    });
            
        }
        else {
            res.json({body: "room not incresioned"});
			}

		});
	});

router.post('/joinRoom', (req, res) => {
    console.log('join room--');
    res.set('Access-Control-Allow-Origin', '*');
    const { userid, roomNumber } = req.body;
    // ADD VALIDATION

	Room.findOneAndUpdate(
         
        {room_id: roomNumber},
		{ $push: {joinees: userid }},
        (err, room) => {
        if (err) {
            console.log('Room counter update error: ', err);
            res.json({
                room: `Room counter error: ${err}`
            })
        } else if (room) {
            return res.json({
                room:room
            });
        }
        else {
            res.json({body: "join room not updated"});
			}

		});
	});


module.exports = router