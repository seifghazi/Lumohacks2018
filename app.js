const express  		          = require('express');
const app      		        	= express();
const port    	       	    = process.env.PORT || 8080;
const morgan            		= require('morgan');
const bodyParser       	   	= require('body-parser');
const firebase              = require('firebase');
const path                  = require('path');
const routes      = require('./routes/index.js')(app);


// required for body-parser
app.use(bodyParser.urlencoded({extended: true}));

// use embedded javascript for views
app.set('view engine', 'ejs');

// use public directory for statics
app.use(express.static(path.join(__dirname,"public")));

app.use(express.static(__dirname));



// Initialize Firebase
var config = {
  apiKey: "AIzaSyDq4Wg1cl3wtbOqG3_2wgERQnPe4_eKrxc",
  authDomain: "lumohacks-929fb.firebaseapp.com",
  databaseURL: "https://lumohacks-929fb.firebaseio.com",
  projectId: "lumohacks-929fb",
  storageBucket: "lumohacks-929fb.appspot.com",
  messagingSenderId: "502937368320"
};
firebase.initializeApp(config);



// Run server
app.listen(port);
console.log('The magic happens on port ' + port);
