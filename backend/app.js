/* local libraries */
const path = require('path');
const fs = require('fs');

/* global libraries */
const express = require('express');
const app = express();
const compression = require('compression');
const morgan = require('morgan');
const mongoose = require('mongoose');
/* Routes */
const pullRoutes = require("./routes/pullFromActivision");
const extractRoutes = require('./routes/extractFromActivision');
const matchRoutes = require("./routes/match");
const profileRoutes = require("./routes/profile");
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

/* Setting the interval and function inside him that update the warzone profiles inside the database */
cron.schedule('*/1 * * * *', () => {
  console.log(`Another interval execute on: ${new Date()}`);
  updateExecuter.updateUsersData();
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@warzonesquadtracker.sakwb.mongodb.net/${process.env.MONGODB_COLLECTION}?retryWrites=true&w=majority`
  )
  .then(result => {
    app.listen(8080);
  })
  .catch(err => console.log(err));
