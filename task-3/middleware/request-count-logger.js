function requestCounter() {
  let counter = 0;

  return (req, res, next) => {
    counter++;
    console.log(`Req. logger  | #${counter}`);
    next();
  }
}

module.exports = {
  requestCounter
};
