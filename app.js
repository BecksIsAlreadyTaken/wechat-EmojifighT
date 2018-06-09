"use strict";
var gif = require('./gifmaker');
var util = require('./util');
var reload = require('auto-reload');;
//var http = require('http');
var https = require('https');
var config = require('./data/category');
var templates = require('./data/template');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var iconv = require('iconv-lite');
var app = express();

var options = {
	key: fs.readFileSync('../1529533825744.key'),
	cert: fs.readFileSync('../1529533825744.pem')
};

app.use(express.static('public'));
//app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

app.get('/', function (req, res) {
    res.send('GET success.');
});

app.post('/', function (req, res) {
    res.send('POST success.');
});

app.get('/gif/category', function (req, res) {
    res.json({
	m: 0,
	d: config.CATEGRORY,
	e: ''
    });
});

app.post('/gif/make', function (req, res) {
    var templateId = req.body.templateId;
    var content = req.body.content;
    console.log("content\n"+content);
    var filename = 'cache/' + templateId + '_' + util.sha1(content) + '.gif';
    fs.exists('public/' + filename, function (exists) {
        if (exists) {
            res.json({
            	m: 0,
		d: {
			gifurl: util.SERVER + filename
            	},
		e: ''
		});
        }
        else {
            var templateObj = templates.templates[parseInt(templateId) - 1];
		console.log(templateObj);
            var sentences = content.split('##$@?$?@$##');
            console.log(sentences);
            templateObj.template.forEach(function (item, index) {
                item.options.text = sentences[index];
            });

            gif.makeWithFilters('../data/template/' + templateObj.hash + '.mp4', templateObj.template)
                .size('75%')
                .save('public/' + filename)
                .on('end', function () {
                    res.json({
                    	m: 0,
			d: {
				gifurl: util.SERVER + filename
                    	},
			e: ''	
			});
                });
        }
    });
});
//http.createServer(app).listen(8080);
https.createServer(options,app).listen(443);
