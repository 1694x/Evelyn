import { dropOffLogs, validate } from '../../../Utils/Utils/dropOffLogs.js';
import { EmbedBuilder, GuildMember } from 'discord.js';
import { Evelyn } from '../../../Evelyn.js';
import { Discord, On } from 'discordx';

@Discord()
export class GuildMemberAdd {
	@On({ event: 'guildMemberAdd' })
	async guildMemberAdd([member]: [GuildMember], client: Evelyn) {
		const { guild, user } = member;

		if (!(await validate(guild))) return;

		const embed = new EmbedBuilder()
			.setColor('Blurple')
			.setAuthor({
				name: user.tag,
				iconURL: user.displayAvatarURL(),
			})
			.setTitle('Member Joined')
			.addFields(
				{
					name: '🔹 | Member Name',
					value: `> ${user.tag}`,
				},
				{
					name: '🔹 | Member ID',
					value: `> ${user.id}`,
				},
				{
					name: '🔹 | Account Age',
					value: `> <t:${parseInt(
						(user.createdTimestamp / 1000).toString(),
					)}:R>`,
				},
			)
			.setFooter({ text: `${guild.name}` })
			.setTimestamp();

		return dropOffLogs(guild, client, embed);
	}
}
