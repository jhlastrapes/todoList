/*eslint-disable*/

var lis = document.getElementsByClassName("lis");
var icons = document.getElementsByClassName("far");
var spans = document.getElementsByClassName("trash");
var plus = document.getElementById("plus");
var inputSelect = document.getElementsByTagName("input")[0];
var ul = document.getElementsByTagName("ul")[0];

// Check off specific todos by clicking
function addListeners(){
  this.classList.toggle("completed");
}; // named function to meet arg requirements for the "removeEvents" function below
function completed(){
  for(var i = 0; i < lis.length; i++){
    lis[i].addEventListener("click", addListeners);
  };  
};

// removes lis on X click
function xButton(){
  for(var i = 0; i < spans.length; i++){
    spans[i].addEventListener("click", function(event){
      this.parentElement.classList.add("vanillaFade"); // fades element
      var specifyThis = this; // solves "this" for being undefined
      setTimeout(function(){
        specifyThis.parentElement.remove();
      }, 500);
      event.stopPropagation(); // stops event listener from propogating
    });
  };
};

// defines function to create new lis
function addLi(arg){
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(arg));
  li.setAttribute("class", "lis"); // added line
  ul.appendChild(li);
  // adds span inside li
  var span = document.createElement("span");
  span.appendChild(document.createTextNode(""));
  span.setAttribute("class", "trash");
  li.prepend(span);
  // adds icons inside spans
  var i_s = document.createElement("i");
  i_s.appendChild(document.createTextNode(""));
  i_s.setAttribute("class", "far fa-trash-alt");
  span.prepend(i_s);
};

// removes event listeners
function removeEvents(){
  for(var i = 0; i < lis.length; i++){
    lis[i].removeEventListener("click", addListeners);
  };
};

// creates new to-dos
inputSelect.addEventListener("keyup", function(event){
  // conditional for the "enter" button  
  if(event.which === 13){
    // grabs whatever is in the text box
    var input = " " + inputSelect.value;
    // creates a new li
    addLi(input);
    // adds "completed" and x button functionality to new li
    removeEvents();
    completed();
    xButton();
    // clears input
    inputSelect.value = "";
  };
});

// adds minimize button functionality
plus.addEventListener("click", function(){
  inputSelect.classList.toggle("vanillaToggle");
});