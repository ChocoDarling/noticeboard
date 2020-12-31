import express from 'express';
import User from '../models/user';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ where: { username: username } });
    if (user) {
      console.log(user);
      res.status(200).send('exist username');
    } else {
      user = await User.create({
        username,
        password,
      });
      res.status(200).send(user.deletePassword());
    }
  } catch (err) {
    res.status(204).send(err);
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
    else res.status(200).send(user.deletePassword());
  } catch (err) {
    console.log(err);
    res.status(501).send(err);
  }
});

export default router;
