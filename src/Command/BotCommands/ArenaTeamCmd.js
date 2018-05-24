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
            ExecutusBot.chatClient.sendMessage(req.channel, Lang._('error.missing_name'));
            return;
        }

        ExecutusBot.db.Characters.getArenaTeamByName(req.args.join(' '))
            .then((ateam) => {
                let embed = new Discord.RichEmbed();
                embed.setTitle(ateam.name);
                embed.addField(Lang._('common.arenaTeamType'), ateam.type);
                embed.addField(Lang._('common.seasonGames'), ateam.seasonGames, true);
                embed.addField(Lang._('common.seasonWins'), ateam.seasonWins, true);
                embed.addBlankField();
                embed.addField(Lang._('common.captain'), ateam.captain, true);
                let members = '';
                ateam.members.forEach((m) => {
                    return members += `- ${m.name} (${m.race} ${m.class})\r\n`;
                });
                embed.addField(Lang._('common.members'), members, true);

                ExecutusBot.chatClient.sendRichMessage(req.channel, embed);
            })
            .catch((err) => {
                console.log(err.message);
                ExecutusBot.chatClient.sendMessage(req.channel, Lang._('error.not_found'));
            });
    }
}

module.exports = ArenaTeamCmd;
