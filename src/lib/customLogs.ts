var colors = require('colors');
import { WebhookClient, MessageEmbed } from 'discord.js';
import fs from 'fs';
import config from '../../config.json';
import { getToken, getID } from '../lib/webhook';

export class CustomLogger {
  private Webhook(info, color: string) {
    let ID = getID(config.Discord.logs);
    let Token = getToken(config.Discord.logs);

    const webhookClient = new WebhookClient(ID, Token);

    const embed = new MessageEmbed().setColor(color).setDescription(info);

    webhookClient.send('', {
      username: 'Logs',
      embeds: [embed],
    });
  }

  public warn(body: any, discord?: boolean) {
    let d = new Date();
    console.log(
      `${d.getFullYear()}-${
        d.getMonth() + 1
      }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} | warn:`,
      colors.red(body)
    );
    fs.appendFile(
      'logs.txt',
      `${d.getFullYear()}-${
        d.getMonth() + 1
      }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} | warn: ` +
        body +
        '\n',
      function (err) {
        if (err) throw err;
      }
    );
    if (discord)
      return this.Webhook(
        `${d.getFullYear()}-${
          d.getMonth() + 1
        }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} | warn: ` + body,
        '#D75040'
      );
  }

  public normal(body: any, discord?: boolean) {
    let d = new Date();
    console.log(
      `${d.getFullYear()}-${
        d.getMonth() + 1
      }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} | verbose:`,
      colors.cyan(body)
    );
    fs.appendFile(
      'logs.txt',
      `${d.getFullYear()}-${
        d.getMonth() + 1
      }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} | verbose: ` +
        body +
        '\n',
      function (err) {
        if (err) throw err;
      }
    );

    if (discord)
      return this.Webhook(
        `${d.getFullYear()}-${
          d.getMonth() + 1
        }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} | verbose: ` + body,
        '#40D79C'
      );
  }

  public debug(body: any, discord?: boolean) {
    let d = new Date();
    console.log(
      `${d.getFullYear()}-${
        d.getMonth() + 1
      }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} | debug:`,
      colors.magenta(body)
    );
    fs.appendFile(
      'logs.txt',
      `${d.getFullYear()}-${
        d.getMonth() + 1
      }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} | debug: ` +
        body +
        '\n',
      function (err) {
        if (err) throw err;
      }
    );

    if (discord)
      return this.Webhook(
        `${d.getFullYear()}-${
          d.getMonth() + 1
        }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} | debug: ` + body,
        '#8B008B'
      );
  }
} //End of class
