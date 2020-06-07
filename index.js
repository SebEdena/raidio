// @ts-check

import dotenv from "dotenv";
import { Client } from "discord.js";
// import ytdl from "ytdl-core";
dotenv.config();

const client = new Client();
const token = process.env.token;
const prefix = "$";

console.log("connected");

client.on("guildCreate", (guild) => helloWorld(guild, client));

client.on("message", (message) => {

    if (message.toString().substring(0, prefix.length) === prefix && client.user.id !== message.author.id)
        performAction(message);


});
client.login(token);

function helloWorld(guild, bot) {
    let channelID;
    const channels = guild.channels;

    for (const c of channels) {
        const channelType = c[1].type;
        if (channelType === "text") {
            channelID = c[0];
            break;
        }
    }

    const channel = bot.channels.get(guild.systemChannelID || channelID);
    channel.send("Thanks for inviting me into this server!");
}



/**
 * @param {import("discord.js").Message} message
 */
function performAction(message) {
    const data = message.toString().split(" ");
    console.log(data);

    switch (data[0]) {
        case "$play": playRadio(message, "http://broadcast.infomaniak.ch/ouifm-high.mp3", 128); break;
        case "$ping": message.channel.send("Pong"); break;
        default: message.channel.send("Invalid command"); break;
    }
}


/**
 * @param {import("discord.js").Message} message
 * @param {string} _url
 * @param {number} _bitrate
 */
function playRadio(message, _url, _bitrate) {

    // https://gabrieltanner.org/blog/dicord-music-bot

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
        message.channel.send(
            "You need to be in a voice channel to play music!",
        );
        return;
    }

    voiceChannel.join()
        .then((connection) => {
            // utilisation de play --> possible avec fichiers ou des strems http ou des vidéos youtube (avec un pakage spécial)
            // const dispatcher = connection.play(ytdl("https://www.youtube.com/watch?v=5qap5aO4i9A"));
            connection.play("https://listen.radioking.com/radio/18893/stream/67148");
            message.channel.send("Playing radio");
        })
        .catch((error) => console.error(error));

}
// --> https://discordjs.guide/voice/the-basics.html#controlling-the-stream-dispatcher

// https://discord.js.org/#/
// https://github.com/fent/node-ytdl-core/blob/a802b6c3347b27fec7a0b84d0fd666b5ba0e538e/lib/index.js#L44

