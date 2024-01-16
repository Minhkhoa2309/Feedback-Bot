const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { BASE_URL } = require('../../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('feedback')
        .setDescription('Collects user feedback')
        .addStringOption(option =>
            option.setName('feedback')
                .setDescription('Provide your feedback')
                .setRequired(true)
        ),

    /** @param {import('commandkit').SlashCommandProps} param0 */
    run: async ({ interaction }) => {
        const feedbackMessage = interaction.options.getString('feedback');
        const userId = interaction.user.id;
        const username = interaction.user.username;
        const channelId = interaction.channelId;

        // Make an HTTP POST request to your Express API endpoint
        try {
            await axios.post(`${BASE_URL}/api/comment`, {
                content: feedbackMessage,
                userId,
                username,
                channelId
            });

            interaction.reply(`Thanks for reaching out! We’ll be passing this along to the team directly! Good luck playing the game!`);
        } catch (error) {
            console.error(error);
            interaction.reply('Sorry, there was an error processing your feedback. Please try again later.');
        }
    }
};
