const http = require('http');

function BadRequestError(message) {
  this.output = {error: message};
  this.httpStatusCode = 400;
}
function NotFoundError(message = "Page not found") {
  this.output = {error: message};
  this.httpStatusCode = 404;
}
function InternalServerError(error) {
  this.output = {};
  this.data = {error};
  this.httpStatusCode = 500;
}

module.exports = {
  BadRequestError,
  NotFoundError,
  InternalServerError
};
