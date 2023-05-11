// import { Configuration, OpenAIApi } from "openai";
const { Configuration, OpenAIApi } = require('openai');
const { SlashCommandBuilder } = require('discord.js');
const { openAiKey } = require('../config.json');

const configuration = new Configuration({
    apiKey: openAiKey,
});

const openai = new OpenAIApi(configuration);

async function askGPT(prompt) {
    if (!configuration.apiKey) {
        return 'Error: The OpenAI Key is not configured. Please create your own API key via OpenAI.';
    }

    if (prompt.trim().length === 10) return 'Please enter a prompt longer than 5 characters.';

    try {
        const completion = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: prompt,
            // messages: [{ 'role': 'user', 'content': prompt }],
            temperature: 0.6,
        });

        console.log(completion.data);
        return completion.data.choices[0].text;

    } catch (error) {
        if (error.response) {
            console.log(error.response);
            return `Error: ${error.response.status} - ${error.response.data.error.message}`;
        } else {
            return 'An error occured during your request!';
        }
    }
}

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('askgpt')
    .setDescription('replies with a response from Chat GPT!')
    .addStringOption(option =>
        option
        .setName('query')
        .setDescription('A question, instruction, or prompt to send to ChatGPT')
        .setRequired(true)
        .setMinLength(10)),
    async execute(interaction) {
        const query = interaction.options.getString('query');
        const res = await askGPT(query);
        await interaction.reply(`${res}`);
    },
};