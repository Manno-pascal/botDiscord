const { createAudioPlayer, createAudioResource, joinVoiceChannel } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('@discordjs/builders');
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


client.on('ready', () => {

    const command = new SlashCommandBuilder()
        .setName('play')
        .setDescription('Lance une musique de youteube')
        .addStringOption(option =>
            option.setName('lienyouteube')
                .setDescription("Lien de la musique")
                .setRequired(true));

    client.application.commands.create(command)
});
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    if (interaction.commandName === 'play') {
            const voiceChannel = interaction.member.voice.channel;
    
            if (!voiceChannel) {
                return interaction.reply('Veuillez rejoindre un canal vocal pour que je puisse jouer de la musique !');
            }
    
            const permissions = voiceChannel.permissionsFor(interaction.client.user);
    
            if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
                return interaction.reply('Je n\'ai pas la permission de rejoindre ce canal vocal et de jouer de la musique !');
            }
    
            const songInfo = await ytdl.getInfo(interaction.options.getString('lienyouteube'));
            const song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
                timeout: 10000,
            };
    
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });
    
            const stream = ytdl(song.url, { filter: 'audioonly', highWaterMark: 50 * 1024 * 1024 });
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
    
            interaction.reply(`En train de jouer : **${song.title}**`);
        }


        
    }
);

client.login(process.env.BOT_ID);