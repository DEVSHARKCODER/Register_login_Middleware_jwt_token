const express = require('express');
const router = express.Router();
require('dotenv').config();
const registerController = require('../Controllers/RegisterController');

const createUsers = process.env.API_CREATE;


router.get('/register', registerController.PageRegis);


router.post(createUsers, registerController.createUser);

module.exports = router;
