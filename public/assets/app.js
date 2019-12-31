$(document).ready(function(){
  // Submit button to add a new word
  $("#submit-btn").on("click", function(event){
      // To prevent page from loading
      event.preventDefault();
      // Assigning boolean values
      if($("input[name=optionsRadios]:checked").val() == "learning"){
        category = 0;
      }
      else{
        category = 1;
      }

      //Validation
      if($("#input-word").val().trim()){
      // Grabbing hold of value from user input
      var newWord = {
              word: $("#input-word").val().trim(),
              category: category
              };

      // Post new word to table
      $.ajax("/api/words", {
          type: "POST",
          data: newWord
      }).then(function(){
          console.log("Created new word");
          // To reload the page
          location.reload();
      })
      }

      else{
        alert("Please enter a word");
      }
      $("#input-word").val("");
  })

  // On click of mastered/learn again button
  // $(".mastered").on("click", function(event){
    $(document).on("click", ".table tbody tr td button.mastered", function(){
    console.log("Inside mastered button clicked");
    // event.preventDefault();
    var id = $(this).data("id");
    console.log(id);
        var category = !($(this).data("category"));
        console.log("category");
        console.log(category);
          // Assigning new value
        var newCategory = {
          catalog: category
        };

        // AJAX PUT
  $.ajax("/api/words/" + id, {
  type: "PUT",
  data: newCategory
  }).then(
  function(){
  console.log("Updated", category);
  }
  )
  // To reload the page
  location.reload(true);
  });

  // On click of view graph button
  $("#graph-btn").on("click", function(event) {
    event.preventDefault();
    console.log("Inside graph button");
    if($("#input-learner").val()){
      var learnersName = $("#input-learner").val().trim();
      $.ajax("/api/learner/graph/" + learnersName, {
        type: "GET"
      }).then(function(data){
        console.log("Combination query");
        console.log(data);
        if(data.length > 0){
          var chart = c3.generate({
            bindto: "#chart",
            data: {
                x: 'x',
        //        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
                columns: [
                    ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
        //            ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
                    [learnersName, 10, 5, 12, 15, 7, 20]
                ]
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m-%d'
                    }
                }
            }
        });
        }
        else{
          $("#modal").modal();
          $("#text").text("There is no such learner");
        }
      $("#input-learner").val("");
      })
      
    }
    else{
      alert("Please enter learners' name to view status");
    }
  //   var chart = c3.generate({
  //     bindto: '#chart',
  //     data: {
  //       columns: [
  //         ['data1', 30, 200, 100, 400, 150, 250],
  //         ['data2', 50, 20, 10, 40, 15, 25]
  //       ],
  //       axes: {
  //         data2: 'y2' // ADD
  //       }
  //     },
  //     axis: {
  //       y2: {
  //         show: true // ADD
  //       }
  //     }
  // });
  })


  // On click of delete button
    // $(".btn-danger").on("click", function(event){
      $(document).on("click", ".table tbody tr td button.delete", function(){
        // event.preventDefault();
        console.log("Inside deleete function");
        var id = $(this).data("id");

        $.ajax("/api/delete/" + id, {
          type: "DELETE"
        }).then(
          function(){
            console.log("Deleted ", id);
          }
        )
        // To reload the page
        location.reload(true);
    })
    
})

// Function to add new learner to learner table
$(document).on("click", ".table tbody tr td button.learntBy", function(){
  var word;
  console.log("Inside learner adding function");

  var id = $(this).data("id");
  console.log("ID : " + id);
  console.log($("textarea[data-text="+id+"]").val());
  if($("textarea[data-text="+id+"]").val()){
  $.ajax("/api/word/" + id, {
    type: "GET"
  }).then(function(data){
    console.log("word");
    console.log(data.WORD);
    word = data.WORD;
    category = data.MASTERED;
  
  
  console.log("returned word : " + word);
  console.log("returned stauts : " + category);
  var newLearner = {
    learner: $("textarea[data-text="+id+"]").val(),
    word: word,
    category: category
  }
  
  console.log("Learner name : " + newLearner.learner);
  console.log("Learner word : " + newLearner.word);
  console.log("Learner category : " + newLearner.category);

  // Post learnt by name to learners table
  $.ajax("/api/learners/" + id, {
    type: "POST",
    data: newLearner
  }).then(function(){
    console.log("New learner added");
    // location.reload(true);
  })
  $("textarea[data-text="+id+"]").val("");
  // location.reload(true);
})
  }
  else{
    alert("Enter a name to view status");
  }
})

  // View all learners name
  // $("#view-btn").on("click", function(event){
    $(document).on("click", "#view-btn", function(event){
    event.preventDefault();
    $("#viewTable").removeClass("d-none");
    console.log("Inside view button");
    $.ajax("/api/learners", {
      type: "GET"
    }).then(function(data){
      console.log(data);
      // Creating rows and columns for retrived values
      for(var i=0; i<data.length; i++){
      var tr = $("<tr>");
      tr.append("<td>" + data[i].id + "</tr>");
      tr.append("<td>" + data[i].NAME + "</tr>");
      tr.append("<td>" + data[i].WORD + "</tr>");
      $("#viewTable").append(tr);
      }

    })

  })

  // View learners status
  $(document).on("click", "#learner-btn", function(event){
    event.preventDefault();
    console.log("Inside learner-btn");
    if($("#input-learner").val()){
      var learnersName = $("#input-learner").val().trim();
      $.ajax("/api/learner/status/" + learnersName, {
        type: "GET"
      }).then(function(data){
        console.log("Combination query");
        console.log(data);
        if(data.length > 0){
        // Appending results to modal
        var list = $("<ol>");
        for(var i=0; i<data.length; i++){
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
      else{
        $("#modal").modal();
        $("#text").text("There is no such learner");
      }
      $("#input-learner").val("");
      })
      
    }
    else{
      alert("Please enter learners' name to view status");
    }
  })


