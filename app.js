const ExecutusBot = require('./src/ExecutusBot');

let bot = new ExecutusBot();
bot.run()
    .catch((err) => {
        console.error('Beep bop! Internal bot error: ', err.message);
        bot.shutdown();
    });
