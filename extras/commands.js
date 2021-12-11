// ================================= API Docs =================================
// 
// doCommands(message: string, commands: Command[]): void
// 
//     Run structured commands. Useful for commands like !editor, !github,
//     !joke, or whatever.
//
//     If the user runs "!help" or "!commands", then the bot will reply with a
//     list of the available commands.
//
//     The structure of a Command is as follows:
//
//         {
//             name: string,        // the name of the command
//             aliases: string[],   // optional; other names for the command
//             func: () => void,    // the function to run for this command
//         }
//


function doCommands(message, commands) {
    if (
        message.startsWith('!help')
        || message.startsWith('!commands')
    ) {
        const names = commands.map(cmd => cmd.name);
        names.sort();
        say(names.join(' '));
        return true;
    }

    for (const cmd of commands) {
        const names = [cmd.name, ...(cmd.aliases || [])];
        for (const name of names) {
            if (message.startsWith(name)) {
                cmd.func(message);
                return true;
            }
        }
    }

    return false;
}
