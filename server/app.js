const express = require('express');
const path = require('path');
const logger = require('morgan');

// db connection
const db = require('./configs/db.config');

const userRouter = require("./routes/user");
const dashboardRouter = require('./routes/dashboard');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const competitionsRouter = require('./routes/competitions');
const transactionsRouter = require("./routes/transactions");
const chartsRouter = require ("./routes/charts");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/dashboard', dashboardRouter(db));
app.use('/api/user', userRouter(db));
app.use('/api/login', loginRouter(db));
app.use('/api/signup', signupRouter(db));
app.use('/api/competitions', competitionsRouter(db));
app.use('/api/transactions', transactionsRouter(db));
app.use('/api/charts', chartsRouter(db));

module.exports = app;