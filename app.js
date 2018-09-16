const express  		    = require('express');
const app      		        	= express();
const port    	       	    = process.env.PORT || 8080;
const morgan            		= require('morgan');
const bodyParser       		= require('body-parser');


app.get('/', function(req, res) {
  res.send('Home page');
});



/*RunServer*/
app.listen(port);
console.log('The magic happens on port ' + port);
