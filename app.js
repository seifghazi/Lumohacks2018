const express  	  = require('express');
const app       	= express();
const port        = process.env.PORT || 8080;
const morgan    	= require('morgan');
const bodyParser	= require('body-parser');

const routes      = require('./routes/index.js')(app);

// use embedded javascript for views
app.set('view engine', 'ejs');

// use public directory for statics
app.use(express.static('public'));

// Run server
app.listen(port);
console.log('The magic happens on port ' + port);
