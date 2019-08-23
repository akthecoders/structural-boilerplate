const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const config = require('config');
const app = express();
connectDB();

app.use(express.json({ extended: false }));

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/user', require('./routes/api/user'));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Services Server started on : http://localhost:${PORT}`);
});

module.exports = app;
