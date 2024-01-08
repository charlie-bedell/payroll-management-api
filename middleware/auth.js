import 'dotenv/config';
import express from 'express';
import jwt from 'jsonwebtoken';
import { User, UserRole, Employee } from '../models/payroll-models.js';

function isLoggedIn(req, res, next) {
  try {
    if (req.headers.authorization) {
      // seperate "bearer " from the token
      const token = req.headers.authorization.split(' ')[1];
      if (token) {
        const payload = jwt.verify(token, process.env.SECRET);
        if (payload) {
          req.userpayload = payload;
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

async function checkCompany(req, res, next) {
  let reqParams = req.path.split('/');
  reqParams = reqParams.filter((x) => x.length >= 24);
  if (reqParams.length == 0) {
    next();
  } else {
    const companyId = reqParams[0];
    const employeeId = reqParams[1];
    if ((companyId == String(req.user.companyId))) {
      if (employeeId) {
        let employeeAccess = await allowEmployeeAccess(req.user.role, employeeId, req.user);
        if (employeeAccess) {
          next();
        } else {
          res.status(400).json({ error: 'permission denied: you cannot access that employee'});
        }
      } else {
        next();
      }
    } else {
      res.status(400).json({ message: 'permission denied, you cannot access that company'});
    }
  }
}

async function allowEmployeeAccess(role, employeeAccessAttempt, user) {
  // depending on user role, handle access to a specific employee
  // Admin: access all employees
  // Manager: access all employees within their department
  // Employee: can only access their employee page
  switch (role) {
  case 'Admin':
    return true;
  case 'Manager':
    const employee = await Employee.findById(employeeAccessAttempt);
    const department = employee.department;
    console.log(user);
    if (department === user.department) {
      return true;
    } else {
      console.log('permission denied: cannot access employee outside of department');
      return false;
    }
  case 'Employee':
    if (employeeAccessAttempt == user.employeeId) {
      return true;
    } else {
      console.log('permission denied: cannot access employee');
      return false;
    }
  default:
    console.log('permission denied: undefined role!');
    return false; 
  }
}

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
  if (req.user.role === 'Admin') {
    next();
  } else {
    res.status(400).json({ error: `Permission Denied: ${req.user.role} does not have Admin access`});
  }
}

function isManager(req, res,next) {
  if ((req.user.role === 'Admin') || (req.user.role === 'Manager'))  {
    next();
  } else {
    res.status(400).json({ error: `Permission Denied: ${req.user.role} does not have Manager Access`});
  }
}

export { isLoggedIn, authorization, isAdmin, isManager, checkCompany }
