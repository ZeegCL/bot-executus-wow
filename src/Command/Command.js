/**
 * Represents a chat command
 * @class ChatCommand
 */
class ChatCommand {
    /**
     * Creates an instance of ChatCommand.
     * @param {any} name
     * @memberof ChatCommand
     */
    constructor(name) {
        this.trigger = name;
    }

    /**
     * Executes the command's logic
     * @memberof ChatCommand
     */
    execute() {
        throw new {message: 'Command not yet implemented'};
    }
}

module.exports = ChatCommand;
