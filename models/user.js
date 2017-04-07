module.exports = function (sequelize, DataTypes) {
  var user = sequelize.define('user',
    // columns of table
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING
      }
      // isAdmin: {
      //   type: DataTypes.BOOLEAN,
      //   defaultValue: false
      // }
    },
    // options
    {
      freezeTableName: true,
      classMethods: {
        associate: function (models) {
          user.hasMany(models.userquiz)
          user.hasMany(models.vote)
        }
      }
    }) // end .define
  return user
}
