const eris = require(`eris`)

const config = require(`./config.json`)

const bot = new eris.Client(config.BOT_TOKEN, {
    messageLimit: 20,
    defaultImageSize:256
})

//Bot connected to Discord
bot.on(`ready`, () => {
    console.log(`The land of Discordia sprawls before the console...`);
});

//
bot.on(`guildCreate`, async guild => {
    try {
        //create game section
        let gameCategory = await guild.createChannel(`Discordia`, 4, `Discordia RPG setup.`)
        let gameLocale = await guild.createChannel(`Discordia Prime`, 0, `Discordia RPG setup.`, gameCategory.id)
        let gameLexicon = await guild.createChannel(`Lexicon`, 0, `Discordia RPG setup.`, gameCategory.id)
    } catch (err) {
        console.log(err)
    }

});

//Connect to Discord
bot.connect()