const http = require('http');
const url = require('url');
const routes = require('./routes');
const { getBodyDataFromRequest } = require('./request-helper');
const { sendNotFoundResponse, sendBadRequestResponse } = require('./response-helper');

const SERVER_EVENT_ERROR = 'error';
const PROCESS_EVENT_EXCEPTION = 'uncaughtException';
const PROCESS_EVENT_REJECTION = 'unhandledRejection';

const server = http.createServer(async (request, response) => {
    const URL_PARSE_QUERY_STRING = true;
    const parsedUrl = url.parse(request.url, URL_PARSE_QUERY_STRING);

    try {
        const bodyAsJson = await getBodyDataFromRequest(request);
        const router = routes.find(({path, method}) =>
            path === parsedUrl.pathname && method === request.method);

        if (!router) {
            return sendNotFoundResponse(response);
        }
        const { handler } = router;
        handler(request, response, parsedUrl, bodyAsJson);
    } catch(e) {
        console.log(e);
        sendBadRequestResponse(response, 'please provide valid arguments');
    }
});

server.on(SERVER_EVENT_ERROR, (err) => console.log(`Error: ${err.message}\n${err.stack}`));
process.on(PROCESS_EVENT_EXCEPTION, (err) => console.log(`Error: ${err.message}\n${err.stack}`));
process.on(PROCESS_EVENT_REJECTION, (err) => console.log(`Error: ${err.message}\n${err.stack}`));

server.listen(process.env.PORT, () => {
    console.log('Server is running...');
});
