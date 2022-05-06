require("dotenv").config();
const routes = require("express").Router();
const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
routes.get("/", async (req, res) => {
  client.once("ready", () => {
    console.log("BOT IS ONLINE"); //message when bot is online
  });


  client.on("message", function (messages) {
    if (messages.content.toLocaleLowerCase() === "hello")
      messages.channel.send("hello" + " " + messages.author.username); //reply hello word message with senders name
  });

  // client.on("message", async (message) => {
  //   const newEmbed = new Discord.MessageEmbed()
  //     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  //     .setDescription(`${message.content}`)
  //     .setColor("#d32256")
  //     .setImage(message.attachments.first().proxyURL)
  //     .setTimestamp()
  //     .setFooter("Instagram", "ImageOfInsta");
  //   message.channel.send(newEmbed);
  // });

  client.login(process.env.TOKEN);
  return res.send("Server running OK.");
});

// Exporting all routes together
module.exports = routes;
