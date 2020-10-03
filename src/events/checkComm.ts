/*

this codes works now

*/
import { WebhookClient, MessageEmbed } from 'discord.js';
import fs from 'fs';
const { stripIndents } = require('common-tags');
import { CustomLogger } from '../lib/customLogs';
import cheerio from 'cheerio';
import request from 'request';
import paths from '../types/paths';
import { getToken, getID } from '../lib/webhook';
import config from '../../config.json';
import { stalkGold } from '../events/stalkGold';

let D_ID = getID(config.Discord.NewComms);
let D_Token = getToken(config.Discord.NewComms);
const path = paths.NewComm;
const goldkek = new stalkGold();

const log = new CustomLogger();

export default class CheckComm {
  private linksHlstats(args: any): Promise<string> {
    return new Promise((resolve) => {
      resolve(
        `https://hlstats.panda-community.com/hlstats.php?mode=search&q=${args}&st=uniqueid&game=`
      );
    });
  }

  private linksSourceban(args: any): Promise<string> {
    return new Promise((resolve) => {
      resolve(
        `https://bans.panda-community.com/index.php?p=commslist&advSearch=${args}&advType=steamid`
      );
    });
  }

  private newComms($) {
    let A_storingData = [];
    let count = 1;
    for (var i = 2; i < 40; ++i) {

      let name = $(
        `#banlist > table > tbody > tr:nth-child(${
          i - 1 + count
        }) > td:nth-child(3) > div:nth-child(1)`
      ).text().trim();
      
      let steamID = $(
        `#banlist > table > tbody > tr:nth-child(${
          i + count
        }) > td > div > table > tbody > tr:nth-child(3) > td:nth-child(2)`
      ).text().trim();

      let invoked = $(
        `#banlist > table > tbody > tr:nth-child(${
          i + count
        }) > td > div > table > tbody > tr:nth-child(6) > td:nth-child(2)`
      ).text().trim();

      let length = $(
        `#banlist > table > tbody > tr:nth-child(${
          i + count
        }) > td > div > table > tbody > tr:nth-child(7) > td:nth-child(2)`
      ).text().trim();

      let reason = $(
        `#banlist > table > tbody > tr:nth-child(${
          i + count
        }) > td > div > table > tbody > tr:nth-child(9) > td:nth-child(2)`
      ).text().trim();

      let admin = $(
        `#banlist > table > tbody > tr:nth-child(${
          i + count
        }) > td > div > table > tbody > tr:nth-child(10) > td:nth-child(2)`
      ).text().trim();

      let server = $(
        `#banlist > table > tbody > tr:nth-child(${
          i + count
        }) > td > div > table > tbody > tr:nth-child(11) > td:nth-child(2)`
      ).attr('id');

      let totaBlocks = $(
        `#banlist > table > tbody > tr:nth-child(${
          i + count
        }) > td > div > table > tbody > tr:nth-child(12) > td:nth-child(2)`
      ).text().trim();

      let type: String | Boolean = $(`#banlist > table > tbody > tr:nth-child(${count*2}) td:nth-child(1)`)
      .html();

      type = type.toString().includes("class=\"fas fa-comment-slash fa-lg\"")
      console.log(type);

      const content = fs.readFileSync(path);
      const Checker = JSON.parse(content);

      if (server === undefined) {
        server = 'Web Ban';
      }

      let objectJson = {
        TotalBans: totaBlocks,
        NameOfUser: name,
        BanLength: length,
        Admin: admin,
        SteamID: steamID,
        Reason: reason,
        Server: server,
        Invoked: invoked,
        Type: type
      };

      if (objectJson.Invoked !== Checker.Invoked) {
        A_storingData.push(objectJson);
        ++count;
        continue;
      } else {
        return A_storingData;
      }
    }
  }

  //600000
  //#D7D040
  /**
   *
   * @param url - The url for sourcebans comms
   */
  public async checker(url: string) {
    setInterval(() => {
      request(url, async (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const mutePicture = "https://cdn.discordapp.com/attachments/624635756635226133/760594654365876274/mute.png"
          const gagPicture = "https://cdn.discordapp.com/attachments/624635756635226133/760594335832997958/gag.png"
          const $ = cheerio.load(html);

          let result = this.newComms($);
          log.normal(`Found: ${result ? result.length : "0"} new comms..`, true);
          const webhookClient = new WebhookClient(D_ID, D_Token);

          for (var j = 0; j < result.length; ++j) {
            fs.writeFileSync(path, JSON.stringify(result[0]));

            if (result[j].Admin === 'Gold') {
              goldkek.goldDidAThing(result[j], 'comm');
            }
            
            const embed = new MessageEmbed()
            .setColor('#D7D040')
            .setAuthor("New Comms", result[j].Type ? gagPicture : mutePicture)
            // .setThumbnail(result[j].Type ? gagPicture : mutePicture)
            .setDescription(stripIndents`
              
              **Name of user:** \`${result[j].NameOfUser}\`
              **SteamID:** \`${result[j].SteamID}\`
              **Length:** \`${result[j].BanLength}\`
              **Reason:** \`${result[j].Reason}\`
              
              **Admin:** \`${result[j].Admin}\`
              
              [SourceBan](${await this.linksSourceban(result[j].SteamID)})
              [Hlstats](${await this.linksHlstats(result[j].SteamID)})`);

            webhookClient.send('', {
              username: 'New comm',
              embeds: [embed],
            });
          }
        }
      });
    }, 600000);
  }
} //End of class
