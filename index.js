const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const Komada = require("komada");
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
let xp = require("./xp.json");

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {

  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity(">pomoc", {type: "WATCHING"});

});

const permStructure = new Komada.PermLevels()
  .addLevel(0, false, () => true)
  .addLevel(2, false, (client,msg) => {
    if (!msg.guild || !msg.guild.settings.modRole) { return false; }
    const modRole = msg.guild.roles.get(msg.guild.settings.modRole);
    return modRole && msg.member.roles.has(modRole.id);
  })
  .addLevel(3, false, (client,msg) => {
    if (!msg.guild || !msg.guild.settings.adminRole) { return false; }
    const adminRole = msg.guild.roles.get(msg.guild.settings.adminRole);
    return adminRole && msg.member.roles.has(adminRole.id);
  })
  .addLevel(4, false, (client,msg) => msg.guild && msg.author.id === msg.guild.owner.id)
  .addLevel(9, false, (client,msg) => msg.author.id === config.secondary)
  .addLevel(10, false, (client,msg) => msg.author === client.owner);

const client = new Komada.Client({
    ownerID: botconfig.ownerID,
    prefix: botconfig.prefix,
    clientOptions: {
      fetchAllMembers: false,
    },
    cmdLogging: false,
});

bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }

  let xpAdd = Math.floor(Math.random() * 8) + 15;

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }


  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 800;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
    .setTitle("Poziom")
    .setColor("#cc0000")
    .addField("Nowy Poziom", curlvl + 1);

    //message.channel.send(lvlup).then(msg => {msg.delete(100)});
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });

  let prefix = prefixes[message.guild.id].prefixes;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

});

bot.login(process.env.BOT_TOKEN);
