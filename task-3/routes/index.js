const express = require('express');
const router = express.Router();

const postSum = require('./post-sum');
const getAnything = require('./get-anything');

router.post('/sum/:c', postSum);
router.get('/anything', getAnything);

module.exports = router;
