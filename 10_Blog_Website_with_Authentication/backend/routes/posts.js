const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../models/Post');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const newPost = new Post({ ...req.body, author: req.user.id });
    const post = await newPost.save();
    await post.populate('author', 'username');
    res.json(post);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    if (post.author.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });
    post = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).populate('author', 'username');
    res.json(post);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    if (post.author.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });
    await Post.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Post removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
