import { WebhookClient, MessageEmbed } from "discord.js";
import config from "../../config.json"
import fs from "fs"
import { CustomLogger } from "../lib/customLogs"
import cheerio from "cheerio"
import request from "request"
import paths from '../types/paths';
import {getToken, getID} from "../lib/webhook";
const { stripIndents } = require("common-tags");

const log = new CustomLogger;

let D_ID = getID(config.Discord.NewThread);
let D_Token = getToken(config.Discord.NewThread);
let path = paths.NewThread;
export class newThread
{

    private async newThreads($) {
        let A_newThreads = [];

        for (var i = 1; i < 6; ++i) {
            let title = $(`#top > div.p-body > div > div > div > div.p-body-sidebar > div.uix_sidebarInner > div > div:nth-child(5) > div > ul > li:nth-child(${i}) > div > div.contentRow-main.contentRow-main--close > a`).text().trim();
            let titleURL = $(`#top > div.p-body > div > div > div > div.p-body-sidebar > div.uix_sidebarInner > div > div:nth-child(5) > div > ul > li:nth-child(${i}) > div > div.contentRow-main.contentRow-main--close > a`).attr('href');
            let user = $(`#top > div.p-body > div > div > div > div.p-body-sidebar > div.uix_sidebarInner > div > div:nth-child(5) > div > ul > li:nth-child(${i}) > div > div.contentRow-main.contentRow-main--close > div:nth-child(3) > ul > li:nth-child(1)`).text().trim();
            let userURL = $(`#top > div.p-body > div > div > div > div.p-body-sidebar > div.uix_sidebarInner > div > div:nth-child(5) > div > ul > li:nth-child(${i}) > div > div.contentRow-figure`).attr('href');
            let section = $(`#top > div.p-body > div > div > div > div.p-body-sidebar > div.uix_sidebarInner > div > div:nth-child(5) > div > ul > li:nth-child(${i}) > div > div.contentRow-main.contentRow-main--close > div:nth-child(4) > a`).text().trim();
            let sectionURL = $(`#top > div.p-body > div > div > div > div.p-body-sidebar > div.uix_sidebarInner > div > div:nth-child(5) > div > ul > li:nth-child(${i}) > div > div.contentRow-main.contentRow-main--close > div:nth-child(4) > a`).attr('href');
            
            const content = fs.readFileSync(path);
            const Checker = JSON.parse(content);
    
            let objectJson =
            {
                title: title,
                titleURL: titleURL,
                user: user,
                userURL: userURL,
                section: section,
                sectionURL: sectionURL
            };

            log.normal(objectJson)
            if(objectJson.titleURL !== Checker.titleURL) {
                A_newThreads[i] = objectJson;
                A_newThreads.push(objectJson)
                continue;
            } else {
                log.normal(A_newThreads)
                return A_newThreads;
            }
            
        }
    }

    public async watchNew() {
        let url = "https://www.panda-community.com/";

        request(url,
            async (error, response, html) => {
                if(!error && response.statusCode == 200) {
                    let $ = cheerio.load(html);

                    let result = await this.newThreads($);

                    console.log(result);

                    const webhookClient = new WebhookClient(D_ID, D_Token);
                    
                    for(var j = 0; j < result.length; ++j) {
                        fs.writeFileSync(path, JSON.stringify(result[0]));
                        const embed = new MessageEmbed()
                        .setColor("#D7D040")
                        .setDescription(stripIndents`
                        Title: [${result[j].title}](${result[j].titleURL})
                        User: [${result[j].user}](${result[j].userURL})

                        Section: [${result[j].section}](${result[j].sectionURL})`);
                
                    webhookClient.send('', {
                        username: 'New Thread',
                        embeds: [embed],
                    });
                    }
                };
            });
    };

};//end of class