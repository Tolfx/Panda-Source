import superagent from 'superagent';
import { MessageEmbed } from 'discord.js';

export class Kiss {
  public run(client, message, args) {
    this.kiss(message, args);
  }

  private async kiss(message, args) {
    const user1 = message.mentions.members.first();

    let { body } = await superagent.get(`https://nekos.life/api/v2/img/kiss`);

    if (!args[0]) return message.channel.send('Tag someone');

    if (!user1) return message.channel.send('Tag someone');

    if (user1.id === message.author.id) return message.channel.send("You can't kiss yourself");

    const embed = new MessageEmbed()
      .setColor(0xff7373)
      .setImage(body.url)
      .setTitle(`**${message.author.username}** kissed **${user1.user.username}**!`)
      .setTimestamp();

    message.channel.send(embed);
  }
} //End of class
