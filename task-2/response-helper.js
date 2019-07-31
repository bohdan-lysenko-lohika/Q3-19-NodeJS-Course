const RESPONSE_HEADER_CONTENT_TYPE = 'content-type';
const RESPONSE_HEADER_CONTENT_TYPE_JSON = 'application/json';

const STATUS_OK = 200;
const STATUS_OK_MESSAGE = 'OK';

const STATUS_NOT_FOUND = 404;
const STATUS_NOT_FOUND_MESSAGE = 'NOT FOUND';

const STATUS_BAD_REQUEST = 400;
const STATUS_BAD_REQUEST_MESSAGE = 'BAD REQUEST';

function sendSuccessResponse(response, data) {
    setBasicHeaders(response);
    response.statusCode = STATUS_OK;
    response.statusMessage = STATUS_OK_MESSAGE;
    response.end(JSON.stringify(data));
}

function sendNotFoundResponse(response) {
    setBasicHeaders(response);
    response.statusCode = STATUS_NOT_FOUND;
    response.statusMessage = STATUS_NOT_FOUND_MESSAGE;
    response.end(JSON.stringify(null));
}

function sendBadRequestResponse(response, data) {
    setBasicHeaders(response);
    response.statusCode = STATUS_BAD_REQUEST;
    response.statusMessage = STATUS_BAD_REQUEST_MESSAGE;
    response.end(JSON.stringify(data));
}

function setBasicHeaders(response) {
    response.setHeader(RESPONSE_HEADER_CONTENT_TYPE, RESPONSE_HEADER_CONTENT_TYPE_JSON);
}

module.exports = {
    sendSuccessResponse,
    sendNotFoundResponse,
    sendBadRequestResponse,
};
