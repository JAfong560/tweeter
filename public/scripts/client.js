/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
    // --- our code goes here ---
    // Render tweets to tweets-container
    const renderTweets = function(data) {
      $('#tweets-container').empty();
      data.forEach( (tweet) => {
        console.log("Here is my tweet", tweet);        
        $('#tweets-container').prepend(createTweetElement(tweet));
      })
    };
    
    const renderLastTweets = function(data) {
      $('#tweets-container').empty();
      
        console.log("Here is my tweet", data);        
        $('#tweets-container').prepend(createTweetElement(data));
      
    };
    
    // Create tweet HTML based on data
    const createTweetElement = function(tweetData) {
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

    const $tweetdiv = $("<div>").addClass("tweet_box");
    $tweetdiv.append($tweetData);

    return $tweetdiv;
    };

    const checkCharLeft = function (currentChar, maxChar) {
      if (currentChar <= maxChar) {
        return true;
      }
    }

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
        if(($('textarea', this).val()) && checkCharLeft($('textarea', this).val().length, 140)){
          errorBox.slideUp("slow");
          $.ajax({
            type: "POST",
            url: '/new_tweets',
            data: serialData,
          }).done(function(response){
            $('#tweet-text').val("");
            $('.counter').val("140");
            console.log("Tweets are reloading", response);
            loadLastTweets();
          });
        };
    });

    $(".toggle-tweet").on('click', function() {
      $("#compose-tweet").slideToggle("slow");
    });

    // Use AJAX to get data and render tweets
    const loadTweets = function() {
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

    // Use AJAX to get data and render latest tweet
    const loadLastTweets = function() {
      $.ajax({
        type: 'GET',
        url: "/new_tweets",
        dataType: 'JSON'
      })
      .done( data => {
        console.log(data);
          renderLastTweets(data)
      });
    };

    loadTweets();
});