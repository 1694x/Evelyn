const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
} = require("discord.js");
const guildBLK = require("../../structures/schemas/serverBlacklist.js");
const userBLK = require("../../structures/schemas/userBlacklist.js");

module.exports = {
  botPermissions: ["SendMessages"],
  developer: true,
  data: new SlashCommandBuilder()
    .setName("blacklist")
    .setDescription("Blacklist a user or server from using the bot.")
    .addSubcommand((options) =>
      options
        .setName("server")
        .setDescription("Blacklist a server.")
        .addStringOption((option) =>
          option
            .setName("serverid")
            .setDescription(
              "Provide the server ID of the server you would like to blacklist."
            )
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("reason")
            .setDescription("Provide the reason of the blacklist.")
            .setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("user")
        .setDescription("Blacklist a user.")
        .addStringOption((option) =>
          option
            .setName("userid")
            .setDescription(
              "Provide the ID of the user you would like to blacklist."
            )
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("reason")
            .setDescription("Provide the reason of the blacklist.")
            .setRequired(true)
        )
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const embed = new EmbedBuilder();
    const { options } = interaction;

    switch (options.getSubcommand()) {
      case "server": {
        const gldID = options.getString("serverid");
        const reason = options.getString("reason");
        const guild = client.guilds.cache.get(gldID);
        const gName = guild.name || "A mysterious guild";
        const gID = guild.id;

        const data = await guildBLK.findOne({ serverID: gID });
        if (!data) {
          const newBlacklist = new guildBLK({
            serverID: gID,
            reason: reason,
            time: Date.now(),
          });

          await newBlacklist.save();

          embed
            .setColor("Blurple")
            .setTitle(`${client.user.username} | Blacklist`)
            .setDescription(`🔹 | ${gName} has been successfully blacklisted.`)
            .addFields({ name: "🔹 | Reason", value: reason });
          return interaction.reply({ embeds: [embed] });
        }
      }
      case "user": {
        const userID = options.getString("userid");
        const reason = options.getString("reason");

        const user = await client.users.fetch(userID);
        const uName = user.tag || "A mysterious user";
        const uID = user.id;

        const data = await userBLK.findOne({ userid: uID });
        if (!data) {
          const newBlacklist = new userBLK({
            userid: uID,
            reason: reason,
            time: Date.now(),
          });

          await newBlacklist.save();

          embed
            .setColor("Blurple")
            .setTitle(`${client.user.username} | Blacklist`)
            .setDescription(`🔹 | ${uName} has been successfully blacklisted.`)
            .addFields({ name: "🔹 | Reason", value: reason });
          return interaction.reply({ embeds: [embed] });
        }
      }
    }
  },
};
