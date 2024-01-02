import 'dotenv/config.js';
import './config/database.js';

import express from 'express';
import cors from 'cors';

// TODO import routes

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

app.use('/companies', companiesRouter);



app.listen(PORT, () => {
  console.log(`port listening on ${PORT}`);
});
