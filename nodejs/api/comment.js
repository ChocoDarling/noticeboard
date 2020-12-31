import express from 'express';
import Comment from '../models/comment';

const router = express.Router();

router.get('/list', async (req, res) => {
  const commentList = await Comment.findAll();
  res.send(commentList);
});

router.get('/:id', async (req, res) => {
  console.log(req.params);
  const comment = await Comment.findOne({ where: { id: req.params.id } });
  res.send(comment);
});

router.post('/add', async (req, res) => {
  const { title, comment, username } = req.body;
  try {
    const newComment = await Comment.create({
      title,
      comment,
      username,
    });
    res.status(200).send(newComment);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ where: { username: username } });
    if (!user) res.status(200).send('not found');
    else if (user.password !== password)
      res.status(200).send('not match password');
    else res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(501).send(err);
  }
});

export default router;
