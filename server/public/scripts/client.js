var intervalTiming = 7000; //represents milliseconds
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
  updateCarouselPoint(phirehouseArray);
  setInterval(nextClicked, intervalTiming);
}

function addPerson(person) {
  $('#dataDisplay').append('<div class="person"></div>').hide().fadeIn();
  var $el = $('#dataDisplay').children().last();
  $el.append('<h2>' + person.name + '</h2>');
  $el.append('<h3>' + person.git_username + '</h3>');
  $el.append('<h3>"' + person.shoutout + '"</h3>');
}

function addButons() {
  $('#dataDisplay').append('<button id="prevButton">Prev</button>');
  $('#dataDisplay').append('<button id="nextButton">Next</button>');
}

function nextClicked() {
  $('.person').fadeOut(700);
  $('.person').remove();
  indexPerson++;
  indexPerson >= phirehouseArray.length && (indexPerson = 0);
  updateCarouselPoint();
  addPerson(phirehouseArray[indexPerson]).fadeIn();
}

function prevClicked() {
  $('.person').fadeOut(700);
  $('.person').remove();
  indexPerson--;
  indexPerson < 0 && (indexPerson = phirehouseArray.length - 1);
  updateCarouselPoint();
  addPerson(phirehouseArray[indexPerson]).fadeIn();
}

function createIndexCarousel(array) {
  for (var i = 0; i < array.length; i++) {
    $('#indexCarousel').append('<div class="index-point" id="index' + i +'"></div>');
  }
}

function updateCarouselPoint() {
  for (var i = 0; i < phirehouseArray.length; i++) {
    $('#index' + i).removeClass('current-index-point');
    i == indexPerson && $('#index' + i).addClass('current-index-point');
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
