const express = require('express');
const router = express.Router();


exports.Logout = (req,res)=>{
    res.clearCookie('authToken'); 
    res.json({ success: true, message: 'Logged out successfully' });
}
