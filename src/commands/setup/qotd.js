const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { GuildText } = ChannelType;

module.exports = {
    botPermissions: ['SendMessages', 'EmbedLinks', 'Connect', 'Speak'],
    data: new SlashCommandBuilder()
        .setName('qotd')
        .setDescription('Manage and configure QOTDs.')
        .addSubcommand((options) =>
            options
                .setName('toggle')
                .setDescription('Gives you the ability to toggle QOTDs on and off.')
                .addStringOption((option) =>
                    option
                        .setName("choice")
                        .setDescription("Select one of the choices.")
                        .setRequired(true)
                        .addChoices(
                            { name: "Enable", value: "enable" },
                            { name: "Disable", value: "disable" }
                        )
                )
        )
        .addSubcommand((options) =>
            options
                .setName('set-channel')
                .setDescription('Sets the channel where QOTDs will be sent.')
                .addChannelOption((option) =>
                    option
                        .setName('channel')
                        .setDescription('Provide the channel.')
                        .addChannelTypes(GuildText)
                        .setRequired(true),
                ),
        ),
};
