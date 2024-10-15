const path = require('path');


exports.PageIndex = (req, res)=>{
        res.sendFile(path.join(__dirname, '../', './assets', 'html', 'index.html'));

}