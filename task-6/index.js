const {Worker} = require('worker_threads');

function WorkerPool(path, numOfWorkers) {
  this.workers = [];
  for (let i = 0; i < numOfWorkers; i++) {
    const worker = new WorkerPoolItem(i, path);
    this.workers.push(worker);
  }
}
WorkerPool.prototype.run = async function() {
  console.log(`WorkerPool is running`);
  this.isWorking = true;

  while (this.isWorking) {
    const freeWorker = this.workers.find((workerPoolItem) => !workerPoolItem.isWorking);
    if (freeWorker) {
      freeWorker.run();
    } else {
      await this.waitFor(3);
    }
  }
};
WorkerPool.prototype.waitFor = function(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, seconds * 1000);
  });
};
WorkerPool.prototype.stop = async function() {
  console.log(`WorkerPool was stopped`);
  this.isWorking = false;
};

function WorkerPoolItem(workerId, path) {
  this.workerId = workerId;
  this.path = path;
  this.isWorking = false;
}
WorkerPoolItem.prototype.run = function() {
  const timeStarted = Date.now();
  console.log(`Worker ${this.workerId} is running`);
  this.isWorking = true;

  const promise = new Promise((resolve, reject) => {
    const worker = new Worker(this.path);
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });

  return promise
    .finally(() => {
      this.isWorking = false;
      const timeDiff = (Date.now() - timeStarted) / 1000;
      console.log(`Worker ${this.workerId} is finished (${timeDiff}s)`);
    });
};


const pool = new WorkerPool("./worker.js", 3);

async function test() {
  const result1 = await pool.run();
  const result2 = await pool.run();
  const result3 = await pool.run();
}

test();

//
// 1. Написать WorkerPool, который с помощью очереди раздает таски для свободного треда.
//   Таски должны раниться асинхронно, если все воркеры заняты, то очередь должна ждать первого освободившегося,
//   а весь метод все также асинхронно дожидаться.
//
//   interface WorkerPool {
//   constructor(path: string, numOfWorkers: number): void
//     run(params: any): Promise<any>
// }
//
// примеры использования
//
// const pool = new WorkerPool("./worker.js", 2);
//
// const result1 = await pool.run()
// const result2 = await pool.run()
// const result3 = await pool.run()
//
//
// const [res1, res2, res3] = await Promise.all([pool.run(), pool.run(), pool.run()])
//
//
// в воркер сложите чтото тяжелое типа:
//   let sum = 0;
// for (let i = 0; i < 1e9; i++) {
//   sum += i;
// }
//
// 2. Придумать и реализовать мемори лик (запомнить и больше так не делать).
//
// 3. Поменяться с кем-то своими мемори ликами (из пункта 2) и продебажить чужой код используя любой нод инспектор.
// (Записать мемори профайл)
//
// 4. Написать тесты на существующие контроллеры/сервисы вашего експресс приложения.
//   Использовать можно любые технологии.
//
// 5<звездочка> Написать API тесты (можно без использования тестовой базы, с ней это 2<звездочки> =) )
