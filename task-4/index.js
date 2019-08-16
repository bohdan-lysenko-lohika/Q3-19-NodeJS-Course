const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const {errorHandler} = require('./middleware/error-logger');

const SERVER_EVENT_ERROR = 'error';
const PROCESS_EVENT_EXCEPTION = 'uncaughtException';
const PROCESS_EVENT_REJECTION = 'unhandledRejection';

const app = express();
app.use(bodyParser.json());

app.use('/api', routes);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}...`)
});

app.on(SERVER_EVENT_ERROR, (err) => console.log(`Error: ${err.message}\n${err.stack}`));
process.on(PROCESS_EVENT_EXCEPTION, (err) => console.log(`Error: ${err.message}\n${err.stack}`));
process.on(PROCESS_EVENT_REJECTION, (err) => console.log(`Error: ${err.message}\n${err.stack}`));


/**
 - В вашем сервере сделать загрузку файла и передвать его будущее имя в квери, использовать стримы
 - определить mime type файла (разрешается npm модуль)
 - также сделать получение загруженного файла по имени под которым он сохранен тоже через стримы
 - придумать использование трансформ стрима, например заменять только в текстовых файлах
 (based on the mime type) одно слово на другое, или на что у вас хватит фантазиии
 */
