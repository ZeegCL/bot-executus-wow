const ExecutusBot = require('./src/ExecutusBot');
const LanguageMgr = require('./src/LanguageMgr');

let lang = new LanguageMgr();
lang.register();

let bot = new ExecutusBot();
bot.run()
    .catch((err) => {
        console.error('Beep bop! Internal bot error: ', err.message);
        bot.shutdown();
    });
