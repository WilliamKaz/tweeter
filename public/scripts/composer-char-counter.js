$(document).ready(function() {
  // --- our code goes here ---

  $('.new-tweet textarea').on('keyup ' , function(){
    var lengthCount = 140 - this.value.length;
    if (lengthCount < 0){
      $('.counter').css('color', 'red');
      $('.counter').html(  `${lengthCount} `);
    } else {
      //
      $('.counter').css('color', 'black');
       $('.counter').html(lengthCount);

    }
  })
});


