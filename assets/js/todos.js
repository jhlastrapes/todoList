/*eslint-disable*/

// Check off specific todos by clicking
function completed(){
  $("ul").on("click", ".lis", function(){
    $(this).toggleClass("completed");
  });
};
completed();

// removes lis on X click
function xButton(){
  $(".trash").click(function(e){
    $(this).parent().fadeOut(500, function(){
      $(this).remove(); // this refers to the parent. Removes the li.
    });
    e.stopPropagation(); // stops the event listener from bubbling up to the parent elements when clicked
  });
};

// creates new to-dos
$("input[type='text']").keyup(function(event){
  // conditional for the "enter" button
  if(event.which === 13){
    // grabs whatever is in the text box
    var inputEnter = $('input').val();
    // creates a new li
    $("ul").append("<li class='lis'><span class='trash'><i class='far fa-trash-alt'></i></span> " + inputEnter + "</li>");
    // adds "completed" and x button functionality to new li
    xButton();
    // $("li").off(); ... no longer needed thanks to ".on" change
    // completed();
    // clears input
    this.value = "";
  };
});

// adds minimize button functionality
$("#plus").on("click", function(e){
  $("input").slideToggle();
});