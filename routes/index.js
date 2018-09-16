var firebase = require('firebase');
var path = require('path');
var bodyParser = require('body-parser');
var botService = require('./../services/botService.js');
var AssistantV1                     = require('watson-developer-cloud/assistant/v1');
var NaturalLanguageUnderstandingV1  = require('watson-developer-cloud/natural-language-understanding/v1');
var regression                      = require('regression');
require('dotenv').config();

// IBM Watson Conversation Assistant API, used to generate text output in response to user input
var watsonAssistant = new AssistantV1({
  version: '2018-07-10',
  username: process.env.WATSON_BOT_USERNAME,
  password: process.env.WATSON_BOT_PASSWORD,
  url: process.env.WATSON_BOT_URL
});

// IBM Watson NLU API, used to calculate sentiment from Assistant output
var naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2018-03-19',
  username: process.env.WATSON_SENTIMENT_USERNAME,
  password: process.env.WATSON_SENTIMENT_PASSWORD,
  url: process.env.WATSON_SENTIMENT_URL
});


module.exports = function(app){

  // required by body-parser
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json())



  /*********** Home Page *********/
  app.get('/', function(req, res){
    res.render('home.ejs');
  });
  /*******************************/



  /*********** Login Page *********/
  app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/login.html'));
  });

  app.post('/login', function(req, res){
    const email    = req.body.email;
    const pass     = req.body.pass;
    //Sign In
    const promise = firebase.auth().signInWithEmailAndPassword(email,pass);
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        res.redirect('/dashboard');
      } else {
        res.redirect('/');
      }
    })
  });
  /*******************************/



  /*********** Dashboard *********/
  app.get('/dashboard', function(req, res){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        res.render("dashboard.ejs");
      } else {
        res.redirect('/login');
      }
    });
  });
  /*******************************/



  /*********** Resources *********/
  app.get('/resources', function(req, res){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        res.render('resources.ejs');
      } else {
        res.redirect('/login');
      }
    });
  });
  /*******************************/



  /******** Chatbot GET **********/
  app.get('/chatbot', function(req, res){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        res.render("chatbot.ejs");
      } else {
        res.redirect('/login');
      }
    });
  });
  /*******************************/



  /******** Chatbot POST *********/
  app.post('/chatbot', function(req, res){
    var input = req.body.input;
    console.log(req.body);

    watsonAssistant.message({
      workspace_id: '2eca6c93-2b1e-45a0-b17e-2c759ee816a2',
      input: {'text': input.text}
    }, function(err, res) {
      if (err)
      console.error('error:', err);
      else
      console.log(res.output.text);

      var parameters = {
        'text': input.text,
        'features': {
          'sentiment': {}
        }
      };

      naturalLanguageUnderstanding.analyze(parameters, function(res, err) {
        if (err) {
          console.log('error:', err);
        } else {
          points = input.previousPoints;
          points.push([input.messageIndex, Number(res.sentiment.document.score)])
          gradient = regression.linear(points).equation[0];

          var output = {
            textOutput: parameters.text,
            message_index: input.messageIndex,
            points: points,
            bestFitGradient: gradient
          };
          console.log(output);

          res.json(output);
        }
      });
    });
  });
  /*******************************/


}
