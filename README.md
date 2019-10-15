# Sequelize-VocabularyBuilder

## Summary
Application helps user to build their vocabulary skills as it would allow users to add a new word and once they have mastered in learning a new word, user will be able to push to mastered table. If user wishes to learn the word again, then user can move that word to learning table to keep track of. This application has access to a number of users. User will be able to keep track of all those words learnt/mastered by querying the application with respective names. Any one can view all learners of Vocabulary-Builder. Also, user can delete a word when no longer needed. Developed this application on inspiration from Kindle's Vocabulary Builder

## Installation Guide
* User has to download all files from GitHub repository
* User can either clone the repository or can download all files manually unzipping might take a while though
* Package.json file has required depencies to be installed. So, user can type `npm install` to install all needed packages
* User can type `node server.js` to run the file from command line
* Since sequelize was used to create tables, user can create database alone using `schema.sql` file.

## Technologies Used
- HTML : Basic skeleton of application and forms
- Bootstrap : For application styling
- Javascript : used to provide interactive effects
- Handlebar : To dynamically generate HTML page
- MySql : Relational Database Management
- Sequelize : Promise based Node.js ORM for MySql
- Node : used to run javascript file outside the browser. Supports command line user input. Node is useful is different ways. As
far as this code is concerned, utilised inquirer to dynamically prompt question to user. Used mysql npm package to create schemas.

## Application Functioning
Type `node server.js` from command line. Funtioning of the application is shown below

![Site](gif/VocabularyBuilder1.gif)

On run of the application shows list of words available from table. User can add a new word and provide it's category of whether the word is being learnt or mastered. At any point of time, user can quickly swap the words from learning and mastered table. To keep track of learning skills, user can type their name to corresponding word they learnt and can keep track of all words learnt by querying the application with respective users name. Also user can delete a word when no longer needed. All users of this application can also be tracked

## Code Snippet
*Server side javascript*
```Javascript
app.get("/api/learner/status/:learnersName", function(req, res){

    db.Learner.findAll({
        where: {
          NAME: req.params.learnersName
        },
        include: [db.Vocabs]
      }).then(function(result) {
        console.log("Combination query");
        console.log(result);
        res.json(result);
      });
})
```
> Server side javascript to view all words learnt/mastered by each user based on their name.

```Javascript
  app.get("/api/learners", function(req, res){
    db.Learner.findAll({}).then(function(result){
        console.log(result);
        res.json(result);
    })
  })
```
> Server side javascript to view all words.

*Client side javascript*

```Javascript
  if($("#input-learner").val()){
      var learnersName = $("#input-learner").val().trim();
    //   Ajax call to get learner's status by their name
      $.ajax("/api/learner/status/" + learnersName, {
        type: "GET"
      }).then(function(data){
        // Only if data is received, then results are appended to modal
        if(data.length > 0){
        // Appending results to modal
        var list = $("<ol>");
        for(var i=0; i<data.length; i++){
            // If status of word is mastered, then register it as mastered else register as learning
          if(data[i].STATUS)
          list.append("<li>" + data[i].WORD + "  : MASTERED" + "</li>");
          else
          list.append("<li>" + data[i].WORD + "  : LEARNING" + "</li>");
        }
        var name = $("<h1>");
        name.append(learnersName);
        $("#modal").modal();
        $("#text").empty();
        $("#text").append(name);
        $("#text").append(list);
      }
```

> The above code snippet populates the query result to a modal so that user can keep track of their learning skills

## Author Links
[LinkedIn](https://www.linkedin.com/in/mahisha-gunasekaran-0a780a88/)

[GitHub](https://github.com/Mahi-Mani)
