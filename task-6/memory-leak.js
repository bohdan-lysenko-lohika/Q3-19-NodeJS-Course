function run() {
  const result = [];
  for (let i = 0; i < 1e9; i++) {
    result.push(some());
  }
  return result;

  function some() {
    let r = new Array(1000000).fill(Math.random()).join('');
    const used = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
    console.log(`Memory used: ${used}MB`);
    return () => {
      r += r;
    }
  }
}

const s = run();
