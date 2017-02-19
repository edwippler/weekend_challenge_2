// var intervalTiming = 5000; //represents milliseconds

$(document).ready(function(){

    // Upon page load, get the data from the server
    $.ajax({
      type: "GET",
      url: "/data",
      success: function(data){
        // yay! we have data!
        console.log('returned data from server: ', data);
        //add and display
        appendDOM(data.phirephiters[0]); 
      }
    });
});


function appendDOM(person) {
  $('#dataDisplay').append('<div class="person"></div>');
  var $el = $('#dataDisplay').children().last();
  $el.append('<h2>' + person.name + '</h2>');
  $el.append('<h3>' + person.git_username + '</h3>');
  $el.append('<p>"' + person.shoutout + '"</p>');
  }
