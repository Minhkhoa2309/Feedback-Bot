const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { BASE_URL } = require('../../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('change-comment-status')
        .setDescription('Change the status of a feedback comment')
        .addStringOption(option =>
            option.setName('status')
                .setDescription('New status for the feedback comment')
                .setRequired(true)
                .addChoices(
                    { name: 'Resolve', value: 'Resolved' },
                    { name: 'Pending', value: 'Pending' }
                )
        )
        .addStringOption(option =>
            option.setName('commentid')
                .setDescription('ID of the feedback comment')
                .setRequired(true)
        ),

    run: async ({ interaction }) => {
        // Check if the user is an admin (customize this check based on your role/admin system)
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply('You do not have permission to use this command.');
        }

        const status = interaction.options.getString('status');
        const commentId = interaction.options.getString('commentid');

        try {
            await axios.put(`${BASE_URL}/api/comment/status/${status}`, { commentId });

            interaction.reply(`Feedback comment status changed to ${status}.`);
        } catch (error) {
            console.error(error);
            interaction.reply(`Sorry, there was an error changing the feedback comment status. Please try again later. \n ${error}`);
        }
    }
};
