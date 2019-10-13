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

//   db.Vocabs.findAll({
//     include: [{
//         model: db.Learner,
//         where: { id: db.VocabsLearnerId }
//     }]
// }).then(function(result2){
//     console.log("Combination query");
//     console.log(result2);
// })
      
  })

    //   To view all learners
  app.get("/api/learners", function(req, res){
    db.Learner.findAll({}).then(function(result){
        console.log(result);
        res.json(result);
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

    // Server side post new learner values
    app.post("/api/learners/:id", function(req, res){
        var id = req.params.id;
        db.Learner.create({
            WORD: req.body.word,
            NAME: req.body.learner  
        },{
            where: {
                id: id
            }
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