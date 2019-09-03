calculate();

function calculate() {
  let result = 0;
  for(let i = 0; i < 9e9; i++) {
    result += i;
  }

  process.send(result);
}

