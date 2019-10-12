// Requiring Vocabulary model
var db = require("../models");

module.exports = function(app){
    //   Root route
app.get("/", function(req, res){

  db.Vocabs.findAll({}).then(function(result){
      var obj = {
          result: result
      };
      console.log(obj.result);
      res.render("index", obj);
  })
      
  })

    // Server side post script to add a new word
    app.post("/api/words", function(req, res){
        
        db.Vocabs.create({
            WORD: req.body.word,
            MASTERED: req.body.category
        }).then(function(result){
            res.json(result);
        })
    })

    //   Update table
app.put("/api/words/:id", function(req, res){
    var id = req.params.id;
    var catalog = req.body.catalog;

      db.Vocabs.update({
        WORD: req.body.word,
        MASTERED: catalog
      },{
          where: {
              id: id
          }
      })
})

// To delete a word
app.delete("/api/delete/:id", function(req, res){
    var id = req.params.id;

    db.Vocabs.destroy({
        where: {
            id: id
        }
    })
  })

}