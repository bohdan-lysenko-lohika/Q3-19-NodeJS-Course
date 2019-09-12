import sequelize from './../src/sequelize';
sequelize.addModels([__dirname + '/*.model.ts', __dirname + '/*.model.js']);

import User from './user.model';

export {
  User
}
