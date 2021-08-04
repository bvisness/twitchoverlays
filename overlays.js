function startBot() {
    if (!(typeof TWITCH_TOKEN !== 'undefined' && TWITCH_TOKEN)) {
        console.warn('No TWITCH_TOKEN was provided, so we cannot connect to chat.');
        return;
    }

    let ws = null;
    function send(msg) {
        if (msg.includes('PASS')) {
            console.log('< ******* message redacted *******');
        } else {
            console.log('< ' + msg);
        }
        ws.send(msg);
    }
    function say(text) {
        send(`PRIVMSG #${CHAT_CHANNEL} :${text}`);
    }

    let backoffSeconds = 1;
    function connect() {
        ws = new WebSocket('wss://irc-ws.chat.twitch.tv:443');
        ws.onopen = event => {
            backoffSeconds = 1;
            // send(`CAP REQ :twitch.tv/tags`);
            // send(`CAP REQ :twitch.tv/commands`);
            send(`PASS ${TWITCH_TOKEN}`);
            send(`NICK ${BOT_NICKNAME}`);
            send(`JOIN #${CHAT_CHANNEL}`)

            window.showToast('ircsuccess');
        };
        ws.onmessage = event => {
            const msgs = event.data.split('\r\n');
            for (const msg of msgs) {
                if (!msg.trim()) {
                    continue;
                }

                handleMessage(msg);
            }
        }
        ws.onerror = event => {
            console.error('failed to connect to Twitch', event.data);
        };

        ws.onclose = event => {
            console.warn(`websocket connection closed - trying again in ${backoffSeconds} seconds`);
            setTimeout(connect, backoffSeconds * 1000);
            backoffSeconds = Math.min(backoffSeconds * 2, 30);
            window.showToast('ircdisconnect', 9999999);
        };
    }
    connect();

    const msgDelimiter = `PRIVMSG #${CHAT_CHANNEL} :`;

    function handleMessage(msg) {
        console.log('> ' + msg);

        if (msg === 'PING :tmi.twitch.tv') {
            send(`PONG :tmi.twitch.tv`);
            return;
        }

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
