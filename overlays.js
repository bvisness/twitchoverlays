function startBot() {
    if (!twitchToken) {
        throw new Error("No token!");
    }

    const ws = new WebSocket('wss://irc-ws.chat.twitch.tv:443');
    function send(msg) {
        ws.send(`PRIVMSG #bvisness :${msg}`);
    }

    ws.onopen = event => {
        ws.send(`PASS oauth:${twitchToken}`);
        ws.send(`NICK benkinsci`);
        ws.send('JOIN #bvisness')
        // send('Hello, world!');
    };
    ws.onerror = event => {
        console.error('failed to connect to Twitch', event.data);
    };

    const msgDelimiter = 'PRIVMSG #bvisness :';

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
                lastMathMemeCommandTime = performance.now();
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
