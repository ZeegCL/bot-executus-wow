const Discord = require('discord.js');
const ChatCommand = require('../Command');

/**
 * Gets info from in-game guilds
 * @class GuildCmd
 * @extends {ChatCommand}
 */
class GuildCmd extends ChatCommand {
    /**
     * Creates an instance of GuildCmd.
     * @memberof GuildCmd
     */
    constructor() {
        super('guild');
    }

    /**
     * Executes the command's logic
     * @param {any} req
     * @memberof GuildCmd
     */
    execute(req) {
        if (req.args.length == 0) {
            ExecutusBot.chatClient.sendMessage(req.channel, ExecutusBot.lang.cmd.guild.missing_name);
        }

        ExecutusBot.db.Characters.getGuildByName(req.args.join(' '))
            .then((guild) => {
                let embed = new Discord.RichEmbed();
                embed.setTitle(guild.name);
                embed.addField(ExecutusBot.lang.wow.faction, guild.faction);
                embed.addField(ExecutusBot.lang.wow.created, guild.created.toLocaleDateString());
                embed.addField(ExecutusBot.lang.wow.members, guild.membersCount);
                embed.addField(ExecutusBot.lang.wow.leader, guild.leader);

                ExecutusBot.chatClient.sendRichMessage(req.channel, embed);
            })
            .catch((err) => {
                console.log(err.message);
                ExecutusBot.chatClient.sendMessage(req.channel, ExecutusBot.lang.cmd.guild.not_found);
            });
    }
}

module.exports = GuildCmd;
