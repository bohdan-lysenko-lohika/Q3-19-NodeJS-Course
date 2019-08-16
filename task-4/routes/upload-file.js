const fs = require('fs');
const stream = require('stream');
const path = require('path');
const MimeStream = require('mime-stream');

const { Transform, Writable } = stream;

const MIME_PLAIN = 'plain/text';

function uploadFile(req, res, next) {
  const { filename = 'output' } = req.query;

  // const rs = fs.createReadStream('./file-to-read-jpg');
  const rs = fs.createReadStream(path.resolve(__dirname, '../file-to-read-text'));
  const ws = fs.createWriteStream(path.resolve(__dirname, `../${filename}`));
  const mimeStream = new MimeStream();

  const ts = new Transform({
    transform(chunk, encoding, callback) {
      const mime = mimeStream.type && mimeStream.type.mime || MIME_PLAIN;
      if (mime !== MIME_PLAIN) {
        callback(null, chunk);
        return;
      }

      const newChunk = chunk.toString().replace(/ /g, '____');
      callback(null, newChunk);
    }
  });

  rs
    .pipe(mimeStream)
    .pipe(ts)
    .pipe(ws)
    .on('finish', () => {
      res.send();
    });
}

module.exports = uploadFile;
