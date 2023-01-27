// eslint-disable-next-line no-unused-vars
const { ButtonInteraction, EmbedBuilder, Client } = require('discord.js');
const MusicUtils = require('../modules/Utils/musicUtils.js');

module.exports = {
	id: 'shuffle',
	/**
	 * @param {ButtonInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const { guildId, user } = interaction;

		const player = client.manager.players.get(guildId);
		const embed = new EmbedBuilder().setColor('Blurple');
		const musicUtils = new MusicUtils(interaction, player);

		await interaction.deferReply();

		if (musicUtils.check(["voiceCheck"])) return;

		player.queue.shuffle();

		return interaction.editReply({
			embeds: [
				embed.setDescription('🔹 | Shuffled the queue.').setFooter({
					text: `Action executed by ${user.username}.`,
					iconURL: user.avatarURL({ dynamic: true }),
				}),
			],
		});
	},
};
