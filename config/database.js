import mongoose from 'mongoose';
import 'dotenv/config.js';
// shortcut to mongoose.connection object
const db = mongoose.connection;

// Connect to the database
mongoose.connect(process.env.DATABASE_URI);

db.on('connected', function() {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});
