const pool = require('../app');


exports.getUsers = async (req, res) => {
    try {
        const [users] = await pool.query('SELECT * FROM users'); 
        res.status(200).json(users); 
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'มีบางอย่างผิดพลาดในการดึงข้อมูลผู้ใช้' });
    }
};


exports.getUserByUsername = async (req, res) => {
    const { username } = req.params; 
    
    try {
        const [users] = await pool.query('SELECT * FROM users WHERE username LIKE ?', [`%${username}%`]); 
        if (users.length > 0) {
            res.status(200).json(users); 
        } else {
            res.status(404).json({ message: 'ไม่พบผู้ใช้ที่มี username นี้' }); // ถ้าไม่พบผู้ใช้
        }
    } catch (error) {
        console.error('Error fetching user by username:', error);
        res.status(500).json({ message: 'มีบางอย่างผิดพลาดในการดึงข้อมูลผู้ใช้' });
    }
};
