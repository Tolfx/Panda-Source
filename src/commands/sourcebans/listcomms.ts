import { MessageEmbed } from 'discord.js';
import { stripIndents } from 'common-tags';
import config from '../../../config.json';
import request from "request";
import * as jsdom from "jsdom";

export default class listcomms {
  //Main function to start the command.
  public run(client, message, args) {
    this.commsBlock(message, args);
  }

  private async commsBlock(message, args) {

    if (!args[0])
      return message.channel.send(
        `You gonna search for air..? Use the right format: \`${config.General.prefix}listcomms [Username | SteamID]\``
      );

    const url = (this.linksSourceban(args[0])).toString();

    request(url, (err, response, body) => {
      const { JSDOM } = jsdom;
      const DOM = new JSDOM(body);
      let bansList = [];
      const list = DOM.window.document.querySelector(`#banlist > table > tbody`);
      for (let i = 2; i < list.children.length; i++) {
        if(list.children[i].children[0].children[0].children[0].children[0].children.length === 14) {
            let type: String | jsdom = list.children[i-1].children[0].innerHTML.includes("class=\"fas fa-comment-slash fa-lg\"");
            let name: String = list.children[i].children[0].children[0].children[0].children[0].children[1].textContent.replace("Player", "").replace("No Demos", "").trim();
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

            bansList.push({
              steamID,
              name,
              invoked,
              length,
              expires,
              admin,
              type,
              totalBlocks,
              reason
            })
            ++i
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
            bansList.push({
              steamID,
              name,
              invoked,
              length,
              expires,
              admin,
              type,
              totalBlocks,
              reason
            })
            ++i
          }
      }

      const embed = new MessageEmbed()
      .setTimestamp()
      .setFooter(`Rquested by ${message.author.tag} | ${message.author.id}`)
      .setColor(`#f15664`)
      .setDescription(stripIndents`
        **Latest commblock from ${args[0]}**

        Name: ${bansList[0].name}
        SteamID: ${bansList[0].steamID}
        Invoked: ${bansList[0].invoked}
        Lenght: ${bansList[0].length}
        Admin: ${bansList[0].admin}
        Total blocks: ${bansList[0].totalBlocks}

        [Sourceban link](${(this.linksSourceban(args[0])).toString()})
        [HlstatsX link](${(this.linksHlstats(bansList[0].steamID)).toString()})`);
        
      message.channel.send(embed);
      
    })
    
  }
  private linksHlstats(args: any): string {
    if (args.includes(`STEAM_`)) {
      return `https://hlstats.panda-community.com/hlstats.php?mode=search&q=${args}&st=uniqueid&game=`
    } else {
      return `https://hlstats.panda-community.com/hlstats.php?mode=search&q=${args}&st=player&game=`
    }
  }

  private linksSourceban(args: any): string {
    if (args.includes(`STEAM_`)) {
      return `https://bans.panda-community.com/index.php?p=commslist&advSearch=${args}&advType=steamid`
    } else {
      return `https://bans.panda-community.com/index.php?p=commslist&advSearch=${args}&advType=name`
    }
  }
}
