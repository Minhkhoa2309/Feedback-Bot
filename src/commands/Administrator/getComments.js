const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { BASE_URL } = require('../../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-comments')
        .setDescription('Get feedback comments'),

    run: async ({ interaction }) => {
        // Check if the user is an admin (customize this check based on your role/admin system)
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply('You do not have permission to use this command.');
        }

        try {
            const response = await axios.get(`${BASE_URL}/api/comments`);

            // Handle the response as needed (e.g., logging, replying to the user)
            const comments = response.data;

            if (comments.length === 0) {
                return interaction.reply({ content: 'No feedback comments found.', ephemeral: true });
            }

            // Format the comments for display
            const formattedComments = comments.map(comment => {
                const formattedTime = comment.statusEventTime ? new Date(comment.statusEventTime).toLocaleString() : 'N/A';
                return `Comment Id: ${comment._id}, Comment: ${comment.content}, UserID: ${comment.userId}, Username: ${comment.username}, ChannelID: ${comment.channelId}, Status: ${comment.status}, Status Event: ${formattedTime}`;
            }).join('\n');

            await interaction.reply({ content: `Feedback comments:\n${formattedComments}`, ephemeral: true });

        } catch (error) {
            console.error(error);
            await interaction.reply('Sorry, there was an error retrieving feedback comments. Please try again later.');
        }
    }
};
