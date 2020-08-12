import { MessageEmbed } from "discord.js";
import { stripIndents } from "common-tags";
import * as checker from "@tensorflow-models/toxicity";
const tfGPU = require("@tensorflow/tfjs-node-gpu");
const puppeteer = require("puppeteer");

let final = [];
export class DetectInsults {
  public run(client, message, args) {
    this.detect(client, message, args);
  }

  private async detect(client, message, args) {
    if (!args[0]) return message.channel.send("link plz ty");
    const url = args[0];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    const threshold = 0.9;

    await this.getChat(page).then(async (chat) => {
      await checker
        .load(threshold, ["toxicity", "insult", "severe_toxicity"])
        .then(async (model) => {
          for (var i = 0; i < chat.length; i++) {
            let chatLog = chat[i];
            let data = model.classify(chat[i]).then(async (predictions) => {
              let result = predictions;
              /*let insult = 
                {
                    label: result[0].label,
                    probabilities: result[0].results[0].probabilities[1],
                    boolean: result[0].results[0].match
                };

                let severe_toxicity = 
                {
                    label: result[1].label,
                    probabilities: result[1].results[0].probabilities[1],
                    boolean: result[1].results[0].match
                };*/

              let toxicity = {
                label: result[2].label,
                probabilities: result[2].results[0].probabilities[1],
                boolean: result[2].results[0].match,
              };

              final.push({
                chat: chatLog,
                toxicity: toxicity.probabilities * 100,
              });

              return final;
            });

            if (i === chat.length - 1) {
              let mapping = (await data)
                .map(
                  (result) => stripIndents`
                Chat: ${result.chat}
                Toxic: ${result.toxicity}%`
                )
                .reduce((string, category) => string + "\n" + category);
              const embed = new MessageEmbed().setDescription(mapping);

              message.channel.send(embed);
            }
          }
        });
    });
  }

  private async sendMessage(result, message): Promise<any> {
    const embed = new MessageEmbed().addField("Result", result.toString());

    message.channel.send(embed);
  }

  private async getChat(page) {
    let first_column_text = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(".bg2"),
        (element) => element.textContent
      )
    );
    let unique = {};
    first_column_text.forEach(function (i) {
      if (!unique[i]) {
        unique[i] = "";
      }
    });
    //console.log(Object.keys(unique));
    return Object.keys(unique);
  }
} //End of class
