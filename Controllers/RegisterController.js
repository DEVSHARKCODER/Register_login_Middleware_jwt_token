const pool = require('../app');
const bcrypt = require('bcrypt');
const path = require('path');


exports.PageRegis = (req, res) => {
    res.sendFile(path.join(__dirname, '../', './assets', 'html', 'register.html'));
};


exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'Username, email, and password are required' });
    }

    try {
        const [existingUser] = await pool.execute(`SELECT * FROM users WHERE username = ? OR email = ?`, [username, email]);
        if (existingUser.length > 0) {
            return res.status(409).json({ success: false, message: 'Username or email already exists' });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.execute(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`, [username, email, hashPassword]);

        console.log('User created:', { userId: result.insertId, username, email });

        res.status(201).json({ success: true, message: 'User created', userId: result.insertId });
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ success: false, message: 'Database error' });
    }
};
