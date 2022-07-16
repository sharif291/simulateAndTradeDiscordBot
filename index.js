require("dotenv").config();
const { Client, Intents } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const fs = require("fs");

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
      messages.author.username == "sharif291" ||
      messages.author.username == "Dragon Bot for AAPL" ||
      messages.author.username == "Dragon Bot for AMD" ||
      messages.author.username == "Dragon Bot for AMZN" ||
      messages.author.username == "Dragon Bot for DIS" ||
      messages.author.username == "Dragon Bot for FB" ||
      messages.author.username == "Dragon Bot for GOOG" ||
      messages.author.username == "Dragon Bot for IWM" ||
      messages.author.username == "Dragon Bot for MSFT" ||
      messages.author.username == "Dragon Bot for NFLX" ||
      messages.author.username == "Dragon Bot for NVDA" ||
      messages.author.username == "Dragon Bot for QQQ" ||
      messages.author.username == "Dragon Bot for SPY" ||
      messages.author.username == "Dragon Bot for SQQQ" ||
      messages.author.username == "Dragon Bot for TSLA" ||
      messages.author.username == "Dragon Bot for TQQQ"
    ) {
      // Delete the message from dwebhooks
      // structure the sent data
      var x = messages.content;
      console.log("message type", typeof x);
      try {
        content = typeof x === "string" ? JSON.parse(x) : x;
        messages.delete();
      } catch (err) {
        return;
      }
      // check the date time
      var dt = new Date();
      var offset = -240; //Timezone offset for EST in minutes.
      var estDate = new Date(dt.getTime() + offset * 60 * 1000);
      h_now = estDate.getUTCHours() * 60 + estDate.getUTCMinutes();
      // h_now > 570 && h_now <= 960
      if (h_now > 570 && h_now <= 960) {
        const {
          type: _type,
          symbol: _symbol,
          close: _close,
          position: _position,
          volume: _volume,
        } = content;

        // IF FILE EXISTS
        if (fs.existsSync(`./data.json`)) {
          // Get existing data
          let prevdata = fs.readFileSync(`./data.json`);
          // make existing data json to object
          var data = JSON.parse(prevdata);
          //Find index of specific object using findIndex method.
          objIndex = data.findIndex((x) => x.symbol == _symbol);

          // IF DATA NOT in file
          if (objIndex == -1) {
            // Add new object to the file
            data.push({
              date: new Date().getDate(),
              type: _type,
              symbol: _symbol,
              close: _close,
              position: _position,
              volume: _volume,
            });
            // send alert
            const exampleEmbed = new MessageEmbed()
              .setColor("#2eff00")
              .setAuthor({
                name: "OPTION SCALP ALERT",
                iconURL:
                  "https://s3.tradingview.com/userpics/37305410-SbsU_big.png",
              })

              .addFields({
                name: ` Type: ${_type}\nSymbol: ${_symbol}\nPrice: ${_close}\nPosition: ${_position}\nVolume: ${_volume}`,
                value: "\u200b",
                inline: false,
              })
              .setTimestamp();
            messages.channel.send({ embeds: [exampleEmbed] });
            messages.channel.send(`<@&${process.env.ROLE_ID}>`);
          } else {
            // if  same symbol same typr alert
            if (
              data[objIndex].symbol == _symbol &&
              data[objIndex].type == _type
            ) {
              // skip
              return;
            }
            // if not same symbol and same type alert
            else {
              //Update object's name property.
              data[objIndex].date = new Date().getDate();
              data[objIndex].type = _type;
              data[objIndex].symbol = _symbol;
              data[objIndex].close = _close;
              data[objIndex].position = _position;
              data[objIndex].volume = _volume;
              // send alert
              // inside a command, event listener, etc.
              const exampleEmbed = new MessageEmbed()
                .setColor("#2eff00")
                .setAuthor({
                  name: "OPTION SCALP ALERT",
                  iconURL:
                    "https://s3.tradingview.com/userpics/37305410-SbsU_big.png",
                })

                .addFields({
                  name: ` Type: ${_type}\nSymbol: ${_symbol}\nPrice: ${_close}\nPosition: ${_position}\nVolume: ${_volume}`,
                  value: "\u200b",
                  inline: false,
                })
                .setTimestamp();
              messages.channel.send({ embeds: [exampleEmbed] });
              messages.channel.send(`<@&${process.env.ROLE_ID}>`);
            }
          }
          let json_data = JSON.stringify(data);
          fs.writeFileSync(`./data.json`, json_data);
        }
        // IF FILE NOT EXISTS
        else {
          // inside a command, event listener, etc.
          const exampleEmbed = new MessageEmbed()
            .setColor("#2eff00")
            .setAuthor({
              name: "OPTION SCALP ALERT",
              iconURL:
                "https://s3.tradingview.com/userpics/37305410-SbsU_big.png",
            })

            .addFields({
              name: ` Type: ${_type}\nSymbol: ${_symbol}\nPrice: ${_close}\nPosition: ${_position}\nVolume: ${_volume}`,
              value: "\u200b",
              inline: false,
            })
            .setTimestamp();
          messages.channel.send({ embeds: [exampleEmbed] });
          messages.channel.send(`<@&${process.env.ROLE_ID}>`);
          // Store the signal for today
          let json_data = JSON.stringify([
            {
              date: new Date().getDate(),
              type: _type,
              symbol: _symbol,
              close: _close,
              position: _position,
              volume: _volume,
            },
          ]);
          fs.writeFileSync(`./data.json`, json_data);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
});
client.login(process.env.LIVE_TOKEN);
