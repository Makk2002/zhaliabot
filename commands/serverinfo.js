const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Nazwa Servera", message.guild.name)
    .addField("Server Powstał", message.guild.createdAt)
    .addField("Dołączyłeś", message.member.joinedAt)
    .addField("Wszyscy Użytkownicy", message.guild.memberCount);

    message.channel.send(serverembed);
}

module.exports.help = {
  name:"serverinfo"
}
