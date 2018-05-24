const ReadLine = require('readline');
const DiscordClient = require('./Client/DiscordClient');
const CommandMgr = require('./Core/CommandMgr');
const ConfigMgr = require('./Core/ConfigMgr');
const CharactersDatabase = require('./Database/CharactersDatabase');

/**
 * Defines the bot
 * @class ExecutusBot
 */
class ExecutusBot {
    /**
     * Creates an instance of ExecutusBot.
     * @memberof ExecutusBot
     */
    constructor() {
        this.commandMgr = new CommandMgr();
        this.chatClient = null;
        this.cli = null;
        this.db = {};
        this.config = new ConfigMgr();
    }

    /**
     * Loads the bot's components and establishes the connection with Discord
     * @memberof ExecutusBot
     */
    async run() {
        // Register the bot as global
        global.ExecutusBot || (global.ExecutusBot = this);

        // Load configs
        try {
            this.config.loadConfig('bot', './conf/bot.conf.json');
            this.config.loadConfig('discord', './conf/discord.conf.json');
            this.config.loadConfig('database', './conf/database.conf.json');
        } catch (ex) {
            console.error(ex);
            this.shutdown();
        }

        // Load texts
        Lang.setLocale(this.config.getValue('bot.lang'));

        // Create CLI
        this.cli = ReadLine.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        // Load database wrappers
        this.db['Characters'] = new CharactersDatabase();

        // Load Commands
        this.commandMgr.loadCommands();

        // Create Discord client
        this.chatClient = new DiscordClient(this.config.getValue('discord.token'));
        await this.chatClient.login()
            .then((res) => {
                this.chatClient.registerHandler('message', (message) => {
                    this.commandMgr.handleMessage(message);
                });
                this.chatClient.sendMessage(null, Lang._('bot.hello'));

                this.cli.question(Lang._('cli.ready'), (input) => {
                    switch (input.toLowerCase()) {
                        case 'exit':
                            this.shutdown();
                            break;
                        case 'help':
                        default:
                            console.info('Help: Type "exit" to stop the bot');
                    }
                });
            })
            .catch((err) => {
                console.error(err.message, '. Shutting down...');
                this.shutdown();
            });
    }
    /**
     * Closes active connections and terminates the bot's process
     * @memberof ExecutusBot
     */
    shutdown() {
        console.log(Lang._('cli.shutdown'));
        if (global.ExecutusBot) {
            global.ExecutusBot = undefined;
            delete global.ExecutusBot;
        }
        this.chatClient.logout();
        this.cli.close();
        process.exit(1);
    }
}

module.exports = ExecutusBot;
