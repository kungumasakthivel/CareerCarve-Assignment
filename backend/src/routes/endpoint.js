const express = require('express');
const db = require('../models/db');
const dotenv = require('dotenv');

dotenv.config();
const routes = express.Router();

routes.get('/', (req, res) => {
    return res.send("working...");
})

routes.get('/mentors', (req, res) => {
    db.all(`SELECT * FROM mentors`, (err, rows) => {
        if(err) {
            return res.status(400).json({
                message: 'Error'
            });
        }
        res.json(rows);
    })
})

routes.post('/bookings', (req, res) => {
    const {mentor_name, student_name, time} = req.body;

    db.run(
        `INSERT INTO bookings (mentor_name, student_name, time) VALUES (?, ?, ?)`,
        [mentor_name, student_name, time],
        function(err) {
            if(err) {
                return res.status(400).json({
                    message: 'Error in booking'
                })
            }
            res.status(200).json({
                id: this.lastID,
                message: 'Success'
            })
        }
    )
})

routes.get('/bookings', (req, res) => {
    db.all(`SELECT * FROM bookings`, (err, rows) => {
        if(err) {
            return res.status(400).json({
                message: 'Error in getting bookings'
            })
        }
        res.json(rows);
    })
})

module.exports = routes;
