# Ben's Dumb Twitch Overlay And Chat Bot

it is very good and useful

## How

Get a valid chat token from [this page](https://twitchapps.com/tmi/).

Then make a file called `config.js` with the following contents (replacing values as necessary):

```js
const TWITCH_TOKEN = 'oauth:blahblahyourtoken';
const BOT_NICKNAME = 'benkinsci'; // Must be your Twitch username, all lowercase.
const CHAT_CHANNEL = 'bvisness'; // The bot will join this Twitch channel's chat to listen for messages.
```

Open index.html in a browser for testing, or add the local index.html file as a Browser source in OBS to use as an overlay.

Edit the contents of [`user.js`](user.js) to customize the bot's behavior. It has all kinds of examples to get you started.

## What it do

Fundamentally it is very simple: `processMessage` will run on every chat message, and you can call `say` at any time to send a message back.

```js
// wow, rude
function processMessage(message) {
    say(`Look at this idiot, spouting nonsense like "${message}"`);
}
```

Do whatever logic you like. No rules.

There are also some (un)helpful extras provided in the `extras` folder, such as:

- A utility to handle commands like `!editor` or `!joke`
- A magic eight ball
- A meme

Peruse the `extras` folder at your leisure to see all the nonsense for yourself.
