$(document).ready(function() {
  // --- our code goes here ---
    
  const charLimit = 140;
  // target the area on the DOM with jQuery
  // turn counter red after character limit
  $("#tweet-text").on('keyup', function(e) {
    let tweetlength = e.target.value.length;
    //console.log(tweetlength);
    $(".counter").text(charLimit - tweetlength + ' char left');
    if (tweetlength > charLimit) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }
    //console.log(this);
  });
});