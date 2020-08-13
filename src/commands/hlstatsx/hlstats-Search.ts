import Servers from '../../json/EU_Server.json';
import config from '../../../config.json';
import { MessageEmbed } from 'discord.js';
import { hlstatsxGetServer } from '../../lib/hlstatsx-id';

export class SearchHlstatsx {
  public run(client, message, args) {
    this.search(client, message, args);
  }

  private async search(client, message, args) {
    if (!args[0])
      return message.channel.send(
        `You need to search for something. \nFormat: \`${config.General.prefix}h-search [Name | SteamID] ?[EU | US | NY | SG] ?[ServerName]\``
      );

    try {
      const embed = new MessageEmbed().setFooter(`Searched for: ${args[0]}`).setColor('D7B940');
      //.setImage("https://www.panda-community.com/styles/io_dark/io/images/logo-white.png")
      let link = await this.linksHlstats(args[0]);

      if (!args[1]) {
        await message.channel.send(embed.setDescription(`[HlstatsX Link](${link})`));
      } else if (!args[2]) {
        await message.channel.send(embed.setDescription(`[HlstatsX Link](${link})`));
      } else {
        await hlstatsxGetServer(args[1].toUpperCase(), args[2].toUpperCase()).then(async (ID) => {
          await message.channel.send(embed.setDescription(`[HlstatsX Link](${link + ID})`));
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  private linksHlstats(args: any): Promise<string> {
    if (args.includes(`STEAM_`)) {
      let steamID = args.replace('👍', ':1:');
      return new Promise((resolve) => {
        resolve(
          `https://hlstats.panda-community.com/hlstats.php?mode=search&q=${steamID}&st=uniqueid&game=`
        );
      });
    } else {
      return new Promise((resolve) => {
        resolve(
          `https://hlstats.panda-community.com/hlstats.php?mode=search&q=${args}&st=player&game=`
        );
      });
    }
  }
}
