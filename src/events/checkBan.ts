
/*

this codes works now

*/
import { WebhookClient, MessageEmbed } from "discord.js";
import fs from "fs"
const { stripIndents } = require("common-tags");
import { CustomLogger } from "../lib/customLogs"
import cheerio from "cheerio"
import request from "request"
import paths from '../types/paths';
import {getToken, getID} from "../lib/webhook";
import config from "../../config.json"

let D_ID = getID(config.Discord.NewBans);
let D_Token = getToken(config.Discord.NewBans);
const path = paths.NewBan;

const log = new CustomLogger;

export default class CheckBans {

    private newBan($) {
        let A_storingData = [];
        let count = 1;
        for(var i = 2; i < 50; ++i) {
            
            let name = $(`#banlist > table > tbody > tr:nth-child(${i-1+count}) > td:nth-child(3) > div:nth-child(1)`).text().trim();
            let steamID = $(`#banlist > table > tbody > tr:nth-child(${i+count}) > td > div > table > tbody > tr:nth-child(3) > td:nth-child(2)`).text().trim();
            let invoked = $(`#banlist > table > tbody > tr:nth-child(${i+count}) > td > div > table > tbody > tr:nth-child(6) > td:nth-child(2)`).text().trim();
            let length = $(`#banlist > table > tbody > tr:nth-child(${i+count}) > td > div > table > tbody > tr:nth-child(7) > td:nth-child(2)`).text().trim();
            let reason = $(`#banlist > table > tbody > tr:nth-child(${i+count}) > td > div > table > tbody > tr:nth-child(9) > td:nth-child(2)`).text().trim();
            let admin = $(`#banlist > table > tbody > tr:nth-child(${i+count}) > td > div > table > tbody > tr:nth-child(10) > td:nth-child(2)`).text().trim();
            let server = $(`#banlist > table > tbody > tr:nth-child(${i+count}) > td > div > table > tbody > tr:nth-child(11) > td:nth-child(2)`).text().trim();
            let totaBlocks = $(`#banlist > table > tbody > tr:nth-child(${i+count}) > td > div > table > tbody > tr:nth-child(12) > td:nth-child(2)`).text().trim();
            
    
            const content = fs.readFileSync(path);
            const Checker = JSON.parse(content);
    
            let objectJson =
            {
                TotalBans: totaBlocks,
                NameOfUser: name,
                BanLength: length,
                Admin: admin,
                SteamID: steamID,
                Reason: reason,
                Server: server,
                Invoked: invoked
            };
    
            if(objectJson.Invoked !== Checker.Invoked) {
                A_storingData.push(objectJson)
                ++count
                continue;
            } else {
                return A_storingData;
            }
        }
    }

    /**
     * 
     * @param url - The url for sourcebans comms
     */
    public async checker(url: string)
    {
    setInterval(() => {

    request(url,
        (error, response, html) => {
            if(!error && response.statusCode == 200) {
                const $ = cheerio.load(html);

                let result = this.newBan($);
                const webhookClient = new WebhookClient(D_ID, D_Token);
                log.normal(`Found: ${result.length} new bans..`, true);

                    for(var j = 0; j < result.length; ++j) {
                        fs.writeFileSync(path, JSON.stringify(result[0]));
                        const embed = new MessageEmbed()
                        .setColor("#D75040")
                        .setDescription(stripIndents`
                        **New Ban**
                        
                        **Name of user:** \`${result[j].NameOfUser}\`
                        **SteamID:** \`${result[j].SteamID}\`
                        **Length:** \`${result[j].BanLength}\`
                        **Reason:** \`${result[j].Reason}\`
                        **Blocked from:** \`${result[j].Server}\`
                        
                        **Admin:** \`${result[j].Admin}\``);
                
                    webhookClient.send('', {
                        username: 'New Ban',
                        embeds: [embed],
                    });
                    }
            };
        });
    }, 600000);
    };

}; //End of class