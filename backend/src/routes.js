const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate'); // Auth libs

// controllers
const ProfileController = require('./controllers/ProfileController');


const routes = express.Router();

// profiles
routes.get('/profiles', ProfileController.index);
routes.get('/profiles/search', ProfileController.listByParam);
routes.post('/profiles', ProfileController.create);
routes.put('/profiles/:id', ProfileController.update);

module.exports = routes;
