module.exports = function (sequelize, DataTypes) {
  var vote = sequelize.define('vote',
    // columns of table
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        reference: {
          model: 'user',
          key: 'id'
          // onDelete: ''
        }
      },
      quizId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        reference: {
          model: 'quiz',
          key: 'id'
        }
      },
      stars: {
        type: DataTypes.INTEGER
      }
    },
    // options
    {
      freezeTableName: true
    }) // end .define
  return vote
}
