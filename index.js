require("dotenv").config();
const { Client, Intents } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const nodeHtmlToImage = require("node-html-to-image");

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
    if (1) {
      var x = messages.content;

      content = typeof x === "string" ? JSON.parse(x) : x;
      console.log(content);
      if (content.title.toLowerCase() === "bot" || "bot-1") {
        messages.delete();

        const _symbol = content.symbol;
        const _type = content.type;

        const _expiry = getNextFriday(new Date());
        const _position = "Day Trade";
        const _border_color = _type.toLowerCase() === "call" ? "green" : "red";
        const _risk =
          content.title.toLowerCase() === "bot-1"
            ? "High Risk, High Reward"
            : "Low Risk, Low Reward";

        const _htmlTemplate = `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
            <style>
              table {
                background-color: #2f3136;
                width: 100%;
                border-spacing: 5px;
                border: 5px solid ${_border_color};
              }
              * {
                margin: 0;
                padding: 0;
                font-size: 16px;
                line-height: 1.35;
                color: white;
                font-family: cursive;
              }
              p {
                font-weight: bold;
              }
              span {
                font-weight: normal;
                font-size: 14px;
                line-height: 2;
              }
            </style>
          </head>
          <body style="width: 350px">
            <table>
              <tr>
                <td colspan="3">
                  <div style="align-items: center; display: flex">
                    <img
                      style="
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        margin-right: 5px;
                      "
                      src="https://s3.tradingview.com/userpics/37305410-SbsU_big.png"
                      alt=""
                    /><span style="font-size: 18px; font-weight: bolder"
                      >Simulate & Trade</span
                    ><br />&nbsp;
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  <p style="font-size: 18px; font-weight: bold">Option Alert</p>
                  <span> ${_risk} </span>
                </td>
              </tr>
              <tr>
                <td>
                  <p>
                    Type <br />
                    <span>${_type}</span>
                  </p>
                </td>
                <td>
                  <p>
                    Symbol <br />
                    <span>${_symbol}</span>
                  </p>
                </td>
                <td rowspan="3">
                  <img
                    style="width: 100%; height: 120px"
                    src="https://s3.tradingview.com/userpics/37305410-SbsU_big.png"
                    alt=""
                  />
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <p>
                    Position <br />
                    <span>${_position}</span>
                  </p>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <p>
                    Expiry <br />
                    <span>${_expiry}</span>
                  </p>
                </td>
              </tr>
            </table>
          </body>
        </html>
                
        `;

        await nodeHtmlToImage({
          output: "./image.png",
          html: _htmlTemplate,
        }).then(() => {
          messages.channel.send({
            files: [{ attachment: "./image.png", name: "image.png" }],
          });
        });
        // for more configuration options refer to the library
      }
    }
  } catch (err) {
    console.log(err.message);
  }
});
client.login(process.env.LIVE_TOKEN);
