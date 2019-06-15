require('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client();
const token = process.env.token;
const broadcast = client.createVoiceBroadcast();
const prefix = "$";

client.once('ready', () => {
    console.log('connected');
});

client.on("guildCreate", async guild => hello_world(guild, client));

client.on('message', async message => {

    if(message.toString().substring(0, prefix.length) === prefix){
        message.reply(`${prefix} prefix detected !`);    
    }
});

console.log(token);
client.login(token);

function hello_world(guild, bot){
    let channelID;
    let channels = guild.channels;
    channelLoop:
    for (let c of channels) {
        let channelType = c[1].type;
        if (channelType === "text") {
            channelID = c[0];
            break channelLoop;
        }
    }

    let channel = bot.channels.get(guild.systemChannelID || channelID);
    channel.send(`Thanks for inviting me into this server!`);
}