// const mongoose = require('mongoose');

// // mongoose.connect('mongodb://localhost/issue_tracker_db');
// mongoose.connect = 'mongodb+srv://gknanhe:9370500694@cluster0.ji2adql.mongodb.net/issue_tracker?retryWrites=true&w=majority';

// const db = mongoose.connection;

// db.on('error', console.error.bind('error in connecting to DataBase'));

// db.once('open', function(){
//     console.log('Connected to database: MongoBD');

// })

// module.exports = db;


const mongoose = require('mongoose');
// mongoose.connect('mongodb://0.0.0.0/employeReviewSystem');
const DB = 'mongodb+srv://gknanhe:9370500694@cluster0.ji2adql.mongodb.net/issue_tracker?retryWrites=true&w=majority';

// These set of line can be written in async await fashion, but I have followed the documentation. 
mongoose.connect(DB).then(()=>{
     console.log('connection successful');
 }).catch((err) => console.log("no connection " + err));

const db = mongoose.connection;

// db.on('error', console.error.
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open',  function(){
     console.log('Connected to Database :: MongoDB');
});