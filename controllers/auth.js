import 'dotenv/config.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import { User } from '../models/payroll-models.js';

const SECRET = process.env.SECRET;

function validateEmail(emailString) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(emailString)) {
		throw new Error(`${emailString} is not a valid email.`);
	}
}

function validatePasswordStrength(pass) {
	if (pass.length < 5) {

	  throw new Error(`Current password is too short!`);

  } else if ((pass.match(/[a-z]/g) ?? []).length < 1) {
	  throw new Error(`Password must contain at least 1 lowercase character`);

  } else if ((pass.match(/[A-Z]/g) ?? []).length < 1) {
	  throw new Error(`Password must contain at least 1 uppercase character`);

	} else if ((pass.match(/[0-9]/g) ?? []).length < 1) {
    throw new Error(`Password must contain at least 1 numerical digit`);
	}
  else if ((pass.match(/\W/g) ?? []).length < 1) {
    throw new Error(`Password must contain at least 1 special character`);
	}
}

async function createNewUser(payload) {
  // throw error if username is not an email
	validateEmail(payload.username);
  // throw error if password is not strong enough
	validatePasswordStrength(payload.password);
	// hashes a password and creates a new user;
	payload.password = await bcrypt.hash(payload.password, 10);
	let newUser = await User.create(payload);
	return newUser.username;
}

async function loginExistingUser(payload) {
	const username = payload.username;
	const user = await User.findOne({ username });

	if (user) {
		const passwordMatches = await bcrypt.compare(payload.password, user.password);
		if (passwordMatches) {
      // checks if the hashed password matches and sends a signed jwt token to the client
			const token = jwt.sign({ username }, SECRET);
			return token;
		} else {
			throw new Error(`wrong password for ${payload.username}`);
		}

	} else {
		throw new Error(`${payload.username} does not exist`);
	}
}


export { createNewUser, loginExistingUser }
