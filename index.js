//@ts-check

"use strict"
require('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client();
const token = process.env.token;
const prefix = "$";
const ytdl = require("ytdl-core");

console.log('connected');

client.on("guildCreate", async guild => hello_world(guild, client));

client.on('message', async message => {

    if (message.toString().substring(0, prefix.length) === prefix && client.user.id !== message.author.id) {
        performAction(message);
    }

});
client.login(token);

function hello_world(guild, bot) {
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



/**
 * @param {import("discord.js").Message} message
 */
function performAction(message) {
    let data = message.toString().split(" ");
    console.log(data);

    switch (data[0]) {
        case "$play": playRadio(message, "http://broadcast.infomaniak.ch/ouifm-high.mp3", 128); break;
        case "$ping": message.channel.send("Pong"); break;
        default: message.channel.send("Invalid command"); break;
    }
};


/**
 * @param {import("discord.js").Message} message
 * @param {string} url
 * @param {number} bitrate
 */
function playRadio(message, url, bitrate) {
    // let voiceChannel = null;
    // message.channel.guild.channels.forEach((channel) => {
    //     if ((channel.type === "voice") && (voiceChannel == null) &&
    //         channel.guild.members.find(member => member.id === message.author.id) != null) {
    //         voiceChannel = channel;
    //     }
    // });

    // https://gabrieltanner.org/blog/dicord-music-bot

    let voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
        return message.channel.send(
            "You need to be in a voice channel to play music!"
        );
    } else {

        voiceChannel.join()
            .then(connection => {
                // utilisation de play --> possible avec fichiers ou des strems http ou des vidéos youtube (avec un pakage spécial)
                //const dispatcher = connection.play(ytdl("https://www.youtube.com/watch?v=5qap5aO4i9A"));
                const dispatcher = connection.play("https://listen.radioking.com/radio/18893/stream/67148");
                message.channel.send("Playing radio");
            })
            .catch(error => console.error(error))
    }
}
// --> https://discordjs.guide/voice/the-basics.html#controlling-the-stream-dispatcher

// https://discord.js.org/#/
// https://github.com/fent/node-ytdl-core/blob/a802b6c3347b27fec7a0b84d0fd666b5ba0e538e/lib/index.js#L44

