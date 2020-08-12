/*

When life goes dark.. execute this to end all racism on panda.tf

*/
import request from "request";
import cheerio from "cheerio";
import puppeter from "puppeteer";
import { WebhookClient, MessageEmbed } from "discord.js";
import fs from "fs"
import { CustomLogger } from "../lib/customLogs"
const { stripIndents } = require("common-tags");
import paths from '../types/paths';
import {getToken, getID} from "../lib/webhook";
import config from "../../config.json"
import * as checker from "@tensorflow-models/toxicity"

let final = [];
const log = new CustomLogger;

let D_ID = getID(config.Discord.EndRacism);
let D_Token = getToken(config.Discord.EndRacism);
let path = "json/endRacism.json"

/**
 * 
 * @param URL The url of hlstatx.
 * @param ID The id of the server.
 * @param callback Result(s)
 */
export function endRacism(
    URL: string,
    ID: string, 
    callback: (err: null | Error, result?: any) => void) {
    
    //Errors for safety;
    if(!URL) return callback(new Error('No URL was provided'));
    if(!ID) return callback(new Error('No ID was provided'));
    if(!URL.includes('hlstats.php')) return callback(new Error('Not a valid link.'));
    if(!ID.includes('tf')) return callback(new Error('Invalid ID'));

    setInterval(() => {
        
        request(URL+"?mode=chat&game="+ID,
            async (error, response, html) => {
                if(!error && response.statusCode == 200) {
    
                    let $ = cheerio.load(html);
                    let result = newChat($);
                    const webhookClient = new WebhookClient(D_ID, D_Token);


                    await checker.load(0.9, ["toxicity", "insult", "severe_toxicity"]).then(async model => {
                        for (var i = result.length -1; i >= 0; i--) {
                            fs.writeFileSync(path, JSON.stringify(result[0]));
                            
                            let chatLog = result[i].Chat;
                            let user = result[i].User;
                            let userURL = result[i].UserURL;
                            let time = result[i].Time;

                            model.classify(result[i].Chat).then(async predictions => {

                                let insult = 
                                {
                                    label: predictions[0].label,
                                    probabilities: predictions[0].results[0].probabilities[1],
                                    boolean: predictions[0].results[0].match
                                };

                                let toxicity = 
                                {
                                    label: predictions[2].label,
                                    probabilities: predictions[2].results[0].probabilities[1],
                                    boolean: predictions[2].results[0].match
                                };
                                
                                final.push({
                                    "chat": chatLog,
                                    "user": user,
                                    "time": time,
                                    "userURL": userURL,
                                    "toxicity": (toxicity.probabilities),
                                    "insult": (insult.probabilities)
                                })
                
                                return final;
                            });

                            if(i === result.length-1) {
                                final.map(chat => {
                                    if(chat.toxicity < 0.40) {
                                        return;
                                    } else {
                                        let message = stripIndents`
                                        **${chat.time}** | [${chat.user}](https://hlstats.panda-community.com/${chat.userURL}) : ${chat.chat}
                                        
                                        Toxic: ${chat.toxicity}%
                                        Insult: ${chat.insult}%`;
                                        const embed = new MessageEmbed()
                                        .setDescription(message)
                                        .setColor("#D75040");
                                    
                                        webhookClient.send('', {
                                            username: 'Toxic o-meter',
                                            embeds: [embed],
                                        });
                                        final = [];
                                        return;
                                    };
                                });
                            };
                        };//end of for loop
                    });
                };
            });  
    }, 60000)
};

function newChat($) {
    let D_newChat = [];
    for(var i = 2; i < 51; ++i) {
                      
        let time = $(`body > div.content > div.block > div:nth-child(6) > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`).text().trim();
        let player = $(`body > div.content > div.block > div:nth-child(6) > table > tbody > tr:nth-child(${i}) td:nth-child(2) > a`).text().trim().split("/>");
        let playerURL = $(`body > div.content > div.block > div:nth-child(6) > table > tbody > tr:nth-child(${i}) > td:nth-child(2) > a`).attr('href');
        let chat = $(`body > div.content > div.block > div:nth-child(6) > table > tbody > tr:nth-child(${i}) > td:nth-child(3)`).text().trim();
        
        const content = fs.readFileSync(path);
        const Checker = JSON.parse(content);
    
        let objectJson =
        {
            Time: time,
            User: player[1],
            UserURL: playerURL,
            Chat: chat,
        };

        if (i === 50) {
            log.normal('Everything new!!')
            return D_newChat
        }
  
        if(objectJson.Time !== Checker.Time) {
            D_newChat.push(objectJson);
            continue;
        } else if (objectJson.Time === Checker.Time) {
            log.normal('New messages.. Sending')
            return D_newChat
        };        
    };
};