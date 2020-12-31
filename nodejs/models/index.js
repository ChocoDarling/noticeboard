import Sequelize from 'sequelize';
const env = process.env.NODE_ENV || 'development';
import * as config from '../config/config.json';
import User from './user';
import Comment from './comment';

const db = {};
const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  config[env],
);

db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;

User.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);

module.exports = db;
