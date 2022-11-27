const { ButtonInteraction, EmbedBuilder } = require("discord.js");
const { createTranscript } = require("discord-html-transcripts");
const setupData = require("../structures/schemas/guild.js");
const ticketData = require("../structures/schemas/ticket.js");

module.exports = {
  id: "closeTicket",
  /**
   * @param {ButtonInteraction} interaction
   */
  async execute(interaction) {
    const { guild, member, channel } = interaction;

    const Embed = new EmbedBuilder();

    const ticketsData = await ticketData.findOne({
      id: guild.id,
      ticketId: channel.id,
    });

    const gTicketData = await setupData.findOne({ id: guild.id });

    if (
      !member.roles.cache.find(
        (r) => r.id === gTicketData.tickets.ticketHandlers
      )
    ) {
      return interaction.reply({
        embeds: [
          Embed.setColor("Blurple")
            .setDescription("🔹 | Only the support team can use these buttons.")
            .setTimestamp(),
        ],
        ephemeral: true,
      });
    }

    if (ticketsData.closed === true)
      return interaction.reply({
        embeds: [
          Embed.setColor("Blurple")
            .setDescription("🔹 | This ticket is already closed.")
            .setTimestamp(),
        ],
      });

    if (!ticketsData.closer === member.id)
      return interaction.reply({
        embeds: [
          Embed.setColor("Blurple")
            .setDescription(
              "🔹 | You are not the user that closed this ticket!"
            )
            .setTimestamp(),
        ],
        ephemeral: true,
      });

    await ticketData.findOneAndUpdate(
      {
        ticketId: channel.id,
      },
      {
        closed: true,
        closer: member.id,
      }
    );

    const attachment = await createTranscript(channel, {
      limit: -1,
      returnType: "buffer",
      fileName: `Ticket - ${ticketsData.creatorId}.html`,
    });

    const message = await guild.channels.cache
      .get(gTicketData.tickets.transcriptChannel)
      .send({
        embeds: [
          Embed.setColor("Blurple")
            .setTitle("Ticket Closed")
            .addFields(
              { name: "Opened by", value: `<@!${ticketsData.creatorId}>` },
              {
                name: "Claimed by",
                value: `<@!${ticketsData.claimer}>` || "No one.",
              },
              { name: "Closed at", value: `${new Date().toLocaleString()}` }
            ),
        ],
        files: [attachment],
      });

    interaction.reply({
      embeds: [
        Embed.setDescription(
          `🔹 | Transcript saved: [transcripthere](${message.url}).`
        ).setTimestamp(),
      ],
    });
    setTimeout(() => {
      channel.delete();
    }, 10 * 1000);
  },
};
