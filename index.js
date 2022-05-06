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
    var x = messages.content;
    console.log(typeof x)
    content = typeof x === "string" ? JSON.parse(x) : x;
    console.log(content)
    if (content.title === "bot") {
      console.log("here")
      messages.delete();
      // const { symbol, entry, type: _type } = content;
      const symbol = content.symbol;
      const entry = content.entry;
      const _type = content.type;
      const expiration = getNextFriday(new Date());

      // inside a command, event listener, etc.
      const exampleEmbed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Option Alert")
        // .setURL("https://www.fiverr.com/sharif582?up_rollout=true")
        .setAuthor({
          name: "Simulate & Trade",
          iconURL:
            "https://s3.tradingview.com/userpics/37305410-SbsU_big.png",
          // url: "https://www.fiverr.com/sharif582?up_rollout=true",
        })
        .setThumbnail(
          "https://s3.tradingview.com/userpics/37305410-SbsU_big.png"
        )
        .addFields(
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
            name: "Entry",
            value: entry,
            inline: true,
          },
          {
            name: "Possition",
            value: "Day Trade",
            inline: false,
          },
          {
            name: "Expiration",
            value: expiration,
            inline: false,
          }
        )

        .setTimestamp()
        // .setFooter({
        //   text: "Footer text here",
        // });

      messages.channel.send({ embeds: [exampleEmbed] });
    }
  } catch (err) {
    console.log(err.message);
  }
});
client.login(process.env.LIVE_TOKEN);
