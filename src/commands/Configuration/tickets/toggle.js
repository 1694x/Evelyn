// eslint-disable-next-line no-unused-vars
const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const GDB = require('../../../structures/schemas/guild.js');

module.exports = {
	subCommand: 'tickets.toggle',
	/**
	 * @param {ChatInputCommandInteraction} interaction
	 */
	async execute(interaction) {
		const { options, guildId } = interaction;
		const data = await GDB.findOne({ id: guildId });
		const embed = new EmbedBuilder().setColor('Blurple');

		switch (options.getString('choice')) {
		case 'enable':
			if (data.tickets.enabled === true)
				return interaction.reply({
					embeds: [
						embed.setDescription(
							'🔹 | The tickets system is already enabled.',
						),
					],
					ephemeral: true,
				});

			await GDB.findOneAndUpdate(
				{
					id: guildId,
				},
				{
					$set: {
						'tickets.enabled': true,
					},
				},
			);

			return interaction.reply({
				embeds: [
					embed.setDescription('🔹 | The tickets system has been enabled.'),
				],
				ephemeral: true,
			});

		case 'disable':
			if (data.tickets.enabled === false)
				return interaction.reply({
					embeds: [
						embed.setDescription(
							'🔹 | The tickets system is already disabled.',
						),
					],
					ephemeral: true,
				});

			await GDB.findOneAndUpdate(
				{
					id: guildId,
				},
				{
					$set: {
						'tickets.enabled': false,
					},
				},
			);

			return interaction.reply({
				embeds: [
					embed.setDescription('🔹 | The tickets system has been disabled.'),
				],
				ephemeral: true,
			});
		}
	},
};
