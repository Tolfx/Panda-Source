import { WebhookClient, MessageEmbed } from "discord.js";
import fs from "fs";
const { stripIndents } = require("common-tags");
import { CustomLogger } from "../lib/customLogs";
import cheerio from "cheerio";
import request from "request";
import paths from "../types/paths";
import { getToken, getID } from "../lib/webhook";
import config from "../../config.json";

let D_ID = getID(config.Discord.Chatlog_04);
let D_Token = getToken(config.Discord.Chatlog_04);
let path = paths.EU_Dodgeball_04;

const log = new CustomLogger();

function newChat($) {
  let D_newChat = [];
  for (var i = 2; i < 51; ++i) {
    let time = $(
      `body > div.content > div.block > div:nth-child(6) > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`
    )
      .text()
      .trim();
    let player = $(
      `body > div.content > div.block > div:nth-child(6) > table > tbody > tr:nth-child(${i}) td:nth-child(2) > a`
    )
      .text()
      .trim()
      .split("/>");
    let playerURL = $(
      `body > div.content > div.block > div:nth-child(6) > table > tbody > tr:nth-child(${i}) > td:nth-child(2) > a`
    ).attr("href");
    let chat = $(
      `body > div.content > div.block > div:nth-child(6) > table > tbody > tr:nth-child(${i}) > td:nth-child(3)`
    )
      .text()
      .trim();

    const content = fs.readFileSync(path);
    const Checker = JSON.parse(content);

    let objectJson = {
      Time: time,
      User: player[1],
      UserURL: playerURL,
      Chat: chat,
    };

    if (objectJson.Time !== Checker.Time) {
      D_newChat.push(objectJson);
      continue;
    } else if (objectJson.Time === Checker.Time) {
      return D_newChat;
    }
  }
}

export function getchat() {
  let url =
    "https://hlstats.panda-community.com/hlstats.php?mode=chat&game=tf52";

  setInterval(() => {
    request(url, async (error, response, html) => {
      if (!error && response.statusCode == 200) {
        let $ = cheerio.load(html);

        let result = newChat($);
        const webhookClient = new WebhookClient(D_ID, D_Token);

        log.normal(`Found ${result.length} new chats`);

        for (var j = result.length - 1; j >= 0; j--) {
          fs.writeFileSync(path, JSON.stringify(result[0]));
          const embed = new MessageEmbed().setColor("#D75040")
            .setDescription(stripIndents`
                  **${result[j].Time}** | [${result[j].User}](https://hlstats.panda-community.com/${result[j].UserURL}) : \`${result[j].Chat}\``);

          webhookClient.send("", {
            username: "Logs",
            embeds: [embed],
          });
        }
      }
    });
  }, 10000);
}
