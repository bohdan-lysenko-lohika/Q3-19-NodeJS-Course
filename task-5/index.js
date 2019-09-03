const { spawn, fork } = require('child_process');
const express = require('express');
const path = require('path');
const cluster = require('cluster');
const CPUs = require('os').cpus().length;
const combineStreams = require('./combine-streams');

const PORT = process.env.PORT;

if (cluster.isMaster) {
  const workers = [];
  for(let i = 0; i < CPUs; i++) {
    const worker = cluster.fork();
    workers.push(worker);
  }
  cluster.on('online', (worker) => console.log('Worker ' + worker.process.pid + ' is online.'));
  cluster.on('exit', (worker) => console.log('worker ' + worker.process.pid + ' died.'));

  setInterval(() => {
    workers.forEach((worker) => {
      worker.send({
        timestamp: Date.now()
      });
    })
  }, 10 * 1000);
} else {
  const app = express();
  let timestamp = null;

  app.use(function(req, res, next) {
    res.setHeader('X-Timestamp', timestamp);
    next();
  });

  app.get('/spawn', (req, res) => {
    const uptime = spawn('uptime');
    const ps = spawn('ps', ['aux']);
    const grep = spawn('grep', ['task-5'], {stdio: [ps.stdout, 'pipe', process.error]});

    const streams = combineStreams([
      uptime.stdout,
      grep.stdout
    ]);

    let result = [];
    streams.on('data', (data) => result.push(data.toString()));
    streams.on('end', () => {
      result = [
        '<pre>',
        ...result,
        '</pre>'
      ];
      res.send(result.join("<br/>"));
    });
  });

  app.get('/fork', (req, res) => {
    const calculate = fork(path.resolve(__dirname, './scripts/calculate.js'));
    calculate.on('message', (message) => {
      res.send(message.toString());
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  process.on('message', (message) => {
    timestamp = message.timestamp;
  });
}



// 1.	Написать ендпоинт который достанет любые сведения о системе или еще чем-либо (следует подключить фантазию и заюзать команды типа uptime/ps/find и тд)
// 2.	Написать ендпоинт который будет ранить тяжелые скрипты используя fork (например подсчет суммы рандомных значений в цикле 0 – 1e9).
// 3.	Запустить существующее приложение в кластере
// 4.	Настроить синхронизацию воркеров в кластере и отдавать, например, в хедере таймштамп последнего синка
// 5.	* разобраться с pm2 и поднять кластер на нем
// Все ендпоинты можно дергать с фронтенда для красоты
