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

    let embed = new MessageEmbed()
    .setColor(0x9c98d9);

    this.getInfo(args[0], (err, result) => {
      if(err)
        return message.channel.send("Error: "+err)

      let sid = new steamID(result.steamID64);
      message.channel.send(
        embed
        .setAuthor(result.custom != "" ? result.custom : result.currentName, result.avatar)
        .setDescription(stripIndents`
          **SteamID:** ${sid.getSteam2RenderedID()}
          **SteamID32:** ${sid.getSteam3RenderedID()}
          **SteamID64:** ${sid.getSteamID64()}
          
          **Privacy:** ${result.privacy}
          **Joined:** ${result.joined}
          **Status:** ${result.onlineState}
          
          [Steam Profile URL](${result.url})`)
      );
    });
  }

  private getInfo(info: string, callback?) {
    let pushURL = [];

    if (info.match(/STEAM_[0-9]:[0-9]:[0-9]{7}/g)) {
      pushURL.push({
        url: `https://steamcommunity.com/profiles/${this.getID64(info)}/?xml=1`,
      });
    } else if (info.includes('https://steamcommunity.com/')) {
      pushURL.push({
        url: info+"/?xml=1",
      });
    } else if (!info.match(/\w/g)) {
      pushURL.push({
        url: `https://steamcommunity.com/profiles/${this.getID64(info)}/?xml=1`,
      });
    } else if (info.match(/[0-9]{1}/g)) {
      pushURL.push({
        url: `https://steamcommunity.com/profiles/${this.getID64(info)}/?xml=1`,
      });
    } else if (info.match(/\[U:[0-9]:[0-9]{9}]/g)) {
      pushURL.push({
        url: `https://steamcommunity.com/profiles/${this.getID64(info)}/?xml=1`,
      });
    } else if (info.match(/\w/g)) {
      pushURL.push({
        url: `https://steamcommunity.com/id/${info}/?xml=1`,
      });
    }

    request(
      {
        url: `${pushURL[0].url}`,
        headers: { 'Content-Type': 'text/xml' },
      },
      (error, response, body) => {
        if (!error && response.statusCode == 200) {
          parseString(body, (err, result) => {
            if (result.response) {
              return callback(new Error('No matching steamID64'));
            } else {
              let steamID64 = result.profile.steamID64[0];
              let avatar = result.profile.avatarMedium[0];
              let privacy = result.profile.privacyState[0];
              let custom = result.profile.customURL[0];
              let joined = result.profile.memberSince[0];
              let onlineState = result.profile.onlineState[0];
              let currentName = result.profile.steamID[0];

              callback(null, {
                steamID64,
                avatar,
                privacy,
                custom,
                joined,
                onlineState,
                url: pushURL[0].url.replace("/?xml=1", ""),
                currentName
              });
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
