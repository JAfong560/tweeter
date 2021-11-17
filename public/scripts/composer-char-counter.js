$(document).ready(function() {
    // --- our code goes here ---
    $("#btn").on('click', function() {
        console.log(this); //The this keyword is a reference to the button
    });

    // target the area on the DOM with jQuery
    const textarea = $("#tweet-text")
    const textstring = textarea[0];
    const output = $(".counter");
    
    console.log(textarea);
    console.log(textstring);
    console.log(output);

    textarea.on('keyup', function () {
        console.log(textstring.value);
        let tweetText = textstring.value
        let counter = output[0];
        console.log(tweetText.length);
        counter.value = tweetText.length;
    });
});