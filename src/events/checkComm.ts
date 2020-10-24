/*

this codes works now

*/
import { WebhookClient, MessageEmbed } from 'discord.js';
import fs from 'fs';
const { stripIndents } = require('common-tags');
import { CustomLogger } from '../lib/customLogs';
import request from 'request';
import paths from '../types/paths';
import { getToken, getID } from '../lib/webhook';
import config from '../../config.json';
import * as jsdom from "jsdom";
import { stalkGold } from '../events/stalkGold';

let D_ID = getID(config.Discord.NewComms);
let D_Token = getToken(config.Discord.NewComms);
let wantsBigIcons = config.Boolean["wantsBigCommIcons"];
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

  /**
   * @description Gets the new comms
   * @param $ The raw HTML from sourceban
   */
  private improvedNewComms($) {
    const { JSDOM } = jsdom;
    const DOM = new JSDOM($);
    let A_storingData = [];
    const list = DOM.window.document.querySelector(`#banlist > table > tbody`);
    for (let i = 2; i < list.children.length; i++) {
      if(list.children[i].children[0].children[0].children[0].children[0].length === 14) 
        {
          let type: String | jsdom = list.children[i-1].children[0].innerHTML.includes("class=\"fas fa-comment-slash fa-lg\"");
          let name: String = list.children[i].children[0].children[0].children[0].children[0].children[1].textContent.replace("Player", "").trim();
          let steamID: String = list.children[i].children[0].children[0].children[0].children[0].children[2].textContent.replace("Steam ID", "").trim();
          let steamID32: String = list.children[i].children[0].children[0].children[0].children[0].children[3].textContent.replace("Steam3 ID", "").trim();
          let steamID64: String = list.children[i].children[0].children[0].children[0].children[0].children[4].textContent.replace("Steam Community", "").trim();
          let invoked: String = list.children[i].children[0].children[0].children[0].children[0].children[5].textContent.replace("Invoked on", "").trim();
          let length: String = list.children[i].children[0].children[0].children[0].children[0].children[6].textContent.replace("Block length", "").trim();
          let expires: String = list.children[i].children[0].children[0].children[0].children[0].children[9].textContent.replace("Expires on", "").trim();
          let reason: String = list.children[i].children[0].children[0].children[0].children[0].children[10].textContent.replace("Reason", "").trim();
          let admin: String = list.children[i].children[0].children[0].children[0].children[0].children[11].textContent.replace("Blocked by Admin", "").trim();
          let server: String = list.children[i].children[0].children[0].children[0].children[0].children[12].textContent.replace("Blocked from", "").trim();
          let totalBlocks: String = list.children[i].children[0].children[0].children[0].children[0].children[13].textContent.replace("Total Blocks", "").trim();

          ++i
          let objectJson = {
            TotalBans: totalBlocks,
            NameOfUser: name,
            BanLength: length,
            Admin: admin,
            SteamID: steamID,
            SteamID32: steamID32,
            SteamID64: steamID64,
            Expires: expires,
            Reason: reason,
            Server: server,
            Invoked: invoked,
            Type: type
          };

          const Checker = JSON.parse(fs.readFileSync(path, "utf8"));
            
          if (objectJson.Invoked !== Checker.Invoked) {
            A_storingData.push(objectJson);
            continue;
          } else {
            return A_storingData;
          }
          
        } else {
          let type: String | jsdom = list.children[i-1].children[0].innerHTML.includes("class=\"fas fa-comment-slash fa-lg\"");
          let name: String = list.children[i].children[0].children[0].children[0].children[0].children[1].textContent.replace("Player", "").trim();
          let steamID: String = list.children[i].children[0].children[0].children[0].children[0].children[2].textContent.replace("Steam ID", "").trim();
          let steamID32: String = list.children[i].children[0].children[0].children[0].children[0].children[3].textContent.replace("Steam3 ID", "").trim();
          let steamID64: String = list.children[i].children[0].children[0].children[0].children[0].children[4].textContent.replace("Steam Community", "").trim();
          let invoked: String = list.children[i].children[0].children[0].children[0].children[0].children[5].textContent.replace("Invoked on", "").trim();
          let length: String = list.children[i].children[0].children[0].children[0].children[0].children[6].textContent.replace("Block length", "").trim();
          let expires: String = list.children[i].children[0].children[0].children[0].children[0].children[7].textContent.replace("Expires on", "").trim();
          let reason: String = list.children[i].children[0].children[0].children[0].children[0].children[8].textContent.replace("Reason", "").trim();
          let admin: String = list.children[i].children[0].children[0].children[0].children[0].children[9].textContent.replace("Blocked by Admin", "").trim();
          let server: String = list.children[i].children[0].children[0].children[0].children[0].children[10].textContent.replace("Blocked from", "").trim();
          let totalBlocks: String = list.children[i].children[0].children[0].children[0].children[0].children[11].textContent.replace("Total Blocks", "").trim();
          
          ++i
          let objectJson = {
            TotalBans: totalBlocks,
            NameOfUser: name,
            BanLength: length,
            Admin: admin,
            SteamID: steamID,
            SteamID32: steamID32,
            SteamID64: steamID64,
            Expires: expires,
            Reason: reason,
            Server: server,
            Invoked: invoked,
            Type: type
          };
        
          const Checker = JSON.parse(fs.readFileSync(path, "utf8"));
            
          if (objectJson.Invoked !== Checker.Invoked) {
            A_storingData.push(objectJson);
            continue;
          } else {
            return A_storingData;
          }
        }

      }
  };

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

          let result = this.improvedNewComms(html);
          log.normal(`Found: ${result ? result.length : "0"} new comms..`, true);
          const webhookClient = new WebhookClient(D_ID, D_Token);

          for (var j = 0; j < result.length; ++j) {
            fs.writeFileSync(path, JSON.stringify(result[0]));

            if (result[j].Admin === 'Gold') {
              goldkek.goldDidAThing(result[j], 'comm');
            }
            
            let embed;
            if (!wantsBigIcons) {
            
              embed = new MessageEmbed()
                .setColor('#D7D040')
                .setAuthor("New Comms", result[j].Type ? gagPicture : mutePicture)
                .setDescription(stripIndents`
                **Name of user:** \`${result[j].NameOfUser}\`
                **SteamID:** \`${result[j].SteamID}\`
                **Length:** \`${result[j].BanLength}\`
                **Expires:** \`${result[j].Expires}\`
                **Reason:** \`${result[j].Reason}\`
                
                **Admin:** \`${result[j].Admin}\`
                
                [SourceBan](${await this.linksSourceban(result[j].SteamID)})
                [Hlstats](${await this.linksHlstats(result[j].SteamID)})`);
            } else {
              embed = new MessageEmbed()
                .setColor('#D7D040')
                .setThumbnail(result[j].Type ? gagPicture : mutePicture)
                .setDescription(stripIndents`
                **Name of user:** \`${result[j].NameOfUser}\`
                **SteamID:** \`${result[j].SteamID}\`
                **Length:** \`${result[j].BanLength}\`
                **Expires:** \`${result[j].Expires}\`
                **Reason:** \`${result[j].Reason}\`
                
                **Admin:** \`${result[j].Admin}\`
                
                [SourceBan](${await this.linksSourceban(result[j].SteamID)})
                [Hlstats](${await this.linksHlstats(result[j].SteamID)})`);
            }

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
