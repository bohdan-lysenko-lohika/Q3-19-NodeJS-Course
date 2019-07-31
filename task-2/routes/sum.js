const { sendSuccessResponse, sendBadRequestResponse } = require('./../response-helper');

function handler(request, response, url, data) {
    const { a } = url.query;
    const { b } = data;
    const nA = Number(a);
    const nB = Number(b);
    if (isNaN(nA) || isNaN(nB)) {
        sendBadRequestResponse(response, {message: 'please provide valid arguments'});
        return;
    }
    const answer = nA + nB;
    sendSuccessResponse(response, {answer});
}

function isNaN(value) {
    return value !== value;
}

module.exports = handler;


