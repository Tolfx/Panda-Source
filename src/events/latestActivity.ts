import { WebhookClient, MessageEmbed } from 'discord.js';
import fs from 'fs';
const { stripIndents } = require('common-tags');
import { CustomLogger } from '../lib/customLogs';
import cheerio from 'cheerio';
import request from 'request';
import paths from '../types/paths';
import { getToken, getID } from '../lib/webhook';
import config from '../../config.json';

let path = paths.LatestActivty;
let D_Token = getToken(config.Discord.LatestActivity);
let D_ID = getID(config.Discord.LatestActivity);
const log = new CustomLogger();

export class latestActivity {
  /**
   *
   * @param url - The url for sourcebans comms
   */
  public async checker(url: string) {
    setInterval(() => {
      request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);

          let name = $(
            '#top > div.p-body > div > div > div > div > div > div.block > div > ul > li:nth-child(1) > div > div > div.contentRow-title'
          )
            .text()
            .trim();

          let user = $(
            '#top > div.p-body > div > div > div > div > div > div.block > div > ul > li:nth-child(1) > div > div > div.contentRow-title > a:nth-child(1)'
          ).attr('href');

          let link = $(
            '#top > div.p-body > div > div > div > div > div > div.block > div > ul > li:nth-child(1) > div > div > div.contentRow-title > a:nth-child(2)'
          ).attr('href');

          const content = fs.readFileSync(path);
          const Checker = JSON.parse(content);

          let objectJson = {
            Activty: name,
            User: user,
            Link: link,
          };

          if (objectJson.Activty !== Checker.Activty) {
            fs.writeFileSync(path, JSON.stringify(objectJson));

            const webhookClient = new WebhookClient(D_ID, D_Token);

            const embed = new MessageEmbed().setColor('#40D79C').setDescription(stripIndents`
                        **New activity.**
                        \`Activity:\` **${name}**

                        \`Link:\` https://www.panda-community.com/${link}
                        \`Member link:\` https://www.panda-community.com/${user}`);

            webhookClient.send('', {
              username: 'New Activity',
              embeds: [embed],
            });
          } else {
            return;
          }
        }
      });
    }, 5000);
  }
} //end of class
