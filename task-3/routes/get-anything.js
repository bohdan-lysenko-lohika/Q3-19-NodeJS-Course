const https = require('https');
const {InternalServerError} = require('../errors');
const {getBodyDataFromRequest} = require('../../task-2/request-helper');

const REQUEST_EVENT_ERROR = 'error';

function getAnything(req, res, next) {
  const options = {
    method: 'GET',
    hostname: 'jsonplaceholder.typicode.com',
    path: '/posts',
    protocol: 'https:',
    headers: {Accept: 'application/json'},
  };
  const httpsRequest = https.request(options, async (httpsResponse) => {
    const data = await getBodyDataFromRequest(httpsResponse);
    res.send(data);
    next();
  });
  httpsRequest.on(REQUEST_EVENT_ERROR, (error) => {
    next(new InternalServerError(error));
  });
  httpsRequest.end();
}

module.exports = getAnything;
