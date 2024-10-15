const express = require('express');
const router = express.Router();
const DashboardController = require('../Controllers/DashbaordController')
const authenticateToken = require('../Controllers/authMiddleware');
require('dotenv').config();


router.get('/api/dashboard' ,authenticateToken, DashboardController.PageDashobard)




module.exports = router;