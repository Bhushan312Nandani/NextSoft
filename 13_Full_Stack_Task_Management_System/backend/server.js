const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/taskmanager_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Note: For brevity in this final project, routes are defined directly in server.js
const Task = require('./models/Task');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'No token' });
  try {
    token = token.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token invalid' });
  }
};

app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = new User({ username, password });
    await user.save();
    res.json({ msg: 'User registered' });
  } catch (err) { res.status(500).send('Error'); }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, username });
  } catch (err) { res.status(500).send('Error'); }
});

app.get('/api/tasks', protect, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

app.post('/api/tasks', protect, async (req, res) => {
  const task = new Task({ ...req.body, user: req.user.id });
  await task.save();
  res.json(task);
});

app.put('/api/tasks/:id', protect, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

app.delete('/api/tasks/:id', protect, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
