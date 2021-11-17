$(document).ready(function() {
    // --- our code goes here ---

    // target the area on the DOM with jQuery
    const textarea = $("#tweet-text")
    const textstring = textarea[0];
    const output = $(".counter");
    
    console.log(textarea);
    console.log(textstring);
    console.log(output);

    textarea.on('keyup', function () {
        let tweetText = textstring.value
        let counter = output[0];

        if (counter.value > 140) {
            output.css("color", "red");
        }
        if (counter.value < 140) {
            output.css("color", "black");
        }
        
        counter.value = tweetText.length;
    });
});