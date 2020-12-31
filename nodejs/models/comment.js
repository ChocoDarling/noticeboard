import Sequelize from 'sequelize';

export default class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.TEXT(),
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT(),
          allowNull: false,
        },
        username: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'Comment',
        tableName: 'comments',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {}
}
