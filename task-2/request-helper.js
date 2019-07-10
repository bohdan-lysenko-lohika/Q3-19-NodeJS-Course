const REQUEST_EVENT_DATA = 'data';
const REQUEST_EVENT_DATA_END = 'end';

function getBodyDataFromRequest(request) {
    return new Promise((resolve, reject) => {
        const bodyChunks = [];
        request.on(REQUEST_EVENT_DATA, (chunk) => bodyChunks.push(chunk));
        request.on(REQUEST_EVENT_DATA_END, () => {
            try {
                if (!bodyChunks.length) {
                    resolve(null);
                    return;
                }
                const body = JSON.parse(Buffer.concat(bodyChunks));
                resolve(body);
            } catch(e) {
                console.log(e);
                reject(e);
            }
        });
    })
}

module.exports = {
    getBodyDataFromRequest
};
