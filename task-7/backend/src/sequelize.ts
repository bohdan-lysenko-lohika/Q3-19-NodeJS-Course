import {Sequelize, SequelizeOptions} from 'sequelize-typescript';
import config from '../config/config.json';
import {Dialect} from 'sequelize';
import User from '../models/user.model';

const options: SequelizeOptions = {
  ...config.development,
  dialect: <Dialect>config.development.dialect,
};

const sequelize = new Sequelize(options);

export default sequelize;
