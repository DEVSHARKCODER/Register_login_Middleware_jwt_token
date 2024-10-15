const express = require('express');
const router = express.Router();
const IndexController = require('../Controllers/IndexController')
const GetuersController = require('../Controllers/GetusersController')
const authenticateToken = require('../Controllers/authMiddleware');
require('dotenv').config();


router.get('/' ,authenticateToken, IndexController.PageIndex);
router.get('/get-users' , authenticateToken , GetuersController.getUsers )
router.get('/get-users/:username' , authenticateToken , GetuersController.getUserByUsername )


module.exports = router;