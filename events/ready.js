import os from 'os';

export default {
    name: 'ready',
    once: true,
    async execute(client) {
        process.stdout.write(`[DEBUG] ${os.platform} ${os.arch} with ${Math.ceil(os.totalmem / (1024 * 1024 * 1024))}GB available memory.\n`);
        process.stdout.write(`Checking Discord API connection...`);
        if (client.ws.ping) {
            process.stdout.write(` yes\nLogged in as ${client.user.tag}.\n`);
        } else {
            process.stdout.write(` err\nThere was an issue checking the Discord API connection.\n${client.user.tag} may not be able to login.\n`);
        }
        client.user.setActivity(`this ${os.arch()} machine`, { type: 'WATCHING' });
    },
};