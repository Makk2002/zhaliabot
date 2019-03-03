const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Informacje o Bocie")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Nazwa bota", bot.user.username)
    .addField("Bot Powstał", bot.user.createdAt);

    message.channel.send(botembed);
}

exports.conf = {
    enabled: true,
    runIn: ["text", "dm"],
    aliases: [],
    permLevel: 0,
    botPerms: []
};

module.exports.help = {
  name:"botinfo"
};
