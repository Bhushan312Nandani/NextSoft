const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const Message = require('./models/Message');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/chat_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// API Route for chat history
app.get('/api/messages/:room', async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.room }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Socket.io Logic
let onlineUsers = 0;

io.on('connection', (socket) => {
  onlineUsers++;
  io.emit('onlineUsers', onlineUsers);

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('sendMessage', async (data) => {
    try {
      const newMessage = new Message({
        user: data.user,
        text: data.text,
        room: data.room
      });
      await newMessage.save();
      io.to(data.room).emit('message', newMessage);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on('disconnect', () => {
    onlineUsers--;
    io.emit('onlineUsers', onlineUsers);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
