// var intervalTiming = 5000; //represents milliseconds
var indexPerson = 0;
var phirehouseArray = [];

$(document).ready(function(){

  // Upon page load, get the data from the server
  $.ajax({
    type: "GET",
    url: "/data",
    success: function(data){
      // yay! we have data!
      console.log('returned data from server: ', data);
      //add and display
      phirehouseArray = data.phirephiters;
      init();
    }
  });
});

function init() {
  addButons();
  addPerson(phirehouseArray[indexPerson]);
  $('#nextButton').on('click', nextClicked);
  $('#prevButton').on('click', prevClicked);
  createIndexCarousel(phirehouseArray);

}

function addPerson(person) {
  $('#dataDisplay').append('<div class="person"></div>');
  var $el = $('#dataDisplay').children().last();
  $el.append('<h2>' + person.name + '</h2>');
  $el.append('<h3>' + person.git_username + '</h3>');
  $el.append('<p>"' + person.shoutout + '"</p>');
}

function addButons() {
  $('#dataDisplay').append('<button id="prevButton">Prev</button>');
  $('#dataDisplay').append('<button id="nextButton">Next</button>');
}

function nextClicked() {
  $('.person').remove();
  indexPerson++;
  indexPerson >= phirehouseArray.length && (indexPerson = 0);
  addPerson(phirehouseArray[indexPerson]);
}

function prevClicked() {
  $('.person').remove();
  indexPerson--;
  indexPerson < 0 && (indexPerson = phirehouseArray.length - 1);
  addPerson(phirehouseArray[indexPerson]);
}

function createIndexCarousel(array) {
  for (var n = 0; n < array.length; n++) {
    console.log('carousel generated');
    $('#indexCarousel').append('<div class="index-point" id="index' + n +'"><div>');
  }
}

// tried to create a function that would allow index navigation as well as to bridge both ends
// but it was not working so I chose another route.
function recycleIndex(num, array) {
  if(num >= array.length){
    num = 0;
  }else if (num < 0) {
    num = (array.length - 1);
  }
  return num;
}
