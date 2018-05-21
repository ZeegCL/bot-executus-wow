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
     * @param {any} val
     * @memberof WoWCharacter
     */
    set name(val) {
        this._name = val;
    }

    /**
     * Race attribute
     * @memberof WoWCharacter
     */
    get race() {
        return this._race;
    }
    /**
     * @param {any} val
     * @memberof WoWCharacter
     */
    set race(val) {
        if (!isNaN(val)) {
            val = parseInt(val);
            if (val > 0 && val <= RACES.length) {
                this._race = RACES[val-1];
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
     * @param {any} val
     * @memberof WoWCharacter
     */
    set class(val) {
        if (!isNaN(val)) {
            val = parseInt(val);
            if (val > 0 && val <= CLASSES.length) {
                this._class = CLASSES[val-1];
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
     * @param {any} val
     * @memberof WoWCharacter
     */
    set gender(val) {
        if (!isNaN(val)) {
            if (val == 0) {
                this._gender = 'Male';
            } else if (val == 1) {
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
     * @param {any} val
     * @memberof WoWCharacter
     */
    set level(val) {
        if (!isNaN(val)) {
            this._level = parseInt(val);
        }
    }
}

module.exports = WoWCharacter;
