const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port=8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport =require('passport');
const passportLocal =require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sass = require('node-sass-middleware');





app.use(sass({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:'true',
    outputStyle:'extended',
    prefix:'/css'
}))
app.use(express.static('./assets'));
app.use(expressLayout);
app.use(express.urlencoded());
app.use(cookieParser());

// extract style and script from sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);





// setup the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name: 'coderial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore({
        mongoUrl:'mongodb://0.0.0.0:27017/coderial_development',
        // mongooseConnection:db,
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
// use express router
app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});
