const {
  Client,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ModalSubmitInteraction,
  PermissionsBitField,
  ButtonStyle,
} = require("discord.js");
const { endGiveaway } = require("../utils/giveawayFunctions.js");
const DB = require("../structures/schemas/giveaway.js");
const { ManageGuild } = PermissionsBitField.Flags;
const ms = require("ms");

module.exports = {
  id: "createGiveaway",
  permission: ManageGuild,
  /**
   * @param {ModalSubmitInteraction} interaction
   * @param {Client} client
   */
  execute(interaction) {
    const embed = new EmbedBuilder().setColor("Blurple").setTimestamp();

    const prize = interaction.fields
      .getTextInputValue("giveaway-prize")
      .slice(0, 256);

    const winners = Math.round(
      parseFloat(fields.getTextInputValue("giveaway-winners"))
    );

    const duration = fields.getTextInputValue("giveaway-duration");

    if (isNaN(winners) || !isFinite(winners) || winners < 1) {
      embed.setDescription("🔹 | Please provide a valid winner count.");
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (duration === undefined) {
      embed.setDescription("🔹 | Please provide a valid duration.");
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("joinGiveaway")
        .setEmoji("🎉")
        .setStyle(ButtonStyle.Success)
        .setLabel("Join")
    );

    interaction
      .reply({
        content: "🎉 **A wild giveaway has appeared!** 🎉",
        embeds: [giveawayEmbed],
        components: [button],
        fetchReply: true,
      })
      .then(async (message) => {
        await DB.create({
          id: interaction.guild.id,
          channel: interaction.channel.id,
          endTime: formattedDuration,
          hasEnded: false,
          hoster: interaction.user.id,
          prize: prize,
          winners: winners,
          isPaused: false,
          messageID: message.id,
          enteredUsers: [],
        }).then((data) => {
          setTimeout(() => {
            if (!data.hasEnded) endGiveaway(message);
          }, duration);
        });
      });
  },
};
