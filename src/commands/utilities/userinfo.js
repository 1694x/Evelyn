const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  botPermissions: ["SendMessages"],
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Shows information about a user.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Provide a target.")
        .setRequired(false)
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const target = interaction.options.getUser("target") || interaction.member;
    await target.user.fetch();

    const userinfoEmbed = new EmbedBuilder()
      .setColor("Grey")
      .setAuthor({
        name: `${target.user.tag}`,
        iconURL: `${target.user.avatarURL({ dynamic: true })}`,
      })
      .setThumbnail(target.user.avatarURL({ dynamic: true }))
      .addFields(
        { name: "🔹 | ID", value: `> ${target.user.id}`, inline: true },
        {
          name: "🔹 | Member since",
          value: `> <t:${parseInt(target.joinedTimestamp / 1000)}:R>`,
        },
        {
          name: "🔹 | Discord member since",
          value: `> <t:${parseInt(target.user.createdTimestamp / 1000)}:R>`,
        },
        {
          name: "🔹 | Roles",
          value:
            `${target.roles.cache
              .map((r) => r)
              .join(" ")
              .replace("@everyone", "")}` || "None.",
        }
      );
    return interaction.reply({ embeds: [userinfoEmbed] });
  },
};
