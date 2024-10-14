// Require express
var express = require("express");
var app = express();

var exphbs = require("express-handlebars");
// // require("dotenv").config();
// // process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//   SELECT LEARNERS.WORD FROM VOCABS RIGHT JOIN LEARNERS ON VOCABS.LEARNERID = LEARNERS.ID WHERE LEARNERS.NAME = "MAHISHA";
//To view learners' status
// Routes
require("./routes/api-routes.js")(app);
// app.get("/", (req, res) => {
//   res.send("Express on Vercel");
// });
// Requiring our models for syncing
var db = require("./models");

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
}); 