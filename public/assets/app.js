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
        var category = $(this).data("category");
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
  console.log("Inside learner adding function");

  var id = $(this).data("id");
  console.log("ID : " + id);
  console.log($("textarea[data-text="+id+"]").val());
  var newLearner = {
    learner: $("textarea[data-text="+id+"]").val(),
    word: $("#input-word").val().trim()
  }
  console.log("Learner name : " + newLearner.learner);

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

  // View learners status by name
  $("#view-btn").on("click", function(event){
    event.preventDefault();
    $.ajax("/api/learners", {
      type: "GET"
    }).then(function(data){
      console.log(data);
      
    })

  })

