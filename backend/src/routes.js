const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate'); // Auth libs

// controllers
const ProfileController = require('./controllers/ProfileController');


const routes = express.Router();

// profiles
routes.get('/profiles', ProfileController.index);
routes.post('/profiles', ProfileController.create);


module.exports = routes;
