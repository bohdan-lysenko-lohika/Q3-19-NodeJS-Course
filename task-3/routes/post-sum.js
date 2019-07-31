const {BadRequestError} = require('../errors');

function postSum(req, res, next) {
  const { a } = req.query;
  const { b } = req.body;
  const { c } = req.params;

  const nA = Number(a);
  const nB = Number(b);
  const nC = Number(c);

  if (Number.isNaN(nA) || Number.isNaN(nB) || Number.isNaN(nC)) {
    return next(new BadRequestError('Please provide valid arguments'));
  }
  const answer = nA + nB + nC;
  res.send({answer});
  next();
}

module.exports = postSum;
