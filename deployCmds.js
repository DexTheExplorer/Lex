import { readdirSync } from 'node:fs';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import settings from './configuration.json' assert {type: "json"};

const commands = [];
const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = await import (`./commands/${file}`)
    commands.push(command.default.data.toJSON());
}

const rest = new REST({version: '9'}).setToken(settings.token);

for (const guild of settings.guilds) {
    rest.put(Routes.applicationGuildCommands(settings.clientId, guild), { body: commands })
        .then(() => process.stdout.write(`Deployed to ${guild}\n`))
        .catch(console.error);
}