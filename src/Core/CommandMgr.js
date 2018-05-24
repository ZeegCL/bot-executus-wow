const CommandRequest = require('../Command/CommandRequest');
/**
 * Handles the loading and execution of commands
 * @class CommandMgr
 */
class CommandMgr {
    /**
     * Creates an instance of CommandMgr.
     * @memberof CommandMgr
     */
    constructor() {
        this.commands = {};
        this.cmdLabels = [];
    }

    /**
     * Loads command scripts from folder
     * @memberof CommandMgr
     */
    loadCommands() {
        let path = require('path').join(__dirname, '../Command/BotCommands/');
        console.log('Loading commands from:', path);

        require('fs').readdirSync(path).forEach((file) => {
            let Cmd = require('../Command/BotCommands/' + file);
            let instance = new Cmd();
            this.commands[instance.trigger] = (instance);
        });
        console.log('Commands list:', Object.keys(this.commands));
        this.cmdLabels = Object.keys(this.commands);
    }

    /**
     * Handles Discord messages
     * @param {any} message
     * @memberof CommandMgr
     */
    handleMessage(message) {
        if (message.author.id === ExecutusBot.chatClient.getClientId()) return;

        if (_isCommand(message.content)) {
            this.parseCommand(message);
        }
    }

    /**
     * Transfroms a Discord message into a CommandRequest
     * @param {any} message
     * @memberof CommandMgr
     */
    parseCommand(message) {
        let request = new CommandRequest(message);
        message.delete(ExecutusBot.config.getValue('discord.message_timeout', 10) * 1000);
        console.log('Handling call to command:', request.commandLabel);

        if (request.commandLabel === 'help') {
            let cmdLabel = request.args[0];
            if (cmdLabel != undefined && this.cmdLabels.includes(cmdLabel)) {
                request.channel.send(this.commands[cmdLabel].usage());
            } else {
                let cmdList = `**Current commands:** help, ` + this.cmdLabels.join(', ');
                request.channel.send(cmdList);
            }

            return;
        }

        if (this.cmdLabels.includes(request.commandLabel)) {
            this.commands[request.commandLabel].execute(request);
        }
    }
}

/**
 * Checks if the message content is a valid command
 * @param {any} text
 * @return {boolean}
 */
function _isCommand(text) {
    let cmdRegex = new RegExp(`^${ExecutusBot.config.getValue('discord.prefix')}([A-za-z]+)(\\s*.*)*`);
    return cmdRegex.test(text);
}

module.exports = CommandMgr;
