//Server

//Setup
var express= require('express');
var app	= express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//Config
mongoose.set('debug', true);

mongoose.connect('mongodb://todo:todo@apollo.modulusmongo.net:27017/Evyna8xa');
//mongoose.connect('mongodb://qwerty:qwerty@ds047075.mongolab.com:47075/todo_test_rjv');
//mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');


var conn = mongoose.connection;             
 
conn.on('error', console.error.bind(console, 'connection error:'));  
 

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());

//Model
var Todo = mongoose.model('Todo',{
	text : String
});

//Routes ---------------------------------------------------------------------
	
	//API - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	
	app.get('/api/todos',function(req, res) {
		//Get all Todos
		Todo.find(function(err, todos) {
			//If error send error
			if (err)
				res.send(err)
			
			res.json(todos); //Return Alltodos in JSON
		});
	});

	//Create Todo and send back all
	app.post('/api/todos',function(req, res) {		
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo){
			if (err)
				res.send(err)
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);				
			});
		});
	});
	
	//Delete a todo
	app.delete('/api/todos/:todo_id',function(req,res){
		Todo.remove({
			_id : req.params.todo_id
		},function(err,todo) {
			if (err)
				res.send(err);
			 Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
		});
	});
	
	
	


app.get('*',function(req,res){
	res.sendfile('./public/index.html');
});

//Listen
app.listen(8080);
console.log("Todo App Started on Port 8080")

