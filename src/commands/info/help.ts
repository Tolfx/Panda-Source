import { MessageEmbed } from 'discord.js';
import { stripIndents } from 'common-tags';
import config from '../../../config.json';

export default class help {
  public static run(client, message, args) {
    const embed = new MessageEmbed()
      .setAuthor(
        client.user.username,
        client.user.displayAvatarURL({
          format: 'png',
          dynamic: 'true',
          size: 128,
        })
      )
      .setTimestamp()
      .setDescription(
        stripIndents`
        **Prefix of bot:** \`${config.General.prefix}\`

        **General Knowledge:** 
        \`If there is a ? that means is optional.\`
        \`If there is a | it means: or.\`

        **Commands**
        [
        
        **Hlstats:**
        \`${config.General.prefix}listbans [Username | SteamID]\`
        \`${config.General.prefix}listcomms [Username | SteamID]\`
        \`${config.General.prefix}topten [EU | SG | US] [Server]\`
        \`${config.General.prefix}search [Username | SteamID] ?[EU | SG | US] ?[Server]\`

        **Fun:**
        \`${config.General.prefix}kiss [Tag]\`
        \`${config.General.prefix}hug [Tag]\`
        \`${config.General.prefix}8ball [qeustion]\`
        
        **Steam:**
        \`${config.General.prefix}steamid [SteamID, SteamID64, SteamID32, CustomURl, URL]\`
        ]
        This bot is configured on panda.tf and is purpose is to check stuff from panda.tf

        *More features will be added in the future. (if i want to lol)*`
      )
      .setColor('#8F6787')
      .setFooter(message.id);

    message.channel.send(embed);
  }
}
