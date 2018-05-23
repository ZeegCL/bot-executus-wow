/**
 * Represents an in-game arena team
 * @class WoWArenaTeam
 */
class WoWArenaTeam {
    /**
     * Creates an instance of WoWArenaTeam.
     * @memberof WoWArenaTeam
     */
    constructor() {
        this._name = 'Unknown';
        this._type = '2v2';
        this._rating = 0;
        this._captain = 'Unknown';
        this._seasonGames = 0;
        this._seasonWins = 0;
        this._members = [];
    }

    /**
     * Get property "name"
     * @memberof WoWArenaTeam
     */
    get name() {
        return this._name;
    }
    /**
     * Set property "name"
     * @param {string} value
     * @memberof WoWArenaTeam
     */
    set name(value) {
        this._name = value;
    }

    /**
     * Get property "type"
     * @memberof WoWArenaTeam
     */
    get type() {
        return this._type;
    }
    /**
     * Set property "type"
     * Will be translated to: 2v2, 3v3 or 5v5
     * @param {int} value
     * @memberof WoWArenaTeam
     */
    set type(value) {
        switch (value) {
            case 2:
                this._type = '2v2';
                break;
            case 3:
                this._type = '3v3';
                break;
            case 5:
                this._type = '5v5';
                break;
            default:
                this._type = 'Unknown';
        }
    }

    /**
     * Get property "rating"
     * @memberof WoWArenaTeam
     */
    get rating() {
        return this._rating;
    }
    /**
     * Set property "rating"
     * @param {int} value
     * @memberof WoWArenaTeam
     */
    set rating(value) {
        if (!isNaN(value)) {
            this._rating = parseInt(value);
        }
    }

    /**
     * Get property "captain"
     * @memberof WoWArenaTeam
     */
    get captain() {
        return this._captain;
    }
    /**
     * Set property "captain"
     * @param {string} value
     * @memberof WoWArenaTeam
     */
    set captain(value) {
        this._captain = value;
    }

    /**
     * Get property "seasonGames"
     * @memberof WoWArenaTeam
     */
    get seasonGames() {
        return this._seasonGames;
    }
    /**
     * Set property "seasonGames"
     * @param {int} value
     * @memberof WoWArenaTeam
     */
    set seasonGames(value) {
        if (!isNaN(value)) {
            this._seasonGames = parseInt(value);
        }
    }

    /**
     * Get property "seasonWins"
     * @memberof WoWArenaTeam
     */
    get seasonWins() {
        return this._seasonWins;
    }
    /**
     * Set property "seasonWins"
     * @param {int} value
     * @memberof WoWArenaTeam
     */
    set seasonWins(value) {
        if (!isNaN(value)) {
            this._seasonWins = parseInt(value);
        }
    }

    /**
     * Get property "members"
     * @memberof WoWArenaTeam
     */
    get members() {
        return this._members;
    }
    /**
     * (Unhandled) Set property "members"
     * @param {any} value
     * @memberof WoWArenaTeam
     */
    set members(value) { }
}

module.exports = WoWArenaTeam;
