const { parentPort } = require('worker_threads');

function calculate() {
  let sum = 0;
  for (let i = 0; i < 6e9; i++) {
    sum += i;
  }
  return sum;
}

const result = calculate();

parentPort.postMessage(result);
