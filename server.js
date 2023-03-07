const { createAudioPlayer, createAudioResource, joinVoiceChannel } = require('@discordjs/voice');
const { Client, GatewayIntentBits } = require('discord.js');
const ytdl = require('ytdl-core');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
    ]
});

client.on('messageCreate', async message => {
    if (!message.guild) return;

    if (message.content.startsWith('!play')) {
        const args = message.content.split(' ');
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            return message.reply('Veuillez rejoindre un canal vocal pour que je puisse jouer de la musique !');
        }

        const permissions = voiceChannel.permissionsFor(message.client.user);

        if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
            return message.reply('Je n\'ai pas la permission de rejoindre ce canal vocal et de jouer de la musique !');
        }

        const songInfo = await ytdl.getInfo(args[1]);
        const song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
        };

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });

        const stream = ytdl(song.url, { filter: 'audioonly' });
        const resource = createAudioResource(stream);
        const player = createAudioPlayer();

        connection.subscribe(player);
        player.play(resource);

        player.on('error', error => {
            console.error(error);
        });

        player.on('stateChange', (oldState, newState) => {
            if (newState.status === 'idle') {
                voiceChannel.leave();
            }
        });

        message.channel.send(`En train de jouer : **${song.title}**`);
    }
});

client.login(process.env.BOT_ID);



// const { Client, GatewayIntentBits } = require("discord.js");
// const mongoose = require('mongoose');
// const ytdl = require('ytdl-core');
// require('dotenv').config();
// const welcome = require('./modules/welcome')
// const leave = require('./modules/leave')
// const rolldice = require('./jdr_modules/roledice')
// const addCharacter = require('./jdr_modules/addCharacter')
// const createGame = require('./jdr_modules/createGame')
// const addItem = require('./jdr_modules/addItem')
// // const editItem = require('./jdr_modules/editItem')
// const client = new Client({
//     intents: [
//         GatewayIntentBits.Guilds,
//         GatewayIntentBits.GuildMessages,
//         GatewayIntentBits.MessageContent,
//         GatewayIntentBits.GuildMembers,
//     ]
// });

// const db = process.env.BDD_URL



// client.on("ready", () => {
//     console.log("Connected on La gueuserie")
// });

// mongoose.set('strictQuery', false);
// mongoose.connect(db, (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("MongoDB connected");
//     }
// })

// welcome(client)
// leave(client)


// client.on('messageCreate', async message => {
//     console.log("test");
//   if (!message.guild) return;
  
//   if (message.content.startsWith('!play')) {
//     const args = message.content.split(' ');
//     const voiceChannel = message.member.voice.channel;
    
//     if (!voiceChannel) {
//       return message.reply('Veuillez rejoindre un canal vocal pour que je puisse jouer de la musique !');
//     }
    
//     const permissions = voiceChannel.permissionsFor(message.client.user);
    
//     if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
//       return message.reply('Je n\'ai pas la permission de rejoindre ce canal vocal et de jouer de la musique !');
//     }
    
//     const songInfo = await ytdl.getInfo(args[1]);
//     const song = {
//       title: songInfo.videoDetails.title,
//       url: songInfo.videoDetails.video_url,
//     };
    
//     voiceChannel.join().then(connection => {
//       const stream = ytdl(song.url, { filter: 'audioonly' });
//       const dispatcher = connection.play(stream);
      
//       dispatcher.on('finish', () => voiceChannel.leave());
      
//       message.channel.send(`En train de jouer : **${song.title}**`);
//     });
//   }
// });


// client.login(process.env.BOT_ID);

// // client.on("messageCreate", message => {
// //     if (message.author.id === "108160112950059008") {
// //         client.channels.cache.get(message.channelId).send("Tu es beau")
// //     }

// //     if (message.author.id === "117315231511871490") {
// //         client.channels.cache.get(message.channelId).send("Mon grand maitre")
// //     }

// //     if (message.content === "<@108160112950059008>") {
// //         console.log(message);
// //         client.channels.cache.get(message.channelId).send("<@108160112950059008>")
// //     }
// // });

// // 108160112950059008
// // client.on("ready", async () => {

// //   await client.application.commands.set([
// //       {
// //           name: "d",
// //           description: "Lance un dé aléatoire",
// //           options:[
// //             setName("nombre"),
// //           ]


// //       }
// //   ]);
// // });

// // client.on("interactionCreate", (interaction) => {

// //   if (!interaction.isCommand()) return;

// //   if (interaction.commandName === "d")
// //       interaction.reply("Pong!");
// // });







