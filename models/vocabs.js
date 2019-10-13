// Model for vocabulary table
module.exports = function(sequelize, DataTypes){
    var Vocabs = sequelize.define("Vocabs",{
        WORD: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            },
            defaultValue: true
        },
        MASTERED: DataTypes.BOOLEAN
    })

    Vocabs.associate = function (models) {
        models.Vocabs.belongsTo(models.Learner, {
          
          foreignKey: {
            allowNull: false
          }
        });
      };

    return Vocabs;
}