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
async function authorization(req, res, next) {
  try {
    const user = await User.findOne({username: req.userpayload.username});
    const userRole = await UserRole.findById(user.userRoleId);
    let userDepartment = null;
    if (user.employeeId) {
      const employee = await Employee.findById(user.employeeId);
      userDepartment = employee.department;
    }
    req.user = {
      username: user.username,
      employeeId: user.employeeId,
      companyId: user.companyId,
      userRoleId: user.userRoleId,
      role: userRole.role,
      department: userDepartment};
    next();
  } catch (err) {
    res.status(400).json({ message: 'unable to find user associated with jwt', error: `${err}`});
  }
}

function isAdmin(req, res, next) {
  if (req.user.permission === 'Admin') {
    next();
  } else {
    res.status(400).json({ error: `Permission Denied: ${req.user} does not have Admin access`});
  }
}

function isManager(req, res,next) {
  if ((req.permission === 'Admin') || (req.permission === 'Manager'))  {
    next();
  } else {
    res.status(400).json({ error: `Permission Denied: ${req.user} does not have Manager Access`});
  }
}

export { isLoggedIn, authorization, isAdmin, isManager, checkCompany }
