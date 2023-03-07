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
        .setName('ajouteritem')
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
        .addStringOption(option =>
            option.setName('description')
                .setDescription("Description de l'objet")
                .setRequired(true))
                

    client.application.commands.create(command)
});


client.on('interactionCreate', async interaction => {
    if (interaction.commandName === 'ajouteritem') {
        let item = [interaction.options.getString('item'), interaction.options.getString('itemquantite'), interaction.options.getString('description')]
        await CharacterModel.updateOne({ name: interaction.options.getString('nompersonnage') }, { $push: { inventory: item }})
        interaction.reply("Item rajouté");
    }
});

client.login(process.env.BOT_ID);