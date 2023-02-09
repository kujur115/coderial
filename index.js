const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port=8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const { urlencoded } = require('express');

app.use(express.static('./assets'));
app.use(expressLayout);
app.use(urlencoded());

// extract style and script from sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use express router
app.use('/',require('./routes'));
app.use(cookieParser());


// setup the view engine
app.set('view engine','ejs');
app.set('views','./views');




app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});
