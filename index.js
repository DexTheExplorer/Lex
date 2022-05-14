import settings from './configuration.json' assert {type: "json"};
import fs from 'node:fs';
import { Client, Intents, Collection, MessageEmbed } from 'discord.js';

const intents = new Intents().add(Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS);
const client = new Client({intents: intents, allowedMentions: {parse: ['users']}});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

console.log(`Attempting to load ${commandFiles.length} commands.`);
for (const file of commandFiles) {
    await import (`./commands/${file}`).then(command => {
        process.stdout.write("Loading " + command.default.data.name + "...");
        client.commands.set(command.default.data.name, command);
        process.stdout.write(' loaded\n');
    }).catch(console.error);
}

console.log(`All commands loaded successfully.\nAttempting to load ${eventFiles.length} events.`);
for (const file of eventFiles) {
    await import (`./events/${file}`).then(event => {
        process.stdout.write(`Loading ${event.default.name}...`);
        if (event.default.once && event.default.once === true) {
            client.once(event.default.name, (...args) => event.default.execute(...args));
        } else {
            if (event.default.gcmds === true) {
                client.on(event.default.name, (...args) => event.default.execute(...args, client.commands));
            } else {
                client.on(event.default.name, (...args) => event.default.execute(...args));
            }
        }
        process.stdout.write(' loaded\n');
    }).catch(console.error);
}

// console.clear();
client.login(settings.token);