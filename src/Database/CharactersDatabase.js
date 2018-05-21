const DatabaseClient = require('./DatabaseClient');
const WoWCharacter = require('../Entities/WoWCharacter');

const queries = {
    GET_CHARACTER_BY_NAME: 'SELECT name, race, class, gender, level FROM characters WHERE name LIKE ?',
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
     * Gets a unique character by name
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
}

module.exports = CharactersDatabase;
