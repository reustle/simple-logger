'use strict';

var http = require('http');
var url = require('url');
var async = require('async');
var mongo = require('mongojs');

var simple_logger_conn = mongo.connect('127.0.0.1:27017/simple-logger');
var messages_db = simple_logger_conn.collection('messages');

http.createServer(function(req, res){
	/*
		Message Examples
		
		?msg_type=js_error&err_file=app.js&err_line=123&err_msg=report+undefined
		?msg_type=js_msg&msg=hello+world
	*/
	
	console.log('[' + (new Date()) + '] ' + req.url);
	
	// Gather helpful information
	var parsed_qs = url.parse(req.url, true).query;
	var user_agent = req.headers['user-agent'];
	
	// If this is a legitimate request
	if(parsed_qs.msg_type){
		
		// TODO Use this to strip bad parsed_qs keys
		var clean_qs_keys = ['err_msg', 'err_file', 'err_line', 'msg', 'msg_type'];
		
		// Fix known field types
		if(parsed_qs.err_line){
			parsed_qs.err_line = parseInt(parsed_qs.err_line, 10);
		}
		
		// Create the document to insert
		var insert_doc = parsed_qs;
		insert_doc.time = parsed_qs.time || new Date();
		insert_doc.user_agent = user_agent;
		
		// Insert the document
		messages_db.insert(insert_doc);
		
	}
	
	// Return an empty gif
	var empty_gif = new Buffer(35);
	empty_gif.write('R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=', 'base64');
	res.writeHead(200, {'Content-Type' : 'image/gif'});
	res.end(empty_gif);
	
}).listen(6543, '127.0.0.1');

console.log('[' + (new Date()) + '] Running. Waiting for requests.');

