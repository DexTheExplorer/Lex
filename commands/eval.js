import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js';
import settings from '../configuration.json' assert {type: "json"};

export default {
    data: new SlashCommandBuilder()
        .setName('eval')
        .setDescription('Run command in the console')
        .addStringOption(option => option.setName('code').setDescription('JavaScript code').setRequired(true)),
    async execute(interaction) {
        const date = Date.now();
        let emb = new MessageEmbed();
        const code = interaction.options.getString('code');
        let result;
        try {
            result = await eval(code);
            emb.setTitle('Evaluation Success').addField('Code', `\`\`\`${code}\`\`\``).addField('Result', `\`\`\`${result}\`\`\``).addField('Time', `${Date.now() - date}ms`).setColor('#00ff00');
        } catch (error) {
            emb.setTitle('Evaluation Error').addField('Code', `\`\`\`${code}\`\`\``).addField('Result', `\`\`\`${error}\`\`\``).addField('Time', `${Date.now() - date}ms`).setColor('#ff0000');
        }
        interaction.editReply({ embeds: [emb] });
    }
}