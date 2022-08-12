const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const superagent = require("superagent");

module.exports = {
  name: "poke",
  description: "Poke someone.",
  public: true,
  options: [
    {
      name: "target",
      description: "Provide a target.",
      type: 6,
      required: true,
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const target = interaction.options.getMember("target");
      await target.user.fetch();
    const { body } = await superagent.get("https://api.waifu.pics/sfw/poke");

    const lonerPoke = new MessageEmbed()
      .setAuthor({
        name: `${client.user.username} pokes ${interaction.user.username}!`,
        iconURL: `${client.user.avatarURL({ dynamic: true })}`,
      })
      .setImage(body.url)
      .setTimestamp();

    if (target.id === interaction.user.id)
    return interaction.reply({ embeds: [lonerPoke] });

    const pokeEmbed = new MessageEmbed()
      .setColor("BLURPLE")
      .setAuthor({
        name: `${interaction.user.username} pokes ${target.user.username}!`,
        iconURL: `${interaction.user.avatarURL({ dynamic: true })}`,
      })
      .setImage(body.url)
      .setTimestamp();
    interaction.reply({ embeds: [pokeEmbed] });
  },
};