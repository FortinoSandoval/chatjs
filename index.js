const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

const mongoose = require('mongoose');

//db connection
mongoose.connect('mongodb://forti:win7@ds039674.mlab.com:39674/heroku_1x9bhwp0')
.then(db => console.log('db is connected'))
.catch(err=>console.log(err));

//settings
app.set('port', process.env.PORT || 3000);

require('./sockets')(io);

//static files
app.use(express.static(path.join(__dirname,'public')));

//starting the server
server.listen(app.get('port'), ()=>{
	console.log('server on port', app.get('port'));
});