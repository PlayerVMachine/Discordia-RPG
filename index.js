const eris = require(`eris`)

const config = require(`./config.json`)

const bot = new Eris.Client(config.BOT_TOKEN, {
    messageLimit: 20,
    defaultImageSize:256
})

//Bot connected to Discord
bot.on(`ready`, () => {
    console.log(`The land of Discordia sprwals before the console...`);
});

//
bot.on(`guildCreate`, async guild => {
    let botmember = guild.members.get(m => m.id = bot.user.id);
    let botperms = botmember.permission.allow;
    let reqperms = 536870912 + 268435456 + 262144 + 16384 + 32768 + 2048 + 1024 + 64 + 16;

    if (reqperms > botperms) {
        //Bot is missing permissions
        //tell owner perms are missing
        return;
    }

    //create game section
    let gameCategory = await guild.createChannel(`Discordia`, 4, `Discordia RPG setup.`)
    let gameLocale = await guild.createChannel(`Discordia Prime`, 0, `Discordia RPG setup.`, gameCategory.id)
    let gameLexicon = await guild.createChannel(`Lexicon`, 0, `Discordia RPG setup.`, gameCategory.id)

});

//Connect to Discord
bot.connect()