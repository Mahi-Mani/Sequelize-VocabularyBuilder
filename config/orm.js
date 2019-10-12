// Inport connection
var connection = require("../config/connection.js");

// Func to print question marks
function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }

// Object that has CRUD as keys
var orm = {
    create: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
    
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
    
        console.log(queryString);
    
        connection.query(queryString, vals, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      },
      select: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
          cb(result);
        });
      },
      update: function(table, id, catalog, cb) {
        var queryString = "UPDATE ?? SET MASTERED = ? WHERE ID = ?";
    
        console.log(queryString);
        connection.query(queryString, [table, catalog, id], function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      },
      delete: function(table, id, cd){
        var query = "DELETE FROM ?? WHERE ID = ?";
        connection.query(query, [table, id], function(err, result){
          if(err) throw err;
        })
      }
}

// Export the object
module.exports = orm;