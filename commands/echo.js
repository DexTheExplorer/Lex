import { SlashCommandBuilder } from '@discordjs/builders'

export default {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Echoes back the message')
        .addStringOption(option => option.setName('message').setDescription('Text to echo').setRequired(true)),
    async execute(interaction) {
        interaction.editReply(interaction.options.getString('message'));
    }
}