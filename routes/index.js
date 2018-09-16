module.exports = function(app){

    /*********** Home Page *********/
    app.get('/', function(req, res){
        res.render('home.ejs');
    });
    /*******************************/

    /*********** Dashboard *********/
    app.get('/dashboard', function(req, res){
        res.render('dashboard.ejs');
    });
    /*******************************/

    /*********** Resources *********/
    app.get('/resources', function(req, res){
        res.render('resources.ejs');
    });
    /*******************************/

    /*********** Chatbot ***********/
    app.get('/resources', function(req, res){
        res.render('chatbot.ejs');
    });
    /*******************************/

}
