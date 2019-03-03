const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

  message.delete();
  let botmessage = args.join(" ");
  message.channel.send(botmessage);
}

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [""],
  permLevel: 3,
  botPerms: ["KICK_MEMBERS", "EMBED_LINKS"],
  requiredFuncs: ["modEmbed", "userSearch"]
};

module.exports.help = {
  name: "say"
};
