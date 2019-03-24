/*eslint-disable*/

var backgroundGradients = [
  "linear-gradient(to right, #E1F5C4, #EDE574)",
  "linear-gradient(to right, #1f4037, #99f2c8)",
  "linear-gradient(to right, #7f7fd5, #86a8e7, #91eae4)",
  "linear-gradient(to right, #ada996, #f2f2f2, #dbdbdb, #eaeaea)",
  "linear-gradient(to right, #e1eec3, #f05053)",
  "linear-gradient(to right, #43c6ac, #f8ffae)",
  "linear-gradient(to right, #a1ffce, #faffd1)",
  "linear-gradient(to right, #8e9eab, #eef2f3)",
  "linear-gradient(to right, #757f9a, #d7dde8)",
  "linear-gradient(to right, #3d7eaa, #ffe47a)",
  "linear-gradient(to right, #cc95c0, #dbd4b4, #7aa1d2)",
  "linear-gradient(to right, #5c258d, #4389a2)",
  "linear-gradient(to right, #e1eec3, #f05053)",
  "linear-gradient(to right, #eeeeee, #a8e063)",
  "linear-gradient(to left, #ffd2c5, #536976, #292e49)",
  "linear-gradient(to right, #544a7d, #ffd452)",
  "linear-gradient(to right, #e0eafc, #cfdef3)",
  "linear-gradient(to right, #ffefba, #ffffff)"
];

var compliments = [
  "Good work!",
  "Awesome!",
  "Nice!",
  "Next one up!",
  "Great job!",
  "Keep going!",
  "Way to go!"
];

var plus = document.getElementById("plus");
var button = document.getElementById("minButton");

// initial background
$("body").css("background", backgroundGradients[randomInt(backgroundGradients)]);
document.getElementsByTagName("body")[0].style.transition = "all ease 1.0s";

// changes background
function changeBG(){
  $("body").css("background", backgroundGradients[randomInt(backgroundGradients)]);
};


// Check off specific todos by clicking
function completed(){
  $("ul").on("click", ".lis", function(){
    // add completed class
    $(this).toggleClass("completed");
    // complement animation
    if ($(this).hasClass("completed")){
      // keep track of completed lis
      trackCompleted();
      // completed list compliment
      if (liClassCount === lis.length){
        checkedAnimation("All done. Congrats!");
      }
      // incomplete list compliments
      else {
        checkedAnimation(compliments[randomInt(compliments)]);
      };
    }
    else {
    };
  });
};
completed();

// removes lis on trash click
function xButton(){
  $(".trash").click(function(e){
    $(this).parent().fadeOut(500, function(){
      $(this).remove(); // this refers to the parent. Removes the li.
    });
    e.stopPropagation(); // stops the event listener from bubbling up to the parent elements when clicked
  });
};

// creates new to-dos
$("input[type='text']").keydown(function(event){
  // conditional for the "enter" button
  if(event.which === 13){
    if (document.getElementById("todoInput").value.length > 0){ // changed from textLength to value.length due to chrome and safari browser support
      // grabs whatever is in the text box
      var inputEnter = $('input').val();
      // creates a new li
      $(".uls").append("<li class='lis'>" + inputEnter + "<span class='trash'><i class='far fa-trash-alt'></i></span></li>");
      // changes background gradient
      changeBG();
      // adds "completed" and x button functionality to new li
      xButton();
      // $("li").off(); ... no longer needed thanks to ".on" change
      // clears input
      this.value = "";
    };
  };
});

// adds minimize button functionality
$("#plus").on("click", function(e){
  $("input").slideToggle();
  $("#minButton").toggleClass("minimized");
  if ($("#minButton").hasClass("minimized")) {
    $("#minButton").html("+");
  } 
  else {
     $("#minButton").html("-");
  };
});

// Compliment animation (wrap every letter in a span)
function compliment(){
  $('.ml2').each(function(){
    $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
  });

  anime.timeline({loop: false})
    .add({
      targets: '.ml2 .letter',
      scale: [4,1],
      opacity: [0,1],
      translateZ: 0,
      easing: "easeOutExpo",
      duration: 150,
      delay: function(el, i) {
        return 40*i; // delay for each new letter in seconds
      }
    }).add({
      targets: '.ml2',
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 350
    });
  setTimeout(function(){
    $("#compWrapper").css("display", "none");
  }, 1500);
};

// keep track of completed lis
function trackCompleted(){
  // count completed lis
  lis = document.getElementsByClassName("lis");
  liClassCount = 0;
  // add to liClassCount if checked
  for(var i = 0; i < lis.length; i++){
    if (lis[i].classList.value === "lis completed") {
      liClassCount++;
    };
  };
};

// animation after checking off li
function checkedAnimation(animationText){
  // select compliment
  $(".ml2")[0].innerHTML = (animationText);
  // change background
  changeBG();
  // make text and wrapper visible
  $(".ml2").css("opacity", "0.6");
  $("#compWrapper").css("display", "inherit");
  // run animation function
  compliment();
};


// random number generator
function randomInt(array){
  var ranInt = Math.floor(Math.random()*(array.length));  // sets ranInt to random number from 0 to 17 (length of gradients array)
  return ranInt;
};