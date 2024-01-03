import express from 'express';
import { createNewUser, loginExistingUser } from '../controllers/auth.js';


const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const token = await loginExistingUser(req.body);
    res.status(200).json({
      token
    });
  } catch (err) {
    res.status(400).json({
      message: 'unable to login with given username and password',
      error: `${err}`
    });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const newUser = await createNewUser(req.body);
    res.status(200).json({
      message: `new user created`,
      user: newUser
    });
  } catch (err) {
    res.status(400).json({
      message: 'unable to create new user',
      error: `${err}`
    });
  }
});

export default router;
