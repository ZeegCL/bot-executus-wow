/**
 * Manages the language files for the bot
 * @class LanguageMgr
 */
class LanguageMgr {
    /**
     * Creates an instance of LanguageMgr.
     * @memberof LanguageMgr
     */
    constructor() {
        this._locale = 'en';
        this._loaded = {};

        this.loadLocale(this._locale);
    }

    /**
     * Tries to load a locale file asynchronously
     * @param {any} locale
     * @memberof LanguageMgr
     */
    async loadLocale(locale) {
        if (this._loaded[locale] == undefined) {
            let path = require('path').join(__dirname, `../conf/lang.${locale}.json`);
            console.log('path:', path);
            let file = require(path);
            let dictionary = {};

            buildDictionary('', file, dictionary);
            this._loaded[locale] = dictionary;
        }
    }

    /**
     * Sets the bot locale and tries to load it from file
     * @param {any} locale
     * @memberof LanguageMgr
     */
    setLocale(locale) {
        if (locale !== '') {
            this.loadLocale(locale)
                .then(() => {
                    this._locale = locale;
                })
                .catch((err) => {
                    console.error('LanguageMgr:', err.message);
                });
        }
    }

    /**
     * Registers this instance as a global object
     * @memberof LanguageMgr
     */
    register() {
        global.Lang || (global.Lang = this);
    }

    /**
     * Gets a loaded locale string
     * @param {any} key
     * @return {string}
     * @memberof LanguageMgr
     */
    _(key) {
        try {
            return this._loaded[this._locale][key];
        } catch (err) {
            console.error('LanguageMgr:', err.message);
            return '?';
        }
    }
}

/**
 * Constructs a key/value dictionary with the language strings
 * @param {string} root
 * @param {any} obj
 * @param {any} dictionary
 */
function buildDictionary(root, obj, dictionary) {
    for (let key of Object.keys(obj)) {
        let localRoot = (root !== '' ? `${root}.` : '') + key;
        if (typeof obj[key] === 'object') {
            buildDictionary(localRoot, obj[key], dictionary);
        } else {
            dictionary[localRoot] = obj[key];
        }
    }
}

module.exports = LanguageMgr;
