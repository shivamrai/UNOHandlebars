var controller = require('../controller/controllers.js');
const router = require('express').Router();
var authentication = require('../server/middlewares/authentication.middleware')

module.exports = function(app){
	app.use('', router);

	// Public Routes

	/**
	 * Route for index
	 */
	router.get('/', function(req, res, next) {
		console.log(req.session);
		if(req.session && req.session.username){
			return res.redirect('/lobby');
		}
		res.render('index', { title: 'UNO' , action: 'Login'});
	});

	/**
	 * Route for login
	 */
	router.post('/login', function(request, response){
		controller.login(request, response);
	})

	//Handles Registration
	router.get('/register', function(req, res, next) {
		res.render('register', { title: 'UNO' , action: 'Register'});
	});
	
	/**
	 * Middleware for authentication
	 * All the APIs below the middleware are protected routes
	 * Will be accessible only if session exist
	 */
	authentication(router);
	
	router.post('/add', function(request, response){
		controller.add(request, response);
	})

	/**
	 * Route for lobby
	 */
	router.get('/lobby', function(req, res, next) {

		controller.getRooms(req, res);
  		// res.render('lobby', { title: 'UNO' , action: 'Logged In', action2: 'Make room'});
	});

	/**
	 * Route for create game
	 */
	router.post('/creategame', function(request, response){
		controller.creategame(request, response);
	})

	/**
	 * Route for roomname
	 */
	router.get('/game/:room_name', function(request, response){

		var room_name = request.params.room_name;
	
		controller.renderGame(room_name, request, response);

	});

	/**
	 * Added listeners
	 */
	router.get('/listeners', function(req, res, next) {
  		res.render(__dirname+ "/listeners.js")
	});

	router.get('/start', function(req, res, next) {
		res.send("Started");
	});

	/**
	 * Route for join game
	 */
	router.post('/joingame', function(request,response){
	controller.joinGame(request,response);
	});

	/**
	 * Route for join game
	 */
	router.get('/logout', function(request,response){
		controller.logout(request,response);
	});
}

