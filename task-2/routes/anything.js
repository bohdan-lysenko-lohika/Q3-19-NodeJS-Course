const https = require('https');
const { getBodyDataFromRequest } = require('../request-helper');
const { sendSuccessResponse, sendBadRequestResponse } = require('./../response-helper');

const REQUEST_EVENT_ERROR = 'error';

function handler(request, response) {
    const options = {
        method: 'GET',
        hostname: 'jsonplaceholder.typicode.com',
        path: '/posts',
        protocol: 'https:',
        headers: {Accept: 'application/json'},
    };
    const httpsRequest = https.request(options, async (httpsResponse) => {
        const data = await getBodyDataFromRequest(httpsResponse);
        sendSuccessResponse(response, data);
    });
    httpsRequest.on(REQUEST_EVENT_ERROR, (error) => {
        sendBadRequestResponse(response, error.message);
    });
    httpsRequest.end();
}

module.exports = handler;


