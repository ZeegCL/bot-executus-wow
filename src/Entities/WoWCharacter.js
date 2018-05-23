const RACES = ['Human', 'Orc', 'Dwarf', 'Night Elf', 'Undead', 'Tauren', 'Gnome', 'Troll', null, 'Blood Elf', 'Draenei'];
const CLASSES = ['Warrior', 'Paladin', 'Hunter', 'Rogue', 'Priest', 'Death Knight', 'Shaman', 'Mage', 'Warlock', null, 'Druid'];

/**
 * Represents a World of Warcraft character
 * @class WoWCharacter
 */
class WoWCharacter {
    /**
     * Creates an instance of WoWCharacter.
     * @memberof WoWCharacter
     */
    constructor() {
        this._name = 'Unknown';
        this._race = 'Unknown';
        this._class = 'Unknown';
        this._gender = 'Unknown';
        this._level = 'Unknown';
    }

    /**
     * Name attribute
     * @memberof WoWCharacter
     */
    get name() {
        return this._name;
    }
    /**
     * @param {any} value
     * @memberof WoWCharacter
     */
    set name(value) {
        this._name = value;
    }

    /**
     * Race attribute
     * @memberof WoWCharacter
     */
    get race() {
        return this._race;
    }
    /**
     * @param {any} value
     * @memberof WoWCharacter
     */
    set race(value) {
        if (!isNaN(value)) {
            value = parseInt(value);
            if (value > 0 && value <= RACES.length) {
                this._race = RACES[value-1];
            }
        }
    }

    /**
     * Class attribute
     * @memberof WoWCharacter
     */
    get class() {
        return this._class;
    }
    /**
     * @param {any} value
     * @memberof WoWCharacter
     */
    set class(value) {
        if (!isNaN(value)) {
            value = parseInt(value);
            if (value > 0 && value <= CLASSES.length) {
                this._class = CLASSES[value-1];
            }
        }
    }

    /**
     * Gender attribute
     * @memberof WoWCharacter
     */
    get gender() {
        return this._gender;
    }
    /**
     * @param {any} value
     * @memberof WoWCharacter
     */
    set gender(value) {
        if (!isNaN(value)) {
            if (value == 0) {
                this._gender = 'Male';
            } else if (value == 1) {
                this._gender = 'Female';
            }
        }
    }

    /**
     * Level attribute
     * @memberof WoWCharacter
     */
    get level() {
        return this._level;
    }
    /**
     * @param {any} value
     * @memberof WoWCharacter
     */
    set level(value) {
        if (!isNaN(value)) {
            this._level = parseInt(value);
        }
    }
}

module.exports = WoWCharacter;
