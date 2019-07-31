const sum = require('./sum');
const anything = require('./anything');

const METHOD_POST = 'POST';
const METHOD_GET = 'GET';

module.exports = [
    {path: '/sum', method: METHOD_POST, handler: sum},
    {path: '/anything', method: METHOD_GET, handler: anything},
];
