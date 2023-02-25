const { Client, GatewayIntentBits } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    const command = new SlashCommandBuilder()
        .setName('d')
        .setDescription('Lance un dé aléatoirement !')
        .addIntegerOption(option =>
            option.setName('nombre')
                .setDescription("Nombre d'issues")
                .setRequired(true));

    client.application.commands.create(command)
});
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    if (interaction.commandName === 'd') {
        let nombre = interaction.options.getInteger('nombre');
        let resultat = Math.floor(Math.random() * nombre) + 1;
        if (resultat == 1) {
            let reponse = `Vous avez roulé un dé à ${nombre} faces et obtenu ${resultat} ! C'est un fumble !`;
            await interaction.reply(reponse);
        } else if (resultat == nombre) {
            let reponse = `Vous avez roulé un dé à ${nombre} faces et obtenu ${resultat} ! C'est un ${nombre} naturel !`;
            await interaction.reply(reponse);
        } else {
            let reponse = `Vous avez roulé un dé à ${nombre} faces et obtenu ${resultat} !`;
            await interaction.reply(reponse);
        }


        
    }
});

client.login(process.env.BOT_ID);