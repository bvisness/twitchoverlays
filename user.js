/*
Put your general user code in this file.

Provide a processMessage() function and it will be called every time someone
sends a message in Twitch chat. Use the say() function to send a message to
the Twitch chat.

Full API description at the bottom of the file.
*/

// This message will be called every time someone in the chat sends a message.
function processMessage(message) {
    // Example command processing - you can replace this with whatever you like.
    switch (message) {
        case '!processing': {
            triggerMathMeme();
        } break;
        case '!why': {
            say('because handmade lol');
        } break;
        case '!who':
        case '!whomst': {
            say('me');
        } break;
        case '!when':
        case '!whenst': {
            say('now');
        } break;
        case '!commands': {
            say('mY cOdE iS sElF dOcUmEnTiNg');
            say('https://github.com/bvisness/twitchoverlays/blob/main/overlays.js');
        } break;
    }
}

// Example of a periodic message
setInterval(() => {
    say('sign up, nerds https://www.handmade-seattle.com/#tickets');
}, 5 * 60 * 1000);

/*
================================== API Docs ==================================

== Stuff you can use ==

say(text: string): void

    Sends the given text to Twitch chat. If there is no active connection to
    Twitch chat, say will be a no-op.

== Stuff you can implement ==

processMessage(messageText: string): void

    If implemented, this will be called every time someone sends a message in
    Twitch chat. Only messages from other users appear here; messages from the
    bot user are ignored.

*/
