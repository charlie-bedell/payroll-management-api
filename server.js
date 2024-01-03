import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan'; // logging middleware

import './config/database.js';
import companiesRouter from './routes/company.js';
import authRouter from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.use('/companies', companiesRouter);
app.use('/user', authRouter);



app.listen(PORT, () => {
  console.log(`port listening on ${PORT}`);
});
