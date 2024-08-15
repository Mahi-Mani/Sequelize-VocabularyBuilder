$(document).ready(function () {
  // Submit button to add a new word
  $("#submit-btn").on("click", function (event) {
    // To prevent page from loading
    event.preventDefault();
    // Assigning boolean values
    if ($("input[name=optionsRadios]:checked").val() == "learning") {
      category = 0;
    }
    else {
      category = 1;
    }

    //Validation
    if ($("#input-word").val().trim() && $("#word-meaning").val().trim()) {
      // Grabbing hold of value from user input
      // console.log($("#word-meaning").val().trim());
      var newWord = {
        word: $("#input-word").val().trim(),
        category: category,
        meaning: $("#word-meaning").val().trim()
      };

      // Post new word to table
      $.ajax("/api/words", {
        type: "POST",
        data: newWord
      }).then(function () {
        console.log("Created new word");
        // To reload the page
        location.reload();
      })
    }

    else {
      alert("Please enter a word");
    }
    $("#input-word").val("");
  })

  // On click of mastered/learn again button
  // $(".mastered").on("click", function(event){
  $(document).on("click", ".table tbody tr td button.mastered", function () {
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
      function () {
        console.log("Updated", category);
      }
    )
    // To reload the page
    location.reload(true);
  });

  // On click of view graph button
  $("#graph-btn").on("click", function (event) {
    event.preventDefault();
    getDailyProgress();
  })

  // Function to get Daily learning progress
  function getDailyProgress() {
    var values = [];
    var dates = ['x'];
    var tempDates = [];
    var count = 1;
    console.log("Inside graph button");
    if ($("#input-learner").val()) {
      var learnersName = $("#input-learner").val().trim();
      $.ajax("/api/learner/graph/" + learnersName, {
        type: "GET"
      }).then(function (data) {
        values.push(learnersName);
        console.log("Graph query");
        console.log(data);
        if (data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            tempDates.push(data[i].createdAt.substring(0, 10));
            var month = moment(data[i].createdAt.substring(0, 10)).format('MMMM');
            console.log(month);
            console.log(tempDates);
          }
          for (var i = 0; i < data.length; i++) {
            if (tempDates[i] === tempDates[i + 1]) {
              count++;
              console.log(`Count inside if loop: ${count}`);
            }
            else {
              dates.push(tempDates[i]);
              console.log(`Count inside else loop: ${count}`);
              values.push(count);
            }
          }
          console.log(dates);

          var chart = c3.generate({
            bindto: "#chart",
            data: {
              x: 'x',
              //        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
              columns: [
                dates,
                //            ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
                values
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
        else {
          $("#modal").modal();
          $("#text").text("There is no such learner");
        }
        $("#input-learner").val("");
      })

    }
    else {
      alert("Please enter learners' name to view status");
    }
  }

  // On click of monthly button
  $("#monthly-btn").on("click", function (event) {
    event.preventDefault();
    getMonthlyProgress();
  })

  // Function to get Monthly Learning progress
  function getMonthlyProgress() {
    var month;
    var monthArr = ['x'];
    var tempMonthArr = [];
    var count = 1;
    var values = [];

    if ($("#input-learner").val()) {
      var learnersName = $("#input-learner").val().trim();
      $.ajax("/api/learner/graph/" + learnersName, {
        type: "GET"
      }).then(function (data) {
        values.push(learnersName);
        console.log("Graph query");
        console.log(data);
        if (data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            month = moment(data[i].createdAt.substring(0, 10)).format('MMMM');
            tempMonthArr.push(month);
            console.log(tempMonthArr);
          }
          for (var i = 0; i < data.length; i++) {
            if (tempMonthArr[i] === tempMonthArr[i + 1]) {
              count++;
              console.log(`Count inside if loop: ${count}`);
            }
            else {
              monthArr.push(tempMonthArr[i]);
              console.log(`Count inside else loop: ${count}`);
              values.push(count);
            }
          }
          console.log(monthArr);

          var chart = c3.generate({
            bindto: "#chart",
            data: {
              x: 'x',
              //        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
              columns: [
                monthArr,
                //  ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
                values
              ]
            }
          });
        }
        else {
          $("#modal").modal();
          $("#text").text("There is no such learner");
        }
        $("#input-learner").val("");
      })

    }
    else {
      alert("Please enter learners' name to view status");
    }
  }


  // On click of delete button
  // $(".btn-danger").on("click", function(event){
  $(document).on("click", ".table tbody tr td button.delete", function () {
    // event.preventDefault();
    console.log("Inside deleete function");
    var id = $(this).data("id");

    $.ajax("/api/delete/" + id, {
      type: "DELETE"
    }).then(
      function () {
        console.log("Deleted ", id);
      }
    )
    // To reload the page
    location.reload(true);
  })

})

// Function to add new learner to learner table
$(document).on("click", ".table tbody tr td button.learntBy", function () {
  var word;
  console.log("Inside learner adding function");

  var id = $(this).data("id");
  console.log("ID : " + id);
  console.log($("textarea[data-text=" + id + "]").val());
  if ($("textarea[data-text=" + id + "]").val()) {
    $.ajax("/api/word/" + id, {
      type: "GET"
    }).then(function (data) {
      console.log("word");
      console.log(data.WORD);
      word = data.WORD;
      category = data.MASTERED;


      console.log("returned word : " + word);
      console.log("returned stauts : " + category);
      var newLearner = {
        learner: $("textarea[data-text=" + id + "]").val(),
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
      }).then(function () {
        console.log("New learner added");
        // location.reload(true);
      })
      $("textarea[data-text=" + id + "]").val("");
      // location.reload(true);
    })
  }
  else {
    alert("Enter a name to view status");
  }
})

// View all learners name
// $("#view-btn").on("click", function(event){
$(document).on("click", "#view-btn", function (event) {
  event.preventDefault();
  // $("#viewTable").removeClass("d-none");
  console.log("Inside view button");
  $.ajax("/api/learners", {
    type: "GET"
  }).then(function (data) {
    console.log(data);
    $("#flashcard").modal();
    $("#words").append(data[0].WORD);
    console.log("After modal");
    // Creating rows and columns for retrived values
    // for (var i = 0; i < data.length; i++) {
    //   var tr = $("<tr>");
    //   tr.append("<td>" + data[i].id + "</tr>");
    //   tr.append("<td>" + data[i].NAME + "</tr>");
    //   tr.append("<td>" + data[i].WORD + "</tr>");
    //   $("#viewTable").append(tr);
    // }

  })

})

// View learners status
$(document).on("click", "#learner-btn", function (event) {
  event.preventDefault();
  console.log("Inside learner-btn");
  // if ($("#input-learner").val()) {
  // var learnersName = $("#input-learner").val().trim();
  $.ajax("/api/learner/status/", {
    type: "GET"
  }).then(function (data) {
    console.log("Combination query");
    console.log(data);
    if (data.length > 0) {
      var learnCount = 0;
      var masteredCount = 0;
      for (var i = 0; i < data.length; i++) {
        if (data[i].MASTERED) {
          masteredCount++;
        } else {
          learnCount++;
        }
      }
      // Appending results to modal
      var heading = $("<h1>");
      var total = $("<h3>");
      var learning = $("<h4>");
      var mastered = $("<h4>");
      learning.append("Learning: " + learnCount);
      var lWords = $("<div>");
      var mWords = $("<div>");
      for (var i = 0; i < data.length; i++) {
        if (data[i].MASTERED)
          mWords.append("<p>" + data[i].WORD + "</p>");
        else
          lWords.append("<p>" + data[i].WORD + "</p>");
      }
      mastered.append("Mastered: " + masteredCount);
      total.append("Total number of words: " + data.length);
      heading.append("STATUS");
      // var list = $("<ol>");
      // for (var i = 0; i < data.length; i++) {
      //   if (data[i].MASTERED)
      //     list.append("<li>" + data[i].WORD + "</li>");
      //   else
      //     list.append("<li>" + data[i].WORD + "</li>");
      // }
      // var name = $("<h1>");
      // name.append(learnersName);
      $("#modal").modal();
      $("#text").empty();
      // $("#text").append(name);
      $("#text").append(heading);
      $("#text").append(total);
      $("#text").append(learning);
      $("#text").append(lWords);
      $("#text").append(mastered);
      $("#text").append(mWords);
      $("#text").append(list);
    }
    else {
      $("#modal").modal();
      $("#text").text("There is no such learner");
    }
    $("#input-learner").val("");
  })

  // }
})


