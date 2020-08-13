import Servers from '../../json/EU_Server.json';
import config from '../../../config.json';
import { MessageEmbed } from 'discord.js';

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
        await this.whichServer(args[1].toUpperCase(), args[2].toUpperCase()).then(async (ID) => {
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

  private whichServer(argsOne: string[], argsTwo: string[]): Promise<string> {
    const argsForServers = 3;

    const EUServer = Servers.EUServers;
    const SGServer = Servers.SGServer;
    const USServer = Servers.USServer;

    if (argsOne.includes('EU')) {
      for (var xServer = 0; xServer < argsForServers; ++xServer) {
        if (argsTwo.includes(EUServer.Dodgeball_1[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf52`);
          });
        } else if (argsTwo.includes(EUServer.Duel[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf51`);
          });
        } else if (argsTwo.includes(EUServer.War3Source[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf49`);
          });
        } else if (argsTwo.includes(EUServer.Jump[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf50`);
          });
        } else if (argsTwo.includes(EUServer.Saxton_Hale[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf53`);
          });
        } else if (argsTwo.includes(EUServer.Hightower_1[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf47`);
          });
        } else if (argsTwo.includes(EUServer.MGE_1[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf42`);
          });
        } else if (argsTwo.includes(EUServer.Class_Warfare[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf29`);
          });
        } else if (argsTwo.includes(EUServer.Deahtrun[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf54`);
          });
        } else if (argsTwo.includes(EUServer.Hightower_2[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf48`);
          });
        } else if (argsTwo.includes(EUServer.Surf[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf33`);
          });
        } else if (argsTwo.includes(EUServer.Slender_Fortress[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf41`);
          });
        } else if (argsTwo.includes(EUServer.Freak_Fortress_2[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf55`);
          });
        } else if (argsTwo.includes(EUServer.Turbine[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf61`);
          });
        } else if (argsTwo.includes(EUServer.TwoFort[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf56`);
          });
        } else if (argsTwo.includes(EUServer.Jailbreak[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf43`);
          });
        } else if (argsTwo.includes(EUServer.Mario_Kart[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf46`);
          });
        } else if (argsTwo.includes(EUServer.Dodgeball_2[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf57`);
          });
        } else if (argsTwo.includes(EUServer.The_Hidden[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf38`);
          });
        } else if (argsTwo.includes(EUServer.Prophunt[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf36`);
          });
        } else if (argsTwo.includes(EUServer.Deathrun_2[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf37`);
          });
        } else if (argsTwo.includes(EUServer.MGE_2[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf39`);
          });
        } else if (argsTwo.includes(EUServer.Randomizer[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf30`);
          });
        } else if (argsTwo.includes(EUServer.Trade[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf58`);
          });
        } else if (argsTwo.includes(EUServer.Dustbowl[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf31`);
          });
        } else if (argsTwo.includes(EUServer.Orange_x3[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf35`);
          });
        } else if (argsTwo.includes(EUServer.Smash_Bros[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf32`);
          });
        } else if (argsTwo.includes(EUServer.Dodgeball_3[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf1`);
          });
        } else if (argsTwo.includes(EUServer.Hightower_3[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf2`);
          });
        } else if (argsTwo.includes(EUServer.Zombie_Fortress[xServer])) {
          return new Promise((resolve) => {
            resolve(`tf62`);
          });
        }
      }
    } else if (argsOne.includes('SG')) {
      if (argsTwo.includes(SGServer.TwoFort)) {
        return new Promise((resolve) => {
          resolve(`tf22`);
        });
      } else if (argsTwo.includes(SGServer.Deathrun)) {
        return new Promise((resolve) => {
          resolve(`tf20`);
        });
      } else if (argsTwo.includes(SGServer.Dodgeball)) {
        return new Promise((resolve) => {
          resolve(`tf14`);
        });
      } else if (argsTwo.includes(SGServer.MGE)) {
        return new Promise((resolve) => {
          resolve(`tf23`);
        });
      } else if (argsTwo.includes(SGServer.Trade)) {
        return new Promise((resolve) => {
          resolve(`tf60`);
        });
      }
    } else if (argsOne.includes('US')) {
      if (argsTwo.includes(USServer.Deathrun)) {
        return new Promise((resolve) => {
          resolve(`tf28`);
        });
      } else if (argsTwo.includes(USServer.Dodgeball)) {
        return new Promise((resolve) => {
          resolve(`tf45`);
        });
      } else if (argsTwo.includes(USServer.Dustbowl)) {
        return new Promise((resolve) => {
          resolve(`tf65`);
        });
      } else if (argsTwo.includes(USServer.Freak_Fortress_2)) {
        return new Promise((resolve) => {
          resolve(`tf44`);
        });
      } else if (argsTwo.includes(USServer.Hightower)) {
        return new Promise((resolve) => {
          resolve(`tf63`);
        });
      } else if (argsTwo.includes(USServer.Jailbreak)) {
        return new Promise((resolve) => {
          resolve(`tf40`);
        });
      } else if (argsTwo.includes(USServer.Jump)) {
        return new Promise((resolve) => {
          resolve(`tf12`);
        });
      } else if (argsTwo.includes(USServer.MGE)) {
        return new Promise((resolve) => {
          resolve(`tf11`);
        });
      } else if (argsTwo.includes(USServer.Prophunt)) {
        return new Promise((resolve) => {
          resolve(`tf24`);
        });
      } else if (argsTwo.includes(USServer.Slender_Fortress)) {
        return new Promise((resolve) => {
          resolve(`tf25`);
        });
      } else if (argsTwo.includes(USServer.Trade)) {
        return new Promise((resolve) => {
          resolve(`tf3`);
        });
      } else if (argsTwo.includes(USServer.Turbine)) {
        return new Promise((resolve) => {
          resolve(`tf7`);
        });
      } else if (argsTwo.includes(USServer.Saxton_Hale)) {
        return new Promise((resolve) => {
          resolve(`tf4`);
        });
      }
    } else {
      return new Promise((resolve) => {
        resolve(`No server`);
      });
    }
  }
}
