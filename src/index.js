const { Client, IntentsBitField } = require('discord.js');
const { CommandKit } = require('commandkit');
const path = require('path');
require('dotenv').config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent
    ]
});

new CommandKit({
    client,
    eventsPath: path.join(__dirname, 'events'),
    commandsPath: path.join(__dirname, 'commands'),
    bulkRegister: true,
}).reloadCommands();

client.login(process.env.BOT_TOKEN)

