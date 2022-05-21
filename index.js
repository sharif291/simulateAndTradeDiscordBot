require("dotenv").config();
const { Client, Intents } = require("discord.js");
const { MessageEmbed } = require("discord.js");

function getNextFriday(date = new Date()) {
  const dateCopy = new Date(date.getTime());

  const nextFriday = new Date(
    dateCopy.setDate(
      dateCopy.getDate() + ((7 - dateCopy.getDay() + 5) % 7 || 7)
    )
  );

  return nextFriday.toLocaleDateString();
}

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
client.once("ready", () => {
  console.log("BOT IS ONLINE"); //message when bot is online
});

client.on("messageCreate", async function (messages) {
  try {
    if (
      messages.author.username == "Options Bot" ||
      messages.author.username == "sharif291"
    ) {
      if (messages.content.title == "bot" || "bot-1") {
        messages.delete();
      }
      var dt = new Date();
      var offset = -240; //Timezone offset for EST in minutes.
      var estDate = new Date(dt.getTime() + offset * 60 * 1000);
      console.log(estDate);
      console.log(estDate.getUTCHours());
      console.log(estDate.getUTCMinutes());
      h_now = estDate.getUTCHours() * 60 + estDate.getUTCMinutes();
      var x = messages.content;
      content = typeof x === "string" ? JSON.parse(x) : x;
      if (
        (content.title.toLowerCase() === "bot" || "bot-1") &&
        h_now > 570 &&
        h_now <= 960
      ) {
        // const { symbol, entry, type: _type } = content;
        const symbol = content.symbol;
        // const entry = content.entry;
        const _type = content.type;
        const expiration = getNextFriday(new Date());

        // inside a command, event listener, etc.
        const exampleEmbed = new MessageEmbed()
          .setColor(_type.toLowerCase() === "call" ? "#00FF00" : "#ff0505")
          .setAuthor({
            name: "Simulate & Trade",
            iconURL:
              "https://s3.tradingview.com/userpics/37305410-SbsU_big.png",
          })
          .setThumbnail(
            "https://s3.tradingview.com/userpics/37305410-SbsU_big.png"
          )
          .addFields(
            {
              name: "Option Alert",
              value:
                content.title.toLowerCase() === "bot"
                  ? "Low Risk, Low Reward"
                  : "High Risk, High Reward",
              inline: false,
            },
            {
              name: "Type",
              value: _type,
              inline: true,
            },
            {
              name: "Symbol",
              value: symbol,
              inline: true,
            },

            {
              name: "Position",
              value: "Day Trade",
              inline: false,
            },
            {
              name: "Expiration",
              value: expiration,
              inline: false,
            }
          )
          .setTimestamp();
        messages.channel.send({ embeds: [exampleEmbed] });
      }
    }
  } catch (err) {
    console.log(err.message);
  }
});
client.login(process.env.LIVE_TOKEN);
