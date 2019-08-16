function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  const code = err ? err.httpStatusCode : 404;
  res.status(code);
  res.send(err.output);

  console.log(
    `Error Logger | ` +
    `METHOD: ${req.method.toUpperCase()}, ` +
    `URL: ${req.originalUrl}, ` +
    `BODY: ${JSON.stringify(req.body)}, ` +
    `ERROR CODE: ${code}, ` +
    `ERROR MESSAGE: ${JSON.stringify(err.output)} `
  );
  next();
}

module.exports = {
  errorHandler
};
