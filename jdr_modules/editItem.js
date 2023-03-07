const { Client, GatewayIntentBits } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
require('dotenv').config();
const CharacterModel = require('../models/character.js')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

client.on('ready', () => {
    const command = new SlashCommandBuilder()
        .setName('edititem')
        .setDescription('Ajoute un item à un personnage')
        .addStringOption(option =>
            option.setName('nompersonnage')
                .setDescription("Nom du personnage")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('item')
                .setDescription("Nom de l'item")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('itemquantite')
                .setDescription("Quantité de l'item ajouté")
                .setRequired(true))
                

    client.application.commands.create(command)
});

client.on('interactionCreate', async interaction => {
    if (interaction.commandName === 'edititem') {
        let item = [interaction.options.getString('item'), interaction.options.getString('itemquantite')]
        console.log(item);
        await CharacterModel.updateOne({ inventory: interaction.options.getString('nompersonnage'), inventory.: interaction.options.getString('nompersonnage') })
    }
});

client.login(process.env.BOT_ID);