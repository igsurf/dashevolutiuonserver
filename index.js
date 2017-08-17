const express = require('express');
var app = express();
var server = require('http').createServer(app);
const socketIO = require('socket.io');
const Dashboard = require('./controllers/dashboard');
const bodyParser = require('body-parser');
require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// INICIA AS ROTAS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));

const io = socketIO(server);
io.of('/dashboard').on('connection', function(socket) {
    const dashboard = new Dashboard(socket)
    dashboard.iniciar();
});
