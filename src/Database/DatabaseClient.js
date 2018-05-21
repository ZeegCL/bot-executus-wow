const mysql = require('mysql');

/**
 * Connects to a database and executes queries
 * @class DatabaseClient
 */
class DatabaseClient {
    /**
     * Creates an instance of DatabaseClient.
     * @param {string} database The database to read from config
     * @memberof DatabaseClient
     */
    constructor(database) {
        this._database = database;
        this._connection = mysql.createConnection({
            host: ExecutusBot.config.getValue(`database.${this._database}.host`, 'localhost'),
            user: ExecutusBot.config.getValue(`database.${this._database}.user`, 'root'),
            password: ExecutusBot.config.getValue(`database.${this._database}.password`, 'root'),
            database: ExecutusBot.config.getValue(`database.${this._database}.database`, ''),
        });

        this._connection.connect((err, args) => {
                if (err) {
                    throw err;
                }
            });
    }

    /**
     * Executes the query and returns the results
     * @param {string} query
     * @param {array} args
     * @return {Promise}
     * @memberof DatabaseClient
     */
    execute(query, ...args) {
        return new Promise((resolve, reject) => {
            this._connection.query(query, ...args, (error, results, fields) => {
                if (error) reject(error);

                console.log('SQL query result: ', results);
                resolve(results);
            });
        });
    }
}

module.exports = DatabaseClient;
