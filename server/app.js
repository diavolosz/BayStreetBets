const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// db connection
const db = require('./configs/db.config');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dashboardRouter = require('./routes/dashboard');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const competitionsRouter = require('./routes/competitions');
const userRouter = require("./routes/user");
const transactionsRouter = require("./routes/transactions");


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter(db));
app.use('/dashboard', dashboardRouter(db));
app.use('/api/login', loginRouter(db));
app.use('/api/signup', signupRouter(db));
app.use('/api/competitions', competitionsRouter(db));
app.use('/api/user', userRouter(db));
app.use('/api/transactions', transactionsRouter(db));


module.exports = app;
