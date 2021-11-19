/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
    // --- our code goes here ---
    // Render tweets to tweets-container
    function renderTweets(data) {
      $('#tweets-container').empty();
      data.forEach( (tweet) => {
        console.log("Here is my tweet",tweet);
        $('#tweets-container').prepend(createTweetElement(tweet));
      })
    };

    // Create tweet HTML based on data
    function createTweetElement(tweetData) {
    const tweet = tweetData.content.text;
    const name = tweetData.user.name;
    const avatarsImg = tweetData.user.avatars;
    const tweeHandle = tweetData.user.handle;

    const $createAvatar = $('<img>').addClass("avatar").attr("src",avatarsImg);
    const $createName = $('<div>').addClass("tweeterName").text(name);
    const $createTweet = $('<div>').addClass("tweeBody").text(tweet);
    const $createHandle = $('<p>').addClass("userTwee").text(tweeHandle);

    const $iconContainer = $("<div>").addClass("icons");
    const $flag = $("<i>").addClass("fas fa-flag");
    const $retweet = $("<i>").addClass("fas fa-retweet");
    const $heart = $("<i>").addClass("fas fa-heart");

    const $tweetData = $("<article>").addClass("tweet");
    const $header = $("<header>").addClass("tweetHeader");
    const $footer = $("<footer>").addClass("tweetFooter");
    const $content = $("<div>").addClass("content");
    // Use timeago to format time
    const $dateOfTweet = $("<h6>").text(timeago.format(tweetData['created_at']));

    $iconContainer.append($flag, $retweet, $heart);
    $header.append($createAvatar, $createName, $createHandle);
    $content.append($createTweet);
    $footer.append($iconContainer, $dateOfTweet);
    $tweetData.append($header, $content, $footer);

    return $tweetData;
    };

    $("form").submit(function( event ) {
        //alert( "Handler for .submit() called." );
        event.preventDefault();
        let serialData = $( this ).serialize();
        console.log($('textarea', this).val());
        //console.log( serialData );
        //console.log($('#error-message'), this)
        let errorBox = $(".error");

        if (!$('textarea', this).val()) {
          console.log('sliiiddde');
          errorBox.slideDown("slow");
          $('#error-message').text('Error : Please write something')
        }
        if($('textarea', this).val().length > 140) {
          errorBox.slideDown("slow");
          $('#error-message').text('Error : Too many characters')
        }
        if(($('textarea', this).val()) && ($('textarea', this).val().length <= 140)){
          errorBox.slideUp("slow");
          $.ajax({
            type: "POST",
            url: '/tweets/',
            data: serialData,
          }).done(function(response){
            console.log("Tweets are reloading", response);
            loadTweets();
          });
        };
    });

    $(".toggle-tweet").on('click', function() {
      $("#compose-tweet").slideToggle("slow");
    });

    // Use AJAX to get data and render tweets
    function loadTweets () {
      $.ajax({
        type: 'GET',
        url: "/tweets",
        dataType: 'JSON'
      })
      .done( data => {
        console.log(data);
          renderTweets(data)
      });
    };

    loadTweets();
});