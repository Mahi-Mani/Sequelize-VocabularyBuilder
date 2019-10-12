// Model for vocabulary table
module.exports = function(sequelize, DataTypes){
    var Vocabs = sequelize.define("Vocabs",{
        WORD: DataTypes.STRING,
        MASTERED: DataTypes.BOOLEAN
    });
    return Vocabs;
}