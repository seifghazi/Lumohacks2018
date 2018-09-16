var firebase = require('firebase');
var path = require('path');
var bodyParser = require('body-parser');


module.exports = function(app){

  // required by body-parser
  app.use(bodyParser.urlencoded({extended: true}));

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
        res.redirect('/dashboard')
      } else {
        res.redirect('/')
      }
    })
    });
    /*******************************/


    /*********** Dashboard *********/
    app.get('/dashboard', function(req, res){
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          res.render("dashboard.ejs")
        } else {
          res.redirect('/login')
        }
      });
    });
    /*******************************/

    /*********** Resources *********/
    app.get('/resources', function(req, res){
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          res.render('resources.ejs')
        } else {
          res.redirect('/login')
        }
      });
    });
    /*******************************/

    /*********** Chatbot ***********/
    app.get('/resources', function(req, res){
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          res.render("chatbot.ejs")
        } else {
          res.redirect('/login')
        }
      });
    });
    /*******************************/

}
