'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
    'quiz',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false
        },
        description: {
          type: Sequelize.STRING
        },
        madeBy: {
          type: Sequelize.INTEGER,
          references: {
            model: 'user',
            key: 'id'
            // allowNull: false
          }
          // onUpdate: 'cascade',
          // onDelete: 'cascade'
        }
      },
      {
        freezeTableName: true
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('quiz')
  }
}
