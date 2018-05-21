const fs = require('fs');
/**
 * Manages the loading and access to config values
 * @class ConfigMgr
 */
class ConfigMgr {
    /**
     * Creates an instance of ConfigMgr.
     * @memberof ConfigMgr
     */
    constructor() {
        this._config = [];
    }

    /**
     * Loads a config from file
     * @param {string} rootNode
     * @param {string} path
     * @memberof ConfigMgr
     */
    loadConfig(rootNode, path) {
        try {
            let data = fs.readFileSync(path, 'utf8');
            let conf = JSON.parse(data);
            for (let key of Object.keys(conf)) {
                let label = `${rootNode}.${key}`;
                this._config[label] = conf[key];
            }
        } catch (err) {
            console.error('Config file not found!', err.message);
        }
    }

    /**
     * Gets a value from config
     * @param {string} config
     * @param {string} defVal
     * @return {any}
     * @memberof ConfigMgr
     */
    getValue(config, defVal) {
        return this._config[config] || defVal;
    }
}

module.exports = ConfigMgr;
