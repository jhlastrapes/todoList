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
var steam1 = document.getElementById("steam1");
var steam2 = document.getElementById("steam2");



// creates new to-dos
$("input[type='text']").keydown(function(event){
  // conditional for the "enter" button
  if(event.which === 13){
    if (document.getElementById("todoInput").value.length > 0){ // changed from textLength to value.length due to chrome and safari browser support
      // remove any previous event listeners for checkmark
      $(".check").off();
      // grabs whatever is in the text box
      var inputEnter = $('input').val();
      // creates a new li
      $(".uls").append("<li class='lis'><div class='liText' title='Click to edit' contentEditable='true' draggable='true'> - " + inputEnter + "</div><span class='trash' title='remove'><i class='trashButton far fa-trash-alt'></i></span><span class='check' title='mark as complete (toggle)'><i class='checkButton fas fa-check'></span></li>");
      // adds "completed" and x button functionality to new li
      completed();
      xButton();
      // $("li").off(); ... event remover no longer needed thanks to ".on" change
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

// removes enter functionality when editing future lis
function noEnter(){
  $('ul').on("click", '.liText', function(){
    var thisLi = $(this);
    $('ul').keydown(function(event){
      if(event.which === 13){
        event.preventDefault();
        thisLi.blur();
        return false;
      };
    });
  });
};
noEnter();


// Check off specific todos by clicking checkmark
function completed(){
  $(".check").click(function(e){
    // add completed class
    $(this).parent().toggleClass("completed");
    // complement animation
    if ($(this).parent().hasClass("completed")){
      // keep track of completed lis
      trackCompleted();
      // completed list compliment
      if (liClassCount === lis.length){
        checkedAnimation("All done. Congrats!");
      }
      // incomplete list compliments
      else {
        checkedAnimation(randomInt(compliments));
      };
    }
    else {
    };
    e.stopPropagation();
  });
};


// removes lis on trash click
function xButton(){
  $(".trash").click(function(e){
    console.log($(this));
    $(this).parent().fadeOut(500, function(){
      $(this).remove(); // this refers to the parent. Removes the li.
    });
    e.stopPropagation(); // stops the event listener from bubbling up to the parent elements when clicked
  });
};

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
  // make text and wrapper visible
  $(".ml2").css("opacity", "0.8");
  $("#compWrapper").css("display", "inherit");
  // run animation function
  compliment();
};



// steam animation
var t = 8000; // time of animation loop in milliseconds

function steamAnimation(steamNum){
  steamNum.style.transition = ("height linear " + ((t)/1000) + "s, opacity linear " + ((t/2)/1000) + "s");
  steamNum.style.webkitTransition = ("height linear " + ((t)/1000) + "s, opacity linear " + ((t/2)/1000) + "s");
  steamNum.style.opacity = "0.9";
  steamNum.style.height = "55vh";
  setTimeout(function(){
    steamNum.style.opacity = "0.0";
  }, ((t/2)-100));
  setTimeout(function(){
    steamNum.style.transition = ("height linear 0.0s, opacity linear " + ((t/2)/1000) + "s");
    steamNum.style.webkitTransition = ("height linear 0.0s, opacity linear " + ((t/2)/1000) + "s");
    steamNum.style.height = "42vh";
  }, (t-100));
};

steamAnimation(steam1); // initial steam effect (to solve setInterval delay issue)
setTimeout(function(){ // secondary steam effect offset by 1/2
  steamAnimation(steam2);
}, (t/2));

// steam delay function
function steamDelay(steamNum, Toffset){
  setTimeout(function(){
    setInterval(function(){
      steamAnimation(steamNum);
    }, t);
  }, Toffset);
};

steamDelay(steam1, 0); // 1st steam loop iteration
steamDelay(steam2, 4000); // 2nd steam loop iteration offset by 1/2


// random array  generator with any array length 
function randomInt(array){
  function randomIntInit(arg){
    var ranInt = Math.floor(Math.random()*(arg.length));  // sets ranInt to random number from 0 to 17 (length of gradients array)
    return ranInt;
  };
  return array[randomIntInit(array)]
};

