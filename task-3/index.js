const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const {requestLoggerEnd} = require('./middleware/time-logger');
const {errorHandler} = require('./middleware/error-logger');
const {requestLoggerStart} = require('./middleware/time-logger');
const {requestCounter} = require('./middleware/request-count-logger');

const SERVER_EVENT_ERROR = 'error';
const PROCESS_EVENT_EXCEPTION = 'uncaughtException';
const PROCESS_EVENT_REJECTION = 'unhandledRejection';

const app = express();
app.use(bodyParser.json());

app.use(requestCounter());
app.use(requestLoggerStart);
app.use('/api', routes);
app.use(errorHandler);
app.use(requestLoggerEnd);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}...`)
});

app.on(SERVER_EVENT_ERROR, (err) => console.log(`Error: ${err.message}\n${err.stack}`));
process.on(PROCESS_EVENT_EXCEPTION, (err) => console.log(`Error: ${err.message}\n${err.stack}`));
process.on(PROCESS_EVENT_REJECTION, (err) => console.log(`Error: ${err.message}\n${err.stack}`));

