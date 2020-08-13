import Servers from '../../json/EU_Server.json';
import config from '../../../config.json';
import { MessageEmbed, Message } from 'discord.js';
import { stripIndents } from 'common-tags';
const puppeteer = require('puppeteer');

export class whoIsPlaying {
  public run(client, message, args) {
    this.whoIsPlaying(message, args);
  }

  private async whoIsPlaying(message, args) {
    if (!args[0]) return;
    if (!args[1]) return;

    let url = 'https://hlstats.panda-community.com/hlstats.php?game=';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    this.whichServer(args[0].toUpperCase(), args[1].toUpperCase()).then(async (ID) => {
      await page.goto(url + ID);
      let data = await this.checkPlayers(page);
      console.log(data);
    });
  }

  private async checkPlayers(page): Promise<Array<string>> {
    let first_column_text = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.fSmall'), (element) => element.textContent)
    );
    let unique = {};
    first_column_text.forEach(function (i) {
      if (!unique[i]) {
        unique[i] = '';
      }
      if (unique[i] === Number) {
        unique[i] = '';
      }
      if (unique[i] === Float32Array) {
        unique[i] = '';
      }
    });

    console.log(unique);

    return Object.keys(unique);
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
        resolve(`ERROR`);
      });
    }
  }
}
