import { OWLogs, validate } from '../../../Utils/Utils/OWLogs.js';
import { Evelyn } from '../../../Evelyn.js';
import { APIMessage, GuildChannel } from 'discord.js';
import { Discord, On } from 'discordx';

@Discord()
export class ChannelDelete {
	@On({ event: 'channelDelete' })
	async channelDelete(
		[channel]: [GuildChannel],
		client: Evelyn,
	): Promise<APIMessage> {
		const { guild } = channel;

		if (!(await validate(guild))) return;
		const logs = new OWLogs(guild, client);

		return await logs.channelDelete(channel);
	}
}
