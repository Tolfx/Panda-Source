import Servers from '../json/EU_Server.json';
/**
 * @description Gives the ID from hlstatsx from panda.tf
 * @param Region Which region, EU | US | SG
 * @param Server Which server.
 */
export function hlstatsxGetServer(Region: string[], Server: string[]): Promise<string> {
  const argsForServers = 3;

  const EUServer = Servers.EUServers;
  const SGServer = Servers.SGServer;
  const USServer = Servers.USServer;

  if (Region.includes('EU')) {
    for (var xServer = 0; xServer < argsForServers; ++xServer) {
      if (Server.includes(EUServer.Dodgeball_1[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf52`);
        });
      } else if (Server.includes(EUServer.Duel[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf51`);
        });
      } else if (Server.includes(EUServer.War3Source[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf49`);
        });
      } else if (Server.includes(EUServer.Jump[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf50`);
        });
      } else if (Server.includes(EUServer.Saxton_Hale[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf53`);
        });
      } else if (Server.includes(EUServer.Hightower_1[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf47`);
        });
      } else if (Server.includes(EUServer.MGE_1[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf42`);
        });
      } else if (Server.includes(EUServer.Class_Warfare[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf29`);
        });
      } else if (Server.includes(EUServer.Deahtrun[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf54`);
        });
      } else if (Server.includes(EUServer.Hightower_2[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf48`);
        });
      } else if (Server.includes(EUServer.Surf[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf33`);
        });
      } else if (Server.includes(EUServer.Slender_Fortress[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf41`);
        });
      } else if (Server.includes(EUServer.Freak_Fortress_2[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf55`);
        });
      } else if (Server.includes(EUServer.Turbine[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf61`);
        });
      } else if (Server.includes(EUServer.TwoFort[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf56`);
        });
      } else if (Server.includes(EUServer.Jailbreak[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf43`);
        });
      } else if (Server.includes(EUServer.Mario_Kart[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf46`);
        });
      } else if (Server.includes(EUServer.Dodgeball_2[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf57`);
        });
      } else if (Server.includes(EUServer.The_Hidden[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf38`);
        });
      } else if (Server.includes(EUServer.Prophunt[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf36`);
        });
      } else if (Server.includes(EUServer.Deathrun_2[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf37`);
        });
      } else if (Server.includes(EUServer.MGE_2[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf39`);
        });
      } else if (Server.includes(EUServer.Randomizer[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf30`);
        });
      } else if (Server.includes(EUServer.Trade[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf58`);
        });
      } else if (Server.includes(EUServer.Dustbowl[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf31`);
        });
      } else if (Server.includes(EUServer.Orange_x3[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf35`);
        });
      } else if (Server.includes(EUServer.Smash_Bros[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf32`);
        });
      } else if (Server.includes(EUServer.Dodgeball_3[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf1`);
        });
      } else if (Server.includes(EUServer.Hightower_3[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf2`);
        });
      } else if (Server.includes(EUServer.Zombie_Fortress[xServer])) {
        return new Promise((resolve) => {
          resolve(`tf62`);
        });
      }
    }
  } else if (Region.includes('SG')) {
    if (Server.includes(SGServer.TwoFort)) {
      return new Promise((resolve) => {
        resolve(`tf22`);
      });
    } else if (Server.includes(SGServer.Deathrun)) {
      return new Promise((resolve) => {
        resolve(`tf20`);
      });
    } else if (Server.includes(SGServer.Dodgeball)) {
      return new Promise((resolve) => {
        resolve(`tf14`);
      });
    } else if (Server.includes(SGServer.MGE)) {
      return new Promise((resolve) => {
        resolve(`tf23`);
      });
    } else if (Server.includes(SGServer.Trade)) {
      return new Promise((resolve) => {
        resolve(`tf60`);
      });
    }
  } else if (Region.includes('US')) {
    if (Server.includes(USServer.Deathrun)) {
      return new Promise((resolve) => {
        resolve(`tf28`);
      });
    } else if (Server.includes(USServer.Dodgeball)) {
      return new Promise((resolve) => {
        resolve(`tf45`);
      });
    } else if (Server.includes(USServer.Dustbowl)) {
      return new Promise((resolve) => {
        resolve(`tf65`);
      });
    } else if (Server.includes(USServer.Freak_Fortress_2)) {
      return new Promise((resolve) => {
        resolve(`tf44`);
      });
    } else if (Server.includes(USServer.Hightower)) {
      return new Promise((resolve) => {
        resolve(`tf63`);
      });
    } else if (Server.includes(USServer.Jailbreak)) {
      return new Promise((resolve) => {
        resolve(`tf40`);
      });
    } else if (Server.includes(USServer.Jump)) {
      return new Promise((resolve) => {
        resolve(`tf12`);
      });
    } else if (Server.includes(USServer.MGE)) {
      return new Promise((resolve) => {
        resolve(`tf11`);
      });
    } else if (Server.includes(USServer.Prophunt)) {
      return new Promise((resolve) => {
        resolve(`tf24`);
      });
    } else if (Server.includes(USServer.Slender_Fortress)) {
      return new Promise((resolve) => {
        resolve(`tf25`);
      });
    } else if (Server.includes(USServer.Trade)) {
      return new Promise((resolve) => {
        resolve(`tf3`);
      });
    } else if (Server.includes(USServer.Turbine)) {
      return new Promise((resolve) => {
        resolve(`tf7`);
      });
    } else if (Server.includes(USServer.Saxton_Hale)) {
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
