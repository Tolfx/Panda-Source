import { getToken, getID } from '../lib/webhook';
import config from '../../config.json';
import { WebhookClient, MessageEmbed, BaseClient } from 'discord.js';
import { CustomLogger } from '../lib/customLogs';
const { stripIndents } = require('common-tags');

let D_Token = getToken(config.Discord.goldHook);
let D_ID = getID(config.Discord.goldHook);

const log = new CustomLogger();

export class stalkGold {
  private linksHlstats(args: any): Promise<string> {
    return new Promise((resolve) => {
      resolve(
        `https://hlstats.panda-community.com/hlstats.php?mode=search&q=${args}&st=uniqueid&game=`
      );
    });
  }

  private linksSourcebanComm(args: any): Promise<string> {
    return new Promise((resolve) => {
      resolve(
        `https://bans.panda-community.com/index.php?p=commslist&advSearch=${args}&advType=steamid`
      );
    });
  }

  private linksSourcebanBan(args: any): Promise<string> {
    return new Promise((resolve) => {
      resolve(
        `https://bans.panda-community.com/index.php?p=banlist&advSearch=${args}&advType=steamid`
      );
    });
  }

  private sendWebhook(body) {
    const webhookClient = new WebhookClient(D_ID, D_Token);

    const embed = new MessageEmbed().setColor('#40D79C').setDescription(body);

    webhookClient.send('', {
      username: 'Gold',
      embeds: [embed],
    });
  }
  /*
      let objectJson = {
        TotalBans: totaBlocks,
        NameOfUser: name,
        BanLength: length,
        Admin: admin,
        SteamID: steamID,
        Reason: reason,
        Server: server,
        Invoked: invoked,
      };
  */

  public async goldDidAThing(body, type) {
    const block = type === 'comm' ? 'did a comm block on' : 'banned';
    const message = stripIndents`Gold ${block} ${body.NameOfUser} for ${body.BanLength} and the reason was ${body.Reason}..
    
    [SourceBan](${type === 'comm' ? await this.linksSourcebanComm(body.SteamID) : await this.linksSourcebanBan(body.SteamID)})
    [Hlstats](${await this.linksHlstats(body.SteamID)})
    
    idk man.. demote him /shrug`;

    this.sendWebhook(message);
  }
}
