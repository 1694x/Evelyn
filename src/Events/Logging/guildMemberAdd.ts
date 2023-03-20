import { Event } from '../../interfaces/interfaces.js';
import { GuildMember, EmbedBuilder } from 'discord.js';
import { webhookDelivery } from '../../functions/webhookDelivery.js';
import { GuildDB as DB } from '../../structures/schemas/guild.js';

const event: Event = {
	name: 'guildMemberAdd',
	async execute(member: GuildMember) {
		const { guild, user } = member;

		const data = await DB.findOne({
			id: guild.id,
		});

		if (!data?.logs?.enabled || !data?.logs?.webhook || user.bot) return;

		const embed = new EmbedBuilder().setColor('Blurple');

		return webhookDelivery(
			'logs',
			data,
			embed
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
						value: `> <t:${user.createdTimestamp / 1000}:R>`,
					},
				)
				.setFooter({ text: `${guild.name}` })
				.setTimestamp(),
		);
	},
};

export default event;
