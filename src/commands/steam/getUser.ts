import { MessageEmbed } from 'discord.js';
import { stripIndents } from 'common-tags';
import request from 'request';
import steamID from 'steamid';
var parseString = require('xml2js').parseString;

export class getUserSteam {
  public run(client, message, args) {
    this.start(client, message, args);
  }

  private start(client, message, args) {
    if (!args[0]) return;

    let embed = new MessageEmbed().setColor(0x9c98d9);
    let reg = new RegExp('^[0-9]+$');
    if (args[0].includes('STEAM_') || args[0].includes('[U:') || args[0].length === reg) {
      let steamID64 = this.getID64(args[0]);
      this.getInfo64(steamID64, (err, result) => {
        if (err) return message.channel.send(`${err}`);
        try {
          let sid = new steamID(result.steamID64);

          message.channel.send(
            embed.setAuthor(result.custom, result.avatar).setDescription(stripIndents`
                    **SteamID:** ${sid.getSteam2RenderedID()}
                    **SteamID32:** ${sid.getSteam3RenderedID()}
                    **SteamID64:** ${sid.getSteamID64()}
                    
                    **Privacy:** ${result.privacy}
                    **Joined:** ${result.joined}
                    **Status:** ${result.onlineState}`)
          );
        } catch (err) {
          message.channel.send('Error: ' + err);
        }
      });
    } else if (args[0].includes('https://steamcommunity.com/')) {
      this.getInfoSteamURL(args[0], (err, result) => {
        if (err) return message.channel.send(`${err}`);
        try {
          let sid = new steamID(result.steamID64);

          message.channel.send(
            embed.setAuthor(result.custom, result.avatar).setDescription(stripIndents`
                    **SteamID:** ${sid.getSteam2RenderedID()}
                    **SteamID32:** ${sid.getSteam3RenderedID()}
                    **SteamID64:** ${sid.getSteamID64()}
                    
                    **Privacy:** ${result.privacy}
                    **Joined:** ${result.joined}
                    **Status:** ${result.onlineState}`)
          );
        } catch (err) {
          message.channel.send('Error: ' + err);
        }
      });
    } else {
      this.getInfoCutomURL(args[0], (err, result) => {
        if (err) return message.channel.send(`${err}`);
        try {
          let sid = new steamID(result.steamID64);

          message.channel.send(
            embed.setAuthor(result.custom, result.avatar).setDescription(stripIndents`
                    **SteamID:** ${sid.getSteam2RenderedID()}
                    **SteamID32:** ${sid.getSteam3RenderedID()}
                    **SteamID64:** ${sid.getSteamID64()}
                    
                    **Privacy:** ${result.privacy}
                    **Joined:** ${result.joined}
                    **Status:** ${result.onlineState}`)
          );
        } catch (err) {
          message.channel.send('Error: ' + err);
        }
      });
    }
  }

  private getInfoCutomURL(customURL, callback: (err: null | Error, result?: any) => void) {
    request(
      {
        url: `https://steamcommunity.com/id/${customURL}/?xml=1`,
        headers: { 'Content-Type': 'text/xml' },
      },
      (error, response, body) => {
        if (!error && response.statusCode == 200) {
          parseString(body, (err, result) => {
            if (result.response === undefined) {
              let steamID64 = result.profile.steamID64[0];
              let avatar = result.profile.avatarMedium[0];
              let privacy = result.profile.privacyState[0];
              let custom = result.profile.customURL[0];
              let joined = result.profile.memberSince[0];
              let onlineState = result.profile.onlineState[0];

              callback(null, {
                steamID64,
                avatar,
                privacy,
                custom,
                joined,
                onlineState,
              });
            } else {
              return callback(new Error('No matching CustomURL'));
            }
          });
        }
      }
    );
  }

  private getInfo64(steamid64, callback: (err: null | Error, result?) => void) {
    request(
      {
        url: `https://steamcommunity.com/profiles/${steamid64}/?xml=1`,
        headers: { 'Content-Type': 'text/xml' },
      },
      (error, response, body) => {
        if (!error && response.statusCode == 200) {
          parseString(body, (err, result) => {
            if (!result.response === undefined) {
              let steamID64 = result.profile.steamID64[0];
              let avatar = result.profile.avatarMedium[0];
              let privacy = result.profile.privacyState[0];
              let custom = result.profile.customURL[0];
              let joined = result.profile.memberSince[0];
              let onlineState = result.profile.onlineState[0];

              callback(null, {
                steamID64,
                avatar,
                privacy,
                custom,
                joined,
                onlineState,
              });
            } else {
              return callback(new Error('No matching steamID64'));
            }
          });
        }
      }
    );
  }

  private getInfoSteamURL(url, callback: (err: null | Error, result?) => void) {
    request(
      {
        url: `${url}?xml=1`,
        headers: { 'Content-Type': 'text/xml' },
      },
      (error, response, body) => {
        if (!error && response.statusCode == 200) {
          parseString(body, (err, result) => {
            if (!result.response === undefined) {
              let steamID64 = result.profile.steamID64[0];
              let avatar = result.profile.avatarMedium[0];
              let privacy = result.profile.privacyState[0];
              let custom = result.profile.customURL[0];
              let joined = result.profile.memberSince[0];
              let onlineState = result.profile.onlineState[0];

              callback(null, {
                steamID64,
                avatar,
                privacy,
                custom,
                joined,
                onlineState,
              });
            } else {
              return callback(new Error('No matching URL'));
            }
          });
        }
      }
    );
  }

  private getID64(id) {
    let sid = new steamID(id);
    return sid.getSteamID64();
  }
} //End of class
