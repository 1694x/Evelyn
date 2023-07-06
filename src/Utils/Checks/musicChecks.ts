import { Player } from '@shadowrunners/automata';
import { InteractionResponse, EmbedBuilder } from 'discord.js';
import type {
	ExtendedButtonInteraction,
	ExtendedChatInteraction,
} from '../../Interfaces/Interfaces.js';

/**
 * Handles all checks regarding voice, queues and currently playing songs.
 * @param {string} checkType The type of check.
 * @param {ChatInputCommandInteraction} interaction The interaction object.
 * @param {Player} player The player.
 * @returns {Promise<InteractionResponse<boolean>>}
 */
export function check(
	checkType: string[],
	interaction: ExtendedChatInteraction | ExtendedButtonInteraction,
	player?: Player,
): Promise<InteractionResponse<boolean>> {
	const { member, guild } = interaction;
	const yourVC = member.voice.channel;
	const herVC = guild.members.me.voice.channelId;
	const embed = new EmbedBuilder().setColor('Blurple').setTimestamp();

	for (const providedCheck of checkType) {
		switch (providedCheck) {
		case 'voiceCheck':
			if (!yourVC)
				return interaction.reply({
					embeds: [
						embed.setDescription(
							'🔹 | You need to be in a voice channel to use this command.',
						),
					],
					ephemeral: true,
				});

			if (herVC && yourVC.id !== herVC)
				return interaction.reply({
					embeds: [
						embed.setDescription(
							`🔹 | Sorry but I'm already playing music in <#${herVC}>.`,
						),
					],
					ephemeral: true,
				});

			break;

		case 'checkQueue':
			if (player?.queue.size === 0)
				return interaction.reply({
					embeds: [
						embed.setDescription('🔹 | There is nothing in the queue.'),
					],
					ephemeral: true,
				});

			break;

		case 'checkPlaying':
			if (!player?.isPlaying)
				return interaction.reply({
					embeds: [embed.setDescription('🔹 | I\'m not playing anything.')],
					ephemeral: true,
				});

			break;

		default:
			break;
		}
	}
}

/**
 * Checks the provided query to block YouTube and YTM links.
 * @param {String} query The provided query.
 * @param {ExtendedChatInteraction} interaction The interaction object.
 * @returns {Promise<InteractionResponse<boolean>>}
 */
export function checkQuery(
	query: string,
	interaction: ExtendedChatInteraction,
): Promise<InteractionResponse<boolean>> {
	const YTRegex =
		/(http(s)?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.be)\/[a-zA-Z0-9-_]+/;
	const YTMRegex =
		/(http(s)?:\/\/)?(music\.)?(m\.)?(youtube\.com|youtu\.be)\/[a-zA-Z0-9-_]+/;

	if (YTRegex.test(query) || YTMRegex.test(query))
		return interaction.reply({
			embeds: [
				this.embed
					.setTitle('Unsupported Platform')
					.setDescription(
						'Hiya! **Support for this platform has been dropped as a result of decisions outside of our control. To alleviate this issue, you can try:**\n\n> Providing a direct link from a platform we support (SoundCloud, Spotify, Deezer, Bandcamp etc).\n> Search for it and Evelyn will try to provide the best result she finds.\n\nYou can read the full announcement in our support server linked below.',
					),
			],
		});
}
