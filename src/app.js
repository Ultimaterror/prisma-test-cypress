const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require("cors");
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');


const app = express();

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cors({
    origin: "http://localhost:8080",
    optionsSuccessStatus: 200,
  })
);

// Import routers
// Use Routers
// const indexRouter = require('./routers/indexRouter');
// app.use('/', indexRouter);

app.get('/', (req, res) => {
  console.log("Got a request");
  res.json({ message: "Hey, I'm Tom, the API" });
});

const postItsRouter = require('./routers/postItsRouter');
app.use('/post_its', postItsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err.message);
});

app.listen("5555", (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    // eslint-disable-next-line no-restricted-syntax
    console.log(`Server is listening on ${"5555"}`);
  }
});

// module.exports = app;
