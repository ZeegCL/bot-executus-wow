/**
 * Represents an in-game guild
 * @class WoWGuild
 */
class WoWGuild {
    /**
     * Creates an instance of WoWGuild.
     * @memberof WoWGuild
     */
    constructor() {
        this._name = 'Unknown';
        this._leader = 'Unknown';
        this._membersCount = 0;
        this._created = undefined;
        this._faction = 'Unknown';
    }

    /**
     * Get property "name"
     * @memberof WoWGuild
     */
    get name() {
        return this._name;
    }
    /**
     * Set property "name"
     * @param {string} value
     * @memberof WoWGuild
     */
    set name(value) {
        this._name = value;
    }

    /**
     * Get property "leader"
     * @readonly
     * @memberof WoWGuild
     */
    get leader() {
        return this._leader;
    }
    /**
     * Set property "leader"
     * @param {string} value
     * @memberof WoWGuild
     */
    set leader(value) {
        this._leader = value;
    }

    /**
     * Get property "membersCount"
     * @memberof WoWGuild
     */
    get membersCount() {
        return this._membersCount;
    }
    /**
     * Set property "membersCount"
     * @param {int} value
     * @memberof WoWGuild
     */
    set membersCount(value) {
        if (!isNaN(value)) {
            this._membersCount = parseInt(value);
        }
    }

    /**
     * Get property "created"
     * @memberof WoWGuild
     */
    get created() {
        return this._created;
    }
    /**
     * Set property "created"
     * @param {int} timestamp
     * @memberof WoWGuild
     */
    set created(timestamp) {
        this._created = new Date(timestamp * 1000);
    }

    /**
     * Get property "faction"
     * @memberof WoWGuild
     */
    get faction() {
        return this._faction;
    }
    /**
     * Set property "faction"
     * @param {string} value
     * @memberof WoWGuild
     */
    set faction(value) {
        this._faction = value;
    }
}

module.exports = WoWGuild;
