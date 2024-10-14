// Require MySQL
var mysql = require("mysql");

// we placed the connections in this source object
var source = {
  // localhost
  localhost: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Indeed@123",
    database: "VOCABS_DB"
  },

  // jawsDB
  // jawsDB: {
  //   host: "<host name>",
  //   port: 3306,
  //   user: "<name of user>",
  //   password: "<password>",
  //   database: "<name of database>"
  // }
};

var connection;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
}
else{
  // we use source.[name of connection] to hook into mysql
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: 'localhost',
      dialect: 'postgres',
    },
  );  
}

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
