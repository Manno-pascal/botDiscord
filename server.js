const { Client, GatewayIntentBits } = require("discord.js");
const mongoose = require('mongoose');
require('dotenv').config();
const welcome = require('./modules/welcome')
const leave = require('./modules/leave')
const rolldice = require('./jdr_modules/roledice')
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

client.on("messageCreate", message => {
    if (message.content === "salut" || message.content === "Salut") {
        client.channels.cache.get("1075493671954288640").send("Je suis là")
    }
});

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



