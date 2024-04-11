const express = require('express');
const cors = require('cors');
const socketio = require('socket.io');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Controllers
const authController = require('./controllers/auth/authController');

mongoose.connect('mongodb+srv://admin:1234@infudb.njec3fj.mongodb.net/?retryWrites=true&w=majority&appName=InfuDB',{
  useNewUrlParser: true
})

dotenv.config();

const app = express();
const server = require('http').Server(app);
const io = socketio(server);

app.use(cors());
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())

// ตั้งค่า route
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.post('/register', authController.registerUser);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});