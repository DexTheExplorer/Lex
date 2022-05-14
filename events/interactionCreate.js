import settings from '../configuration.json' assert {type: "json"};
import perms from '../extras/data.json' assert {type: "json"};
import { MessageEmbed } from 'discord.js';

export default {
    name: 'interactionCreate',
    gcmds: true,
    async execute(interaction, commands) {
        if (!interaction.isCommand()) return;

        const command = commands.get(interaction.commandName);

        if (!command) return;

        if (perms[command.default.data.name].elev === true && settings.authorized.includes(interaction.user.id) === false) {
            interaction.reply({embed: new MessageEmbed().setDescription('The permission level on this command prevent you from executing.')});
            return;
        }

        try {
            await interaction.deferReply();
            await command.default.execute(interaction);
        } catch (error) {
            console.log(error);
        }
    },
};