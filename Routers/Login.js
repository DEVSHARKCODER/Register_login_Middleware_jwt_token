const express = require('express');
const router = express.Router();
const LoginController = require('../Controllers/LoginController')
const LogoutController = require('../Controllers/LogoutController')
const path = require('path');
require('dotenv').config();

router.get('/login' , LoginController.PageLogin)

// Login
const api_login = process.env.API_LOGIN
router.post(api_login , LoginController.login , LogoutController.Logout)

// Logout
const api_logout = process.env.API_LOGOUT
router.post(api_logout , LogoutController.Logout)
module.exports = router;