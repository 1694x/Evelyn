const { ButtonInteraction, EmbedBuilder } = require("discord.js");
const client = require("../structures/index.js");

module.exports = {
  id: "pause",
  /**
   * @param {ButtonInteraction} interaction
   */
  async execute(interaction) {
    const { guildId, user } = interaction;

    const player = client.manager.players.get(guildId);
    const embed = new EmbedBuilder().setColor("Blurple").setTimestamp();

    if (!player) return;

    await interaction.deferReply();

    if (!player.paused) {
      player.pause(true);

      embed.setDescription("🔹 | Paused.").setFooter({
        text: `Action executed by ${user.username}.`,
        iconURL: user.avatarURL({ dynamic: true }),
      });
      return interaction.editReply({ embeds: [embed] });
    }

    if (player.paused) {
      player.pause(false);

      embed.setDescription("🔹 | Resumed.").setFooter({
        text: `Action executed by ${user.username}.`,
        iconURL: user.avatarURL({ dynamic: true }),
      });
      return interaction.editReply({ embeds: [embed] });
    }
  },
};
