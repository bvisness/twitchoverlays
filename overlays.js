function startBot() {
    if (!(typeof TWITCH_TOKEN !== 'undefined' && TWITCH_TOKEN)) {
        console.warn('No TWITCH_TOKEN was provided, so we cannot connect to chat.');
        return;
    }

    const ws = new WebSocket('wss://irc-ws.chat.twitch.tv:443');
    function send(msg) {
        ws.send(`PRIVMSG #${CHAT_CHANNEL} :${msg}`);
    }

    ws.onopen = event => {
        ws.send(`PASS ${TWITCH_TOKEN}`);
        ws.send(`NICK ${BOT_NICKNAME}`);
        ws.send(`JOIN #${CHAT_CHANNEL}`)
        // send('Hello, world!');
    };
    ws.onerror = event => {
        console.error('failed to connect to Twitch', event.data);
    };

    const msgDelimiter = `PRIVMSG #${CHAT_CHANNEL} :`;

    ws.onmessage = event => {
        const msg = event.data;
        console.log(event.data);

        let messageText = '';

        const msgIndex = msg.indexOf(msgDelimiter);
        if (msgIndex > 0) {
            messageText = msg.slice(msgIndex + msgDelimiter.length).trim();
        } else {
            return;
        }

        switch (messageText) {
            case '!processing': {
                triggerMathMeme();
            } break;
        }
    }
}
startBot();

// Manage canvas resolutions
function resizeCanvases() {
    const canvases = document.querySelectorAll('canvas');
    for (const canvas of canvases) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
}
resizeCanvases();
window.addEventListener('resize', () => resizeCanvases());
