/* local libraries */
const path = require('path');
const fs = require('fs');

/* global libraries */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const compression = require('compression');
const morgan = require('morgan');
const mongoose = require('mongoose');
/* Routes */
const pullRoutes = require("./routes/pullFromActivision");
const extractRoutes = require('./routes/extractFromActivision');
const matchRoutes = require("./routes/match");
const profileRoutes = require("./routes/profile");
const userRoutes = require("./routes/user");
/* update db utils */
const updateExecuter = require("./middleware/update-db");
const cron = require('node-cron');  // Will help up us to execute the update protocol in custom time interval.


/* Log tracking */
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

app.use(compression());
app.use(morgan('combined', { stream: accessLogStream }));

/* CORS PERMESSION'S */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/pull', pullRoutes);
app.use('/extract', extractRoutes);
app.use('/match', matchRoutes);
app.use('/profile', profileRoutes);
app.use('/user', userRoutes);

/* Setting the interval and function inside him that update the warzone profiles inside the database */
cron.schedule('*/15 * * * *', () => {
  console.log(`Another warzone profiles update interval execute on: ${new Date()}`);
  updateExecuter.updateUsersData();
});

/* Super 'Catcher' for errors handling */
// Not all errors will be handled by this middleware there is some methods who will handle the errors by themselves.
app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@warzonesquadtracker.sakwb.mongodb.net/${process.env.MONGODB_COLLECTION}?retryWrites=true&w=majority`
  )
  .then(result => {
    app.listen(8080);
  })
  .catch(err => console.log(err));
