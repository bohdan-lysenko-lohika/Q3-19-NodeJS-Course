const { PassThrough } = require('stream');
module.exports = (streamArray, streamCounter = streamArray.length) => streamArray
  .reduce((mergedStream, stream) => {
    mergedStream = stream.pipe(mergedStream, { end: false });
    stream.once('end', () => --streamCounter === 0 && mergedStream.emit('end'));
    return mergedStream;
  }, new PassThrough());
