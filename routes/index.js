module.exports = function(app){

    /*********** Home Page *********/
    app.get('/', function(req, res){
        res.send('Home page');
    });
    /*******************************/

    /*********** Dashboard *********/
    app.get('/dashboard', function(req, res){
        res.send('Dashboard Page');
    });
    /*******************************/

    /*********** Resources *********/
    app.get('/resources', function(req, res){
        res.send('Resources Page');
    });
    /*******************************/

    /*********** Chatbot ***********/
    app.get('/resources', function(req, res){
        res.send('Chatbot Page');
    });
    /*******************************/

}
