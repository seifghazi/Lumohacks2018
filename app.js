const express  	  = require('express');
const app       	= express();
const port        = process.env.PORT || 8080;
const morgan    	= require('morgan');
const bodyParser	= require('body-parser');

const routes      = require('./routes/index.js')(app);

/*RunServer*/
app.listen(port);
console.log('The magic happens on port ' + port);
