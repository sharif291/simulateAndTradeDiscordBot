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
      messages.author.username == "Option Bot" ||
      messages.author.username == "sharif291"
    ) {
      // console.log(messages.content);
      messages.delete();
      var dt = new Date();
      var offset = -240; //Timezone offset for EST in minutes.
      var estDate = new Date(dt.getTime() + offset * 60 * 1000);
      // console.log(estDate);
      // console.log(estDate.getUTCHours());
      // console.log(estDate.getUTCMinutes());
      h_now = estDate.getUTCHours() * 60 + estDate.getUTCMinutes();
      var x = messages.content;
      content = typeof x === "string" ? JSON.parse(x) : x;
      console.log(content);
      if (h_now > 570 && h_now <= 960) {
        // const { symbol, entry, type: _type } = content;
        const {
          type: _type,
          symbol: _symbol,
          close: _close,
          position: _position,
          volume: _volume,
        } = content;
        // const expiration = getNextFriday(new Date());

        // inside a command, event listener, etc.
        const exampleEmbed = new MessageEmbed()
          .setColor("#2eff00")
          .setAuthor({
            name: "OPTION SCALP ALERT",
            iconURL:
              "https://s3.tradingview.com/userpics/37305410-SbsU_big.png",
          })
          // .setThumbnail(
          //   "https://s3.tradingview.com/userpics/37305410-SbsU_big.png"
          // )
          .addFields(
            {
              name: ` Type: ${_type}\nSymbol: ${_symbol}\nPrice: ${_close}\nPosition: ${_position}\nVolume: ${_volume}`,
              value: "\u200b",
              inline: false,
            }
            // {
            //   name: `Symbol: ${_symbol}`,
            //   value: "\u200b",
            //   inline: false,
            // },
            // {
            //   name: `Price: ${_close}`,
            //   value: "\u200b",
            //   inline: false,
            // },

            // {
            //   name: `Position: ${_position}`,
            //   value: "\u200b",
            //   inline: false,
            // },
            // {
            //   name: `Volume: ${_volume}`,
            //   value: "\u200b",
            //   inline: false,
            // }
          )
          .setTimestamp();
        messages.channel.send({ embeds: [exampleEmbed] });
      }
    }
  } catch (err) {
    console.log(err);
  }
});
client.login(process.env.LIVE_TOKEN);
