// Dumb fun stuff to use in your bot, if you want.


// Get a random item from an array.
function randomItem(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
}

// Return a random magic eight ball phrase.
function eightBall() {
    return randomItem([
        "It is certain.",
        "It is decidedly so.",
        "Without a doubt.",
        "Yes definitely.",
        "You may rely on it.",
        "As I see it, yes.",
        "Most likely.",
        "Outlook good.",
        "Yes.",
        "Signs point to yes.",
        "Reply hazy, try again.",
        "Ask again later.",
        "Better not tell you now.",
        "Cannot predict now.",
        "Concentrate and ask again.",
        "Don't count on it.",
        "My reply is no.",
        "My sources say no.",
        "Outlook not so good.",
        "Very doubtful.",
    ]);
}
