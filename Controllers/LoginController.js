const pool = require('../app');
const bcrypt = require('bcrypt');
const path = require('path');
const jwt = require('jsonwebtoken')

require('dotenv').config();

exports.PageLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '../', './assets', 'html', 'login.html'));
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    try {
        const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

        if (users.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        const tokenPayload = { id: user.id, username: user.username, role: user.role }; 
        const jwttoken = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.cookie('authToken', jwttoken, { httpOnly: true, secure: true, maxAge: 3600000 }); 

        res.json({ success: true, message: 'Login successful', token: jwttoken });
        
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
