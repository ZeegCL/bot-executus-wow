const ChatCommand = require('../Command');
const Discord = require('discord.js');

/**
 * Gets info from in-game arena teams
 * @class ArenaTeamCmd
 * @extends {ChatCommand}
 */
class ArenaTeamCmd extends ChatCommand {
    /**
     * Creates an instance of ArenaTeamCmd.
     * @memberof ArenaTeamCmd
     */
    constructor() {
        super('ateam');
    }

    /**
     * Executes command's logic
     * @param {any} req
     * @memberof ArenaTeamCmd
     */
    execute(req) {
        if (req.args.length == 0) {
            ExecutusBot.chatClient.sendMessage(req.channel, ExecutusBot.lang.cmd.ateam.missing_name);
        }

        ExecutusBot.db.Characters.getArenaTeamByName(req.args.join(' '))
            .then((ateam) => {
                let embed = new Discord.RichEmbed();
                embed.setTitle(ateam.name);
                embed.addField(ExecutusBot.lang.wow.arenaTeamType, ateam.type);
                embed.addField(ExecutusBot.lang.wow.seasonGames, ateam.seasonGames, true);
                embed.addField(ExecutusBot.lang.wow.seasonWins, ateam.seasonWins, true);
                embed.addField(ExecutusBot.lang.wow.captain, ateam.captain);
                let members = '';
                ateam.members.forEach((m) => {
                    return members += `- ${m.name} (${m.race} ${m.class})\r\n`;
                });
                embed.addField(ExecutusBot.lang.wow.members, members);

                ExecutusBot.chatClient.sendRichMessage(req.channel, embed);
            })
            .catch((err) => {
                console.log(err.message);
                ExecutusBot.chatClient.sendMessage(req.channel, ExecutusBot.lang.cmd.ateam.not_found);
            });
    }
}

module.exports = ArenaTeamCmd;
