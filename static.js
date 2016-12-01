#!/usr/bin/env node

/**
 * Простейший сервер для выдачи статических файлов.
 * По умолчанию отдает данные на порт 3000 из папки public.
 *
 * Варианты запуска:
 * ~$ node static
 * ~$ node static 8080
 * ~$ node static 8080 any/folder
 * ~$ node static . any/folder
 */

const PORT = Number(process.argv[2]) || 3000;
const PUBLIC = process.argv[3] || 'public';

var http = require('http');
var express = require('express');
var path = require('path');
var app = express();
var staticPath = path.join(__dirname, PUBLIC);

configureApp();
runServer();

function configureApp () {
	app.use(express.static(staticPath));

	app.use(function(req, res) {
		res.status(404);
		res.send('Не найдено');
	});

	app.set('port', PORT);
}

function runServer () {
	var server = http.createServer(app);

	server.listen(PORT);
	server.on('error', onError);
	server.on('listening', () =>
		console.log(`Запущено на порту ${PORT}, раздается папка ${staticPath}`)
	);
}

function onError (error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	switch (error.code) {
		case 'EACCES':
			console.error(`Порт ${PORT} требует повышенных привилегий`);
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(`Порт ${PORT} уже используется`);
			process.exit(1);
			break;
		default:
			throw error;
	}
}