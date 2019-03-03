const Discord = require("discord.js");
const fs = require("fs");
let config = require("../botconfig.json");

module.exports.noPerms = (message, perm) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setTitle("Niewystarczające Permisje")
        .setColor(config.red)
        .addField("Wymagana Permisja", perm);

    message.channel.send(embed);
}

module.exports.equalPerms = (message, user, perms) => {

    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor(config.red)
        .setTitle("Błąd")
        .addField(`${user} ma permisje`, perms);

    message.channel.send(embed);

}

module.exports.botuser = (message) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Błąd")
        .setDescription("Nie możesz zbanować bota.")
        .setColor(config.red);

    message.channel.send(embed);
}

module.exports.cantfindUser = (channel) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Błąd")
        .setDescription("Nie znaleziono użytkownika.")
        .setColor(config.red);

    channel.send(embed);
}

module.exports.noReason = (channel) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Błąd")
        .setDescription("Brakuje powodu.")
        .setColor(config.red);

    channel.send(embed);
}
