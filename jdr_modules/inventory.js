// const { Client, GatewayIntentBits } = require('discord.js');
// const { SlashCommandBuilder } = require('@discordjs/builders');
// require('dotenv').config();
// const CampagneModel = require('../models/campagne.js')

// const client = new Client({
//     intents: [
//         GatewayIntentBits.Guilds,
//         GatewayIntentBits.GuildMessages,
//         GatewayIntentBits.MessageContent,
//         GatewayIntentBits.GuildMembers,
//     ]
// });

// client.on('ready', () => {
//     const command = new SlashCommandBuilder()
//         .setName('ajouteritem')
//         .setDescription('Ajoute un item à un personnage')
//         .addStringOption(option =>
//             option.setName('nompersonnage')
//                 .setDescription("Nom du personnage")
//                 .setRequired(true))
//         .addStringOption(option =>
//             option.setName('item')
//                 .setDescription("Nom de l'item")
//                 .setRequired(true))
//         .addStringOption(option =>
//             option.setName('itemquantite')
//                 .setDescription("Quantité de l'item ajouté")
//                 .setRequired(true))
//         .addStringOption(option =>
//             option.setName('description')
//                 .setDescription("Description de l'objet")
//                 .setRequired(true))

//     client.application.commands.create(command)
// });

// client.on('interactionCreate', async interaction => {
//     let item = [interaction.options.getString('item'), interaction.options.getString('itemquantite'), interaction.options.getString('description')]
//     console.log(item);
//     await CampagneModel.updateOne({ name: interaction.options.getString('nompersonnage') }, { $push: {sous:item} })

// });

// client.login(process.env.BOT_ID);