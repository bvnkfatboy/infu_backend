const express = require('express');
const cors = require('cors');
const socketio = require('socket.io');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config();

const app = express();
const server = require('http').Server(app);
const io = socketio(server);

app.use(cors());

// ตั้งค่า route
app.get('/', (req, res) => {
  res.send('Hello World!');
});


const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});