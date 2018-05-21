const NodeCache = require('node-cache');

/**
 * Caches requested data for future commands
 * @class CacheMgr
 */
class CacheMgr {
    /**
     * Creates an instance of CacheMgr.
     * @param {int} ttl
     * @param {int} checkInterval
     * @memberof CacheMgr
     */
    constructor(ttl, checkInterval) {
        this._cache = new NodeCache({stdTTL: ttl, checkperiod: checkInterval});
    }

    /**
     * @param {string} key
     * @param {any} val
     * @memberof CacheMgr
     */
    save(key, val) {
        this._cache.set(key, val);
    }

    /**
     * @param {string} key
     * @memberof CacheMgr
     */
    get(key) {
        this._cache.get(key);
    }
}

module.exports = CacheMgr;
