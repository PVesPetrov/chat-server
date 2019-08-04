import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from '../config';
import router from './router';

const server = require('http').Server(app);
const io = require('socket.io')(server);

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/', router);

app.listen(config.ports.api, () =>
  console.log(`API listening to port ${config.ports.api}`)
);

server.listen(config.ports.socket, () =>
  console.log(`Socket listening to port ${config.ports.socket}`)
);

io.on('connection', function(socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('message', function(data) {
    console.log(data);
  });
});

mongoose
  .connect('mongodb://localhost:27017/chat', { useNewUrlParser: true })
  .then(
    () => console.log('Mongoose connected'),
    err => console.error('Mongoose failed to connect\n', error)
  );
