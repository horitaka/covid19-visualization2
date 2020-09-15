const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

// var indexRouter = require('./routes/index');
var covid19dataRouter = require('./routes/covid19data');
var covid19dataRawRouter = require('./routes/covid19data-raw');
var devRouter = require('./routes/dev');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

// app.use('/', indexRouter);
app.use('/covid19data', covid19dataRouter);
app.use('/covid19data-raw', covid19dataRawRouter);
app.use('/dev', devRouter); // Todo: 開発用にHTTP postでスクレイピングをするようにしているが、本来はcronで実行する

// catch 404 and forward to error handler
app.use((req, res, next) => {
  // next(createError(404));
  res.status(404)
  res.send('404 not found')
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

exports.app = functions.https.onRequest(app);


exports.scheduledScraping = functions.pubsub.schedule('every day 11:00')
  .timeZone('Asia/Tokyo')
  .onRun(async (context) => {
    const Covid19DataRawScraping = require('./models/Covid19DataRawScraping')
    const scraping = new Covid19DataRawScraping()
    await scraping.scrapeCovid19Data()
    return null;
  });

exports.scheduledScraping = functions.pubsub.schedule('every day 11:00')
  .timeZone('Asia/Tokyo')
  .onRun(async (context) => {
    // controllerを呼び出す
    const covid19DataController = require('./controller')
    await covid19DataController.updateCovid19Data()
    return null
  });

