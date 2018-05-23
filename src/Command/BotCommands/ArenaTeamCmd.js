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
            ExecutusBot.chatClient.sendMessage(req.channel, ExecutusBot.lang.text('error.missing_name'));
            return;
        }

        ExecutusBot.db.Characters.getArenaTeamByName(req.args.join(' '))
            .then((ateam) => {
                let embed = new Discord.RichEmbed();
                embed.setTitle(ateam.name);
                embed.addField(ExecutusBot.lang.text('common.arenaTeamType'), ateam.type);
                embed.addField(ExecutusBot.lang.text('common.seasonGames'), ateam.seasonGames, true);
                embed.addField(ExecutusBot.lang.text('common.seasonWins'), ateam.seasonWins, true);
                embed.addBlankField();
                embed.addField(ExecutusBot.lang.text('common.captain'), ateam.captain, true);
                let members = '';
                ateam.members.forEach((m) => {
                    return members += `- ${m.name} (${m.race} ${m.class})\r\n`;
                });
                embed.addField(ExecutusBot.lang.text('common.members'), members, true);

                ExecutusBot.chatClient.sendRichMessage(req.channel, embed);
            })
            .catch((err) => {
                console.log(err.message);
                ExecutusBot.chatClient.sendMessage(req.channel, ExecutusBot.lang.text('error.not_found'));
            });
    }
}

module.exports = ArenaTeamCmd;
