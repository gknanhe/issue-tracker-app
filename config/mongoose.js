const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/issue_tracker_db');

const db = mongoose.connection;

db.on('error', console.error.bind('eeror in connecting to DataBase'));

db.once('open', function(){
    console.log('Connected to database: MongoBD');

})

module.exports = db;