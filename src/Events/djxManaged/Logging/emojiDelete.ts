import { dropOffLogs, validate } from '../../../Utils/Utils/dropOffLogs.js';
import { EmbedBuilder, AuditLogEvent, GuildEmoji } from 'discord.js';
import { Evelyn } from '../../../Evelyn.js';
import { Discord, On } from 'discordx';

@Discord()
export class EmojiDelete {
	@On({ event: 'emojiDelete' })
	async emojiDelete([emoji]: [GuildEmoji], client: Evelyn) {
		const { guild, name, id } = emoji;

		if (!(await validate(guild))) return;

		const fetchLogs = await guild.fetchAuditLogs<AuditLogEvent.EmojiDelete>({
			limit: 1,
		});
		const firstLog = fetchLogs.entries.first();

		const embed = new EmbedBuilder()
			.setColor('Blurple')
			.setAuthor({
				name: guild.name,
				iconURL: guild.iconURL(),
			})
			.setTitle('Emoji Deleted')
			.addFields(
				{
					name: '🔹 | Emoji Name',
					value: `> ${name}`,
				},
				{
					name: '🔹 | Emoji ID',
					value: `> ${id}`,
				},
				{
					name: '🔹 | Removed by',
					value: `> <@${firstLog.executor.id}>`,
				},
			)
			.setTimestamp();

		return dropOffLogs(guild, client, embed);
	}
}
