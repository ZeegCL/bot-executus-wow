/**
 * Holds information about the requested command
 * @class CommandRequest
 */
class CommandRequest {
    /**
     * Creates an instance of CommandRequest.
     * @param {any} discordMsg
     * @memberof CommandRequest
     */
    constructor(discordMsg) {
        this.channel = discordMsg.channel;
        this.from = discordMsg.author;
        this.text = sanitize(discordMsg.content);
        this.rawText = discordMsg.content;

        let a = this.text.split(' ');
        if (a.length > 0) {
            this.commandLabel = a[0];
            this.args = a.slice(1, a.length);
        }
    }
}

/**
 * Removes unwanted characters
 * @param {any} text
 * @return {string}
 */
function sanitize(text) {
    text = text.replace(/[\,\;\.\:\<\>\/\"\'\!]/gim, '');
    return text.trim();
}

module.exports = CommandRequest;
