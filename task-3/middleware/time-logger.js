function requestLoggerStart(req, res, next) {
  res.timeStart = new Date();
  next();
}

function requestLoggerEnd(req, res, next) {
  const finish = new Date();
  const diffMs = finish - res.timeStart;
  console.log(
    `Time Logger  | METHOD: ${req.method.toUpperCase()}, URL: ${req.originalUrl}, ` +
    `REQUEST TOOK: ${diffMs}ms, ` +
    `REQUESTED ON: ${res.timeStart.toISOString()}, ` +
    `RESPONSE SENT ON: ${finish.toISOString()}`
  );
  next();
}

module.exports = {
  requestLoggerStart,
  requestLoggerEnd
};
