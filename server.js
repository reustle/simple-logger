'use strict';

var http = require('http');
var async = require('async');
var mongo = require('mongojs');

var db_simple_monitor = mongo.connect('127.0.0.1:27017/simple-monitor');
var db_machines = db_simple_monitor.collection('machines');
var db_machine_stats = db_simple_monitor.collection('machine_stats');

http.createServer(function(req, res){
	
	if(req.url == '/favicon.ico'){
		var empty_gif = new Buffer(35);
		empty_gif.write('R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=', 'base64');
		res.send(empty_gif, { 'Content-Type' : 'image/gif' }, 200);
		res.end('\n');
		
		return;
	}
	
	console.log('[' + (new Date()) + '] ' + req.url);
	
	var friendly_url = req.url.split('/');
	
	res.writeHead(200, {'Content-Type' : 'application/javascript'});
		
	db_machines.find().sort({name:1}, function(err, machines){
		if(err){ throw err }
			
			
	}
	
}).listen(6543, '127.0.0.1');

console.log('[' + (new Date()) + '] Running. Waiting for requests.');

