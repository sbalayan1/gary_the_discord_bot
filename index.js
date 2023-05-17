// this is our command handler. This dynamically reads the files in our commands folder and executes the commands
// the fs module is Node's native file system module. fs is used to read the commands directory
// path is Node's native path utility module. path helps construct paths to access files and directories. One of the advantages of the path module is that it automatically detects the operating system and uses the appropriate joiners.
const fs = require('node:fs');
const path = require('node:path');

// requires the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const token = process.env['token'];

// creates a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// attaches a .commands property to the client instance so that we can access commands in other files
// Collection class extends JavaScript's native Map class, and includes more extensive, useful functionality. Collection is used to store and efficiently retrieve commands for execution.
client.commands = new Collection();

// initializes a cooldowns property with a Collection to store cooldowns of commands
client.cooldowns = new Collection();

const commandsPath = path.join(__dirname, 'commands');
// reads the contents of ./commands and filters files that end with .js
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// iterate through the commandFiles array, require each file, and update the commands property with the command data and functionality
for (const file of commandFiles) {
    // file stands for the filename witin commands like ping.js, server.js, and user.js
    const filePath = path.join(commandsPath, file);

    // command represents the exported module obj and should contain a data and execute properties
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

// When the client is ready, run the code below once.
// c stands for the "client". This way we don't mix up which client we're talking about
client.once(Events.ClientReady, (c) => {
	console.log(`Hi! ${c.user.tag} is ready!`);
});

// The below lets our bot receive command interactions

// creates a listener for the InteractionCreate event that executes the callback function when the application receives an interaction.
client.on(Events.InteractionCreate, async interaction => {
    // make sure to exit the handler if the interaction is not a slash command
    if (!interaction.isChatInputCommand()) return;

    // when the bot receives an InteractionCreate event, the interaction object contains all the information necessary to dynamically retrieve and execute commands.
    // To execute a command, get the matching command from the client.commands collection based on the interaction.commandName
    // .client and .commandName are properties available on the interaction obj
    const command = client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No matching command name ${interaction.commandName} was found.`);
        return;
    }

    // the client refers to the client instance on line 12
    const { cooldowns } = client;

    // Adds the command and a new collection to the cooldowns to collection if the current command is not in the cooldowns collection
    if (!cooldowns.has(command.data.name)) {
        cooldowns.set(command.data.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.data.name);
    const cooldownAmt = command.cooldown ? command.cooldown * 1000 : 0;

    // if the user has already used this command in this session, get the timestamp, calculate the expiration time, and inform the user of the amount of time they need to wait.
    if (timestamps.has(interaction.user.id)) {
        const expirationTime = timestamps.get(interaction.user.id) + cooldownAmt;

        if (now < expirationTime) {
            const expiredTimestamp = Math.round(expirationTime / 1000);
            return interaction.reply({ content: `Please wait, you are on a cooldown for ${command.data.name}. You can use it again after <t:${expiredTimestamp}:R>.`, ephemeral: true });
        }

    }

    timestamps.set(interaction.user.id, now);
    setTimeout(() => { timestamps.delete(interaction.user.id); }, cooldownAmt);

    // once we have a command with the necessary properties, call the execute method on the command and pass the interaction obj as the argument.
    try {
        console.log(`A slash command to ${interaction.commandName} was made by ${interaction.user}!`);
        // if (interaction.commandName === 'askgpt') {
        //     await command.execute(interaction);
        // }
        // console.time('executing askgpt command');
        await command.execute(interaction);
        // console.timeLog('command complete');
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
    }

});

// Log in to Discord with your client's token
client.login(token);