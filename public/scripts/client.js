/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
    // --- our code goes here ---
    console.log(timeago.format(new Date()));
    // Test / driver code (temporary). Eventually will get this from the server.
    const data = [
        {
          "user": {
            "name": "Newton",
            "avatars": "https://i.imgur.com/73hZDYK.png"
            ,
            "handle": "@SirIsaac"
          },
          "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
          },
          "created_at": 1461116232227
        },
        {
          "user": {
            "name": "Descartes",
            "avatars": "https://i.imgur.com/nlhLi3I.png",
            "handle": "@rd" },
          "content": {
            "text": "Je pense , donc je suis"
          },
          "created_at": 1461113959088
        }
      ]
    
    function renderTweets(data) {
      $('#tweets-container').empty();
      data.forEach( (tweet) => {
        console.log("Here is my tweet",tweet);
        $('#tweets-container').prepend(createTweetElement(tweet));
      })
    }

    function createTweetElement(tweetData) {
    const tweet = tweetData.content.text;
    const name = tweetData.user.name;
    const avatarsImg = tweetData.user.avatars.small;
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
    const $header = $("<header>");
    const $footer = $("<footer>");
    const $content = $("<div>").addClass("content");
    const $dateOfTweet = $("<h6>").text(timeago.format(tweetData['created_at']));

    $iconContainer.append($flag, $retweet, $heart);
    $header.append($createAvatar, $createName, $createHandle);
    $content.append($createTweet);
    $footer.append($iconContainer, $dateOfTweet);
    $tweetData.append($header, $content, $footer);


    return $tweetData;
    }

    const $tweet = renderTweets(data);

    $( "form" ).submit(function( event ) {
        //alert( "Handler for .submit() called." );
        event.preventDefault();
        let serialData = $( this ).serialize();
        console.log( serialData );
        if($(".counter")[0].value > 140) {
            $('#error-message').text('Error : Too many characters')
        }
        if(($('textarea', this).val()) && ($('textarea', this).val().length < 140)){
          $(".error").slideUp("slow");
          $.ajax({
            type: "POST",
            url: '/tweets/',
            data: serialData,
          }).done(function(response){
            console.log("Tweets are reloading", response);
            loadTweets();
          })
        }
    });

    function loadTweets () {
        $.ajax({
          type: 'GET',
          url: "/tweets",
          dataType: 'JSON'
        })
        .done( data => {
          console.log(data);
            renderTweets(data)
        })
      }
    loadTweets()

      
});