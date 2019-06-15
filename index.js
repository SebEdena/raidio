const Discord = require("discord.js");
const client = new Discord.Client();
// const token = process.env.DISCORD_BOT_SECRET;
const broadcast = client.createVoiceBroadcast();
const prefix = "$";

client.once('ready', () => {
    console.log('connected');
});

client.on("guildCreate", guild => {
    guild.defaultChannel.send("Hello Guys !");
});

client.on('message', async message => {

    if(message.substring(0, prefix.length) === prefix){
        message.reply(`${prefix} prefix detected !`);    
    }
});
