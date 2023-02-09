// require mongoose
const mongoose =require('mongoose');

// connect to database
mongoose.connect('mongodb://0.0.0.0:27017/coderial_development');

// acquire the connection (to check if it is successful)
const db =mongoose.connection;

// on error connecting to db
db.on('error',console.error.bind(console,'error connecting to db'));

// up and running then print the message
db.once('open',()=>{
    console.log('Successfully connected to the database');
});


module.exports = db;