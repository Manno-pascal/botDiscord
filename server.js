const { Client, GatewayIntentBits } = require("discord.js");
const mongoose = require('mongoose');
require('dotenv').config();
const welcome = require('./modules/welcome')
const leave = require('./modules/leave')
const rolldice = require('./jdr_modules/roledice')
const addCharacter = require('./jdr_modules/addCharacter')
const createGame = require('./jdr_modules/createGame')
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

const db = process.env.BDD_URL



client.on("ready", () => {
    console.log("Connected on La gueuserie")
});

mongoose.set('strictQuery', false);
mongoose.connect(db, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MongoDB connected");
    }
})

welcome(client)
leave(client)


client.login(process.env.BOT_ID);

// client.on("messageCreate", message => {
//     if (message.author.id === "108160112950059008") {
//         client.channels.cache.get(message.channelId).send("Tu es beau")
//     }

//     if (message.author.id === "117315231511871490") {
//         client.channels.cache.get(message.channelId).send("Mon grand maitre")
//     }

//     if (message.content === "<@108160112950059008>") {
//         console.log(message);
//         client.channels.cache.get(message.channelId).send("<@108160112950059008>")
//     }
// });

// 108160112950059008
// client.on("ready", async () => {

//   await client.application.commands.set([
//       {
//           name: "d",
//           description: "Lance un dé aléatoire",
//           options:[
//             setName("nombre"),
//           ]


//       }
//   ]);
// });

// client.on("interactionCreate", (interaction) => {

//   if (!interaction.isCommand()) return;

//   if (interaction.commandName === "d")
//       interaction.reply("Pong!");
// });



