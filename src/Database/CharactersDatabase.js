const DatabaseClient = require('./DatabaseClient');
const WoWCharacter = require('../Entities/WoWCharacter');
const WoWGuild = require('../Entities/WoWGuild');
const WoWArenaTeam = require('../Entities/WoWArenaTeam');

const queries = {
    GET_CHARACTER_BY_NAME: 'SELECT name, race, class, gender, level FROM characters WHERE name LIKE ?',
    GET_CHARACTER_BY_GUID: 'SELECT name, race, class, gender, level FROM characters WHERE guid = ?',
    GET_GUILD_BY_NAME: 'SELECT guildid, name, leaderguid, createdate FROM guild WHERE name LIKE ?',
    GET_GUILD_MEMBERS_COUNT: 'SELECT count(*) AS count FROM guild_member WHERE guildid = ?',
    GET_ARENA_TEAM_BY_NAME: 'SELECT arenaTeamId, name, captainGuid, type, rating, seasonGames, seasonWins FROM arena_team WHERE name LIKE ?',
    GET_ARENA_TEAM_MEMBERS: 'SELECT c.guid, c.name, c.race, c.class FROM arena_team_member a LEFT JOIN characters c ON c.guid = a.guid WHERE arenaTeamId = ?',
};

/**
 * Wrapper for the characters database
 * @class CharactersDatabase
 */
class CharactersDatabase extends DatabaseClient {
    /**
     * Creates an instance of CharactersDatabase.
     * @memberof CharactersDatabase
     */
    constructor() {
        super('characters');
    }

    /**
     * Gets a character by name
     * @param {string} name
     * @return {WoWCharacter}
     * @memberof CharactersDatabase
     */
    async getCharacterByName(name) {
        let data = await this.execute(queries.GET_CHARACTER_BY_NAME, name);
        let char = new WoWCharacter();
        char.name = data[0].name;
        char.race = data[0].race;
        char.gender = data[0].gender;
        char.class = data[0].class;
        char.level = data[0].level;

        return char;
    }

    /**
     * Gets a guild by name
     * @param {any} name
     * @return {WowGuild}
     * @memberof CharactersDatabase
     */
    async getGuildByName(name) {
        let data = await this.execute(queries.GET_GUILD_BY_NAME, name);
        let guild = new WoWGuild();
        let leader = await this.execute(queries.GET_CHARACTER_BY_GUID, data[0].leaderguid);
        let members = await this.execute(queries.GET_GUILD_MEMBERS_COUNT, data[0].guildid);
        guild.name = data[0].name;
        guild.created = data[0].createdate;
        guild.leader = leader[0].name;
        guild.membersCount = members[0].count;
        guild.faction = getFactionFromRace(leader[0].race);

        return guild;
    }

    /**
     * Gets an arena team by name
     * @param {any} name
     * @return {WoWArenaTeam}
     * @memberof CharactersDatabase
     */
    async getArenaTeamByName(name) {
        let data = await this.execute(queries.GET_ARENA_TEAM_BY_NAME, name);
        let team = new WoWArenaTeam();
        let members = await this.execute(queries.GET_ARENA_TEAM_MEMBERS, data[0].arenaTeamId);
        team.name = data[0].name;
        team.type = data[0].type;
        team.rating = data[0].rating;
        team.seasonGames = data[0].seasonGames;
        team.seasonWins = data[0].seasonWins;

        for (let member of members) {
            let char = new WoWCharacter();
            char.name = member.name;
            char.race = member.race;
            char.class = member.class;
            team.members.push(char);

            if (member.guid == data[0].captainGuid) {
                team.captain = member.name;
            }
        }

        return team;
    }
}

/**
 * Returns the faction for the given race id
 * @param {int} race
 * @return {string}
 */
function getFactionFromRace(race) {
    switch (race) {
        case 1:
        case 3:
        case 4:
        case 7:
        case 11:
            return ExecutusBot.lang.text('wow.alliance');
        case 2:
        case 5:
        case 6:
        case 8:
        case 10:
            return ExecutusBot.lang.text('wow.horde');
        default:
            return 'Unknown';
    }
}

module.exports = CharactersDatabase;
