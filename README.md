# Lex
Lex, a private virtual assistant for Discord.

# Installing
Clone this repository to your host machine.
```git clone https://github.com/DexTheExplorer/Lex.git```

Fill out the configuration.json file.
```nano configuration.json```

Run index.js.
```pnpm start```or```npm start```

## Add commands
- Create a file in /commands/ with the standard discord.js structure.
- Register root command permission in /extras/data.json.
- Run `node deployCmds.js` or start the bot directly `pnpm start`.

## How do I fill out configuration.json?!
- `botName` : Input the resulting bot name. Can be different from project name.
- `token` : Input the token you received from the Discord developers application page.
- `clientId` : Input the client ID you received from the Discord developers application page.
- `guilds` : Input all guilds you want the bot to operate in here.
- `authorized` : Input all users to have root rights in here.

**[WARNING] ROOT USERS HAVE THE ABILITY TO RUN UNSIGNED CODE ON YOUR HOST MACHINE. DO NOT GIVE THIS TO YOUR DISCORD SERVER "ADMINISTRATORS".**
