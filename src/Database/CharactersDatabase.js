const DatabaseClient = require('./DatabaseClient');
const WoWCharacter = require('../Entities/WoWCharacter');
const WoWGuild = require('../Entities/WoWGuild');

const queries = {
    GET_CHARACTER_BY_NAME: 'SELECT name, race, class, gender, level FROM characters WHERE name LIKE ?',
    GET_CHARACTER_BY_GUID: 'SELECT name, race, class, gender, level FROM characters WHERE guid = ?',
    GET_GUILD_BY_NAME: 'SELECT guildid, name, leaderguid, createdate FROM guild WHERE name LIKE ?',
    GET_GUILD_MEMBERS_COUNT: 'SELECT count(*) AS count FROM guild_member WHERE guildid = ?',
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
}

function getFactionFromRace(race) {
    switch(race) {
        case 1:
        case 3:
        case 4:
        case 7:
        case 11:
            return ExecutusBot.lang.wow.alliance;
        case 2:
        case 5:
        case 6:
        case 8:
        case 10:
            return ExecutusBot.lang.wow.horde;
        default:
            return 'Unknown';
    }
}

module.exports = CharactersDatabase;
