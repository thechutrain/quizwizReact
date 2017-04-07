module.exports = function (sequelize, DataTypes) {
  var quiz = sequelize.define('quiz',
      // columns
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      madeBy: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
          // allowNull: false
        }
        // onUpdate: 'cascade',
        // onDelete: 'cascade'
      }
    },
      // options
    {
      freezeTableName: true,
      classMethods: {
        associate: function (models) {
          // quiz.belongsToMany(models.user, { through: 'vote', foreignKey: 'quizId' })
          quiz.hasMany(models.userquiz)
          quiz.hasMany(models.vote)
        }
      } // end classMethods
    }
    ) // end .define
  return quiz
}
