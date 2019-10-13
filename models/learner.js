// Export user model
module.exports = function(sequelize, DataTypes) {
    var Learner = sequelize.define("Learner", {
      // Giving the Author model a name of type STRING
      NAME: DataTypes.STRING,
      WORD: DataTypes.STRING
    });
  
    Learner.associate = function(models) {
      models.Learner.hasMany(models.Vocabs, {
        onDelete: "CASCADE"
      });
    };
  
    return Learner;
  };