const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} = require("discord.js");
const API = require("../../modules/nekoModule.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("image")
    .setDescription("Generate various images.")
    .addStringOption((options) =>
      options
        .setName("type")
        .setDescription("Select the type of filter you would like to use.")
        .setRequired(true)
        .addChoices(
          { name: "🔹 | Awooify", value: "awooify" },
          { name: "🔹 | Baguette", value: "baguette" },
          { name: "🔹 | Blurpify", value: "blurpify" },
          { name: "🔹 | Captcha", value: "captcha" },
          { name: "🔹 | Change My Mind", value: "changemymind" },
          { name: "🔹 | Deepfry", value: "deepfry" },
          { name: "🔹 | Kanna", value: "kannagen" },
          { name: "🔹 | PH Comment", value: "phcomment" },
          { name: "🔹 | Ship", value: "ship" },
          { name: "🔹 | Threats", value: "threats" },
          { name: "🔹 | Trash", value: "trash" },
          { name: "🔹 | Trump Tweet", value: "trumptweet" },
          { name: "🔹 | Tweet", value: "tweet" },
          { name: "🔹 | Who would win?", value: "whowouldwin" }
        )
    )
    .addUserOption((option) =>
      option
        .setName("user1")
        .setDescription("Provide a target.")
        .setRequired(false)
    )
    .addUserOption((option) =>
      option
        .setName("user2")
        .setDescription("Provide a target.")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Provide the text that will be shown in the image.")
        .setRequired(false)
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const { options } = interaction;
    const choices = options.getString("type");

    const user1 = options.getUser("user1");
    const user2 = options.getUser("user2");
    const text = options.getString("text");

    let image;

    await interaction.deferReply();

    switch (choices) {
      case "awooify":
        return API.awooify(user1, user2, interaction);

      case "baguette":
        return API.baguette(user1, user2, interaction);

      case "blurpify":
        return API.blurpify(user1, user2, interaction);

      case "captcha":
        return API.captcha(user1, user2, interaction);

      case "changemymind":
        return API.changemymind(text, interaction);

      case "deepfry":
        return API.deepfry(user1, user2, interaction);

      case "kannagen":
        return API.kannagen(text, interaction);

      case "phcomment":
        return API.phcomment(user1, user2, text);

      case "ship":
        return API.ship(user1, user2);

      case "threats":
        return API.threats(user1, user2);

      case "trash":
        return API.trash(user1, user2);

      case "trumptweet":
        return API.trumptweet(text);

      case "tweet":
        return API.tweet(user1, user2, text, interaction);

      case "whowouldwin":
        return API.whowouldwin(user1, user2, interaction);
    }
  },
};
