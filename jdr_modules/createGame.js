const { Client, GatewayIntentBits } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
require('dotenv').config();
const CampagneModel = require('../models/campagne.js')

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
        .setName('creerpartie')
        .setDescription('Crée une partie de JDR')
        .addStringOption(option =>
            option.setName('nomdelacampagne')
                .setDescription("Nom de la table")
                .setRequired(true))

    client.application.commands.create(command)
});
client.on('interactionCreate', async interaction => {

    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'creerpartie') {
        if (await CampagneModel.findOne({ name: interaction.options.getString('nomdelacampagne') })) {
            interaction.reply("Campagne déjà existante");
            return;
        }
        let body = {
            name: interaction.options.getString('nomdelacampagne'),
            gameMasterId: interaction.user.id,
            gameMasterName: interaction.user.username,
        }
        let campagne = new CampagneModel(body)
        campagne.save()
        interaction.reply("Campagne créée");
    }

});

client.login(process.env.BOT_ID);