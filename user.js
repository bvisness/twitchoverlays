// Put your general user code in this file.
// 
// Provide a processMessage() function and it will be called every time someone
// sends a message in Twitch chat. Use the say() function to send a message to
// the Twitch chat.
// 
// Full API description at the bottom of the file. Other useful stuff can be
// found in the "extras" folder - read the source to learn more.


// This function will be called every time someone in the chat sends a message.
function processMessage(message) {
    // Everything in this command is an example. You can replace it with
    // whatever you like.

    if (message === 'HeyGuys') {
        say('HeyGuys');
        return;
    }

    if (
        message.match(/what is.*editor/i)
        || message.match(/what editor is/i)
        || message.match(/(is this|using) (emacs|vi(m)?|neovide)/i)
    ) {
        say('This is 4coder, with my own custom layer.');
        return;
    }

    // Optional: process structured commands. (See commands.js.)
    if (doCommands(message, [
        {
            name: '!text',
            func: () => {
                say('Text is a bad format for programming languages. I will "Dion" this hill.');
            },
        },
        {
            name: '!editor',
            aliases: ['!4coder'],
            func: () => {
                say('I am using 4coder, with my own custom layer.');
            },
        },
        {
            name: '!metadesk',
            func: () => {
                say('Metadesk is a simple data description language + a parser library. The language lets you create simple structures and define their meaning with your own code. https://dion.systems/metadesk.html');
            },
        },
        {
            name: '!8ball',
            func: () => {
                say(eightBall());
            },
        },
        {
            name: '!processing',
            func: () => {
                triggerMathMeme();
            },
        },
    ])) {
        return;
    }
}

// You can also just run code outside of processMessage. For example, uncomment
// the following code to send a message every five minutes:

// setInterval(() => {
//     say('sign up, nerds https://www.handmade-seattle.com/#tickets');
// }, 1000 * 60 * 5);


// ================================= API Docs =================================
// 
// == Stuff you can use ==
// 
// say(text: string): void
// 
//     Sends the given text to Twitch chat. If there is no active connection to
//     Twitch chat, say will be a no-op.
// 
// == Stuff you can implement ==
// 
// processMessage(messageText: string): void
// 
//     If implemented, this will be called every time someone sends a message
//     in Twitch chat. Only messages from other users appear here; messages
//     from the bot user are ignored.
//
