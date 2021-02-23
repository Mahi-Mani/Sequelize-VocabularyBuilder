module.exports = function (sequelize, DataTypes) {
  var Word = sequelize.define("Word", {
    word: {
      type: DataTypes.STRING
    },
    learned: {
      type: DataTypes.BOOLEAN
    }
  });

  Word.associate = function(models) {
    models.Word.belongsToMany(models.User, {through: models.User_Word});
  }

  return Word;
}