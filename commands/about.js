import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js';
import os from 'os';

export default {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Get some information about Lex'),
    async execute(interaction) {
        const platform = os.platform() === 'win32' ? 'Windows' : os.platform() === 'linux' ? 'Linux' : os.platform() === 'darwin' ? 'MacOS' : `err:${os.platform()}`;
        const arch = os.arch() === 'x64' ? '64-bit' : os.arch() === 'x32' ? '32-bit' : `err:${os.arch()}`;
        const embed = new MessageEmbed()
            .setTitle('About me!')
            .setDescription('Hello!~ I\'m Lex, a virtual assistant made by [@Dex#2255](https://discord.com/users/Lex#0001).\nHere\'s some information about me~')
            .addFields(
                {name: 'Version', value: 'v1.0.0', inline: true},
                {name: 'Source', value: '[Direct Link](https://github.com/DexTheExplorer/Lex)', inline: true},
                {name: 'Website', value: '[Direct Link](https://github.com/DexTheExplorer/Lex)', inline: true},
                {name: 'Host', value: `\`\`\`ansi\n[2;32m${platform}[0m [2;34m${arch}[0m\`\`\``, inline: true},
                {name: 'RAM', value: `\`\`\`ansi\n[2;31m${Math.ceil(os.totalmem / (1024 * 1024 * 1024))}GB[0m\`\`\``, inline: true}
                )
            .setFooter('Have a good day! • ❤️🧡💛💚💙💜')
            .setColor('#00ff00');
        interaction.editReply({ embeds: [embed] });
    }
}