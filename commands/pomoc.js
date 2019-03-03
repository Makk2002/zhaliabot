const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const red = botconfig.red;
const green = botconfig.green;
const orange = botconfig.orange;

module.exports.run = async (bot, message, args) => {

    let pomocEmbed = new Discord.RichEmbed()
    .setTitle("Pomoc")
    .setColor("#cc0000")
    .addField("botinfo", `pokazuje informacje o bocie`)
    .addField("serverinfo", `pokazuje informacje o serwerze`)
    .addField("poziom", `pokazuje twój aktualny poziom`)
    .addField("report", `reportuje osobe np. >report @ProGamer jest toksyczny`);


      message.channel.send(pomocEmbed);

}

      module.exports.help = {
        name: "pomoc"
      }
