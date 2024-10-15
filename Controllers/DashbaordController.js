
const path = require('path');


exports.PageDashobard = (req, res)=>{
        res.sendFile(path.join(__dirname, '../', './assets', 'html', 'dashboard.html'));

}

