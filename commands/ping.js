// This is an individual command file which contains the slash command's definitions and functionality
// the slash command builder is a class used to construct command definitions
const { SlashCommandBuilder } = require('discord.js');

// a slash command definition must have a name and description at minimum as well as a function to run when the command is used.
// names must be between 1 - 32 characters in length, must contain no capital letters or spaces, or symbols
// new SlashCommandBuilder()
//     .setName('ping')
//     .setDescription('replies with pong!'),


// The below is a function that responds when the command 'ping' is used. Using an interaction response confirms to discord that the bot successfully received an interaction and responded to the user.
// async execute(i) {
//     await i.reply('Pong!')
// };

// note the above is defining an async function called execute!

// export the above via module.exports. This lets other files read the command definition and the execute method which contains the interaction functionality.


module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder().setName('ping').setDescription('replies with pong!'),
	async execute(interaction) {
		await interaction.reply('pong!');
	},
};

// if you need to access the client instance within a client file, use interaction.client