const express = require('express');
const router = express.Router();

const uploadFile = require('./upload-file');

router.get('/upload-file', uploadFile);

module.exports = router;
