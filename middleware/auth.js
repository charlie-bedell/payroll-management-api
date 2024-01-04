import 'dotenv/config';
import express from 'express';
import jwt from 'jsonwebtoken';

function isLoggedIn(req, res, next) {
  try {
    if (req.headers.authorization) {
      // seperate "bearer " from the token
      const token = req.headers.authorization.split(' ')[1];
      if (token) {
        const payload = jwt.verify(token, process.env.SECRET);
        if (payload) {
          req.user = payload;
          next();
        } else {
          res.status(400).json({ error: 'token verification failed'});
        }
      } else {
        res.status(400).json({ error: 'malformed authorization header'});
      }
    } else {
      res.status(400).json({ error: 'not authorization header'});
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

export { isLoggedIn }
