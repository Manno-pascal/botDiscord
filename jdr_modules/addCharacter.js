const { Client, GatewayIntentBits } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
require('dotenv').config();
const CharacterModel = require('../models/character.js')
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
        .setName('ajoutjoueur')
        .setDescription('Ajoute une joueur à la table !')
        .addStringOption(option =>
            option.setName('nomdelacampagne')
                .setDescription("Nom de la table")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('nomdujoueur')
                .setDescription("Nom du joueur")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('racedupersonnage')
                .setDescription("Nom de la table")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('classedupersonnage')
                .setDescription("Nom de la table")
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('pointsdevie')
                .setDescription("Nom de la table")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('alignement')
                .setDescription("Nom de la table")
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('force')
                .setDescription("Nom de la table")
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('dexterite')
                .setDescription("Nom de la table")
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('constitution')
                .setDescription("Nom de la table")
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('charisme')
                .setDescription("Nom de la table")
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('sagesse')
                .setDescription("Nom de la table")
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('intelligence')
                .setDescription("Nom de la table")
                .setRequired(true));

    client.application.commands.create(command)
});
client.on('interactionCreate', async interaction => {

    if (!interaction.isCommand()) return;





    if (interaction.commandName === 'ajoutjoueur') {
        if (!await CampagneModel.findOne({ name: interaction.options.getString('nomdelacampagne') })) {
            interaction.reply("Nom de campagne introuvable");
            return;
        }
        if (interaction.user.id != (await CampagneModel.findOne({ name: interaction.options.getString('nomdelacampagne') })).gameMasterId) {
            interaction.reply("Seul le maitre du jeu peut effectuer cet ajout");
            return;
        }
    
        if (await CharacterModel.findOne({ campagneId: (await CampagneModel.findOne({ name: interaction.options.getString('nomdelacampagne') }))._id, name: interaction.options.getString('nomdujoueur') })) {
            interaction.reply("Personnage déjà existant");
            return;
        }
        let body = {
            name: interaction.options.getString('nomdujoueur'),
            class: interaction.options.getString('classedupersonnage'),
            race: interaction.options.getString('racedupersonnage'),
            healthPoints: interaction.options.getInteger('pointsdevie'),
            alignment: interaction.options.getString('alignement'),
            strength: interaction.options.getInteger('force'),
            dexterity: interaction.options.getInteger('dexterite'),
            intelligence: interaction.options.getInteger('intelligence'),
            charisma: interaction.options.getInteger('charisme'),
            constitution: interaction.options.getInteger('constitution'),
            wisdom: interaction.options.getInteger('sagesse')
        }
        let character = new CharacterModel(body)

        await CampagneModel.updateOne({ name: interaction.options.getString('nomdelacampagne') }, { $push: { characters: character._id } })
        character.campagneId = (await CampagneModel.findOne({ name: interaction.options.getString('nomdelacampagne') }))._id

        character.save()
        interaction.reply("Personnage ajouté avec succés");


    }
});

client.login(process.env.BOT_ID);