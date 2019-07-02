import express from 'express';
import router from './router';
import mongoose from 'mongoose';
const server = require('http').Server(app);
const io = require('socket.io')(server);

const app = express();
const port = 3300;

app.use('/', router);

app.get('/ping', (req, res) => res.send('Pong'));

app.listen(4400, () => console.log('App listening to port 4400'));

server.listen(port, () => console.log(`Listening to port ${port}`));

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
