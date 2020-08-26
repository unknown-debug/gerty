const http = require("http"), //what happened ?
  express = require("express"),
  app = express();

app.get("/", (request, response) => {
  console.log(Date.now() + " Pinged");
  response.sendStatus(200);
});  
app.listen(process.env.PORT);
const { token, default_prefix } = require("./config.json");
const { config } = require("dotenv");
const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const client = new discord.Client({
  disableEveryone: true
});
const db = require('quick.db');
client.queue = new Map();

client.commands = new discord.Collection();
client.aliases = new discord.Collection();


client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;

  let prefix = db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = default_prefix;

  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
    message.channel.send(
      new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(
          `**My Prefix : ${prefix} | Help Command : ${prefix}Help**`
        )
        .setFooter(`Pinged By ${message.author.username}`)
    );
  }
});


["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;


if (!message.content.startsWith(default_prefix)) return;

    if (!message.member)
      message.member = await message.guild.fetchMember(message);

    const args = message.content
      .slice(default_prefix.length)
      .trim()
      .split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command) command.run(client, message, args);
});



client.on("ready", () => {
  console.log("I am Reday to Go");
  client.user.setActivity(db.get(`status`));
});

client.on('message', message => {
if(message.content ===  '*servers') {
message.reply(client.guilds.cache.size)
}
});

client.login(token);