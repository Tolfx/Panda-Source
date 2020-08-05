//import { WebhookClient, MessageEmbed } from "discord.js";
import fs from "fs"
const puppeteer = require('puppeteer');
const { stripIndents } = require("common-tags");
import { CustomLogger } from "../lib/customLogs"
import config from "../../config.json"
import cheerio from "cheerio";
import { WebhookClient, MessageEmbed } from "discord.js";
import {getToken, getID} from "../lib/webhook";
import Steam from "../steamHandler/steamHandler"
import paths from '../types/paths';

const steam = new Steam();

let url = "https://www.panda-community.com/shoutbox/fullpage";
let path = paths.C_Shoutbox;
let pathSteam = paths.C_SteamEdit;
let DoneResult = "false";

const options = {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu'
    ],
    headless: true
}

const log = new CustomLogger;

export class shoutBox
{

    /**
     * @description Watches the shoutbox
     */
    public async watchNew() {
    
        const browser = await puppeteer.launch(options);
        const page = await browser.newPage();

        try {   

            const previousSession = fs.existsSync(path)

            if (previousSession) {

                const content = fs.readFileSync(path);
                const cookiesArr = JSON.parse(content);

                const content2 = fs.readFileSync(pathSteam);
                const cookiesArr2 = JSON.parse(content2);
        
                //If the cookies have no length
                if (cookiesArr.length !== 0) {
                    //If there are none cookies start this.
                    if (!cookiesArr[0]) {
                        log.warn('No cookies in: ' + path);
                        await page.goto(url);
                        await page.waitFor(500);
                        await page.click('#top > div.p-body > div > div > div > div > div > div.blocks > div.block.uix_loginProvider__row > div > div > dl > dd > ul > li:nth-child(1) > a > span');
                        await page.waitFor(2000);
        
                        await steam.oldLogin(page).then(async data => {
                            if (data) {
                                await this.saveCookies(page, path);
                                await page.goto(url);
                                await page.waitFor(2000);
                                return DoneResult = "true";
                            } else {
                                log.warn('Couldnt login to steam.');
                            };
                        });
                    } else {
                        //If the cookies has expire start this..
                        if (cookiesArr[2].expires <= Date.now() / 1000) {
                            log.warn('Cookies expired in: ' + path);
                            await page.goto(url);
                            await page.click('#top > div.p-body > div > div > div > div > div > div.blocks > div.block.uix_loginProvider__row > div > div > dl > dd > ul > li:nth-child(1) > a > span');
                            await page.waitFor(2000);
        
                            await steam.oldLogin(page).then(async data => {
                                if(data) {
                                    await this.saveCookies(page, path);
                                    await page.goto(url);
                                    await page.waitFor(2000);
                                    return DoneResult = "true";
                                } else {
                                    log.warn('Couldnt login to steam.');
                                }
                            });
                            // Save Cookies
                            this.saveCookies(page, path);
                
                        } else {
                            //If the cookies hasnt expired continue.
                            log.normal('Adding the cookies');
                            await page.setCookie(...cookiesArr);
                            await page.setCookie(...cookiesArr2);
                        };
                    };
        
                    if (DoneResult === "true") {
                        await this.checkBox(page, browser);
                    } else if (DoneResult === "false") {
                        log.normal('Session has been loaded in the browser');
                        await page.goto(url);
                        await page.waitFor(2000);

                        if(await this.checkNotLogin(page) === true) {
                            await page.click('#top > div.p-body > div > div > div > div > div > div.blocks > div.block.uix_loginProvider__row > div > div > dl > dd > ul > li:nth-child(1) > a > span');
                            await page.waitFor(2000);
                            steam.oldLogin(page).then(async data => {
                                if(data)
                                {
                                    await page.waitFor(2000);
                                    await this.saveCookies(page, path);
                                    await this.checkBox(page, browser);
                                }
                                else
                                {
                                    log.warn('Couldnt login to steam.');
                                }
                            });
                        } else {
                            await page.waitFor(2000);
                            await this.saveCookies(page, path);
                            await this.checkBox(page, browser);
                        }
                        
                    } else {
                        return;
                    };
                }
            }
        } catch (err) {
            await page.waitFor(500);
            await page.goto(url, {waitUntil: ["domcontentloaded"]});
            log.warn(err, true);
        };
};

    private async checkNotLogin(page)
    {
        try 
        {
            let [totalBans] = await page.$x('//*[@id="top"]/div[4]/div/div/div/div/div/div[2]/div[2]/div/div/dl/dd/ul/li[1]/a/span');
            let textContentTotalBans = await totalBans.getProperty('textContent');
            let rawTextTotalbans = await textContentTotalBans.jsonValue();
            return true;
        } catch (err)
        {
            return false;
        }
    };

    private async saveCookies(page, path) {
        const cookiesObject = await page.cookies();
        fs.writeFileSync(path, JSON.stringify(cookiesObject));
        log.normal('Session has been saved to ' + path);
    };

    //Make this more efficient one day okey good.
    private async checkBox(page, browser)
    {
        let countToClose: number = 0;
        while(true)
        {

            if (countToClose === 1000)
            {
                await browser.close();
                this.watchNew();
                countToClose = 0;
                log.normal('Reloading the browser for \"shoutbox\"', true);
                break;
            } 
            else 
            {
                let ID_Discord = getID(config.Discord.ShoutboxURL);
                let Token_Discord = getToken(config.Discord.ShoutboxURL);

                let listSelector = '#siropuShoutboxFullPage > div.siropuShoutbox.block > div > div.block-body > ol > li:nth-child(25)';
                var results = await page.$$eval(listSelector, list => {
                    var results = [];
                    for (let i = 0; i < list.length; i++) {
                    var data = {
                        //textContent: list[i].textContent,
                        html: list[i].innerHTML
                    };
                    results.push(data);
                    }
                    //
                    return results;
                });

                let $ = cheerio.load(results[0].html);
                let imgEmoji = $('.bbWrapper').children('img').attr('src');
                let image = $('.bbWrapper').children('div').children('img').attr('data-url');
                let user = $('.username').children('span').text();
                let emoji = $('.bbWrapper').children('img').attr('alt');
                let message = $.text();
                let finalTouch = message.trim().replace(/\n/, " ").trim().split(/\n/g);

                let shout = paths.LatestShout;

                //Normal Message
                if(imgEmoji === undefined && image === undefined)
                {   
                    let objectMessage = 
                    {
                        Message: finalTouch[0]
                    };

                    const content = fs.readFileSync(shout);
                    const Checker = JSON.parse(content);
    
                    if (objectMessage.Message !== Checker.Message)
                    {
                        fs.writeFileSync(shout, JSON.stringify(objectMessage));
                        const webhookClient = new WebhookClient(ID_Discord, Token_Discord);
                            
                        const embed = new MessageEmbed()
                            .setColor("#40D79C")
                            .setDescription(stripIndents`
                            ${objectMessage.Message}`);
                    
                        webhookClient.send('', {
                            username: '',
                            embeds: [embed],
                        });
                        await page.waitFor(2000);
                        await page.goto(url, { waitUntil: ["domcontentloaded"] });
                        ++countToClose;
                        continue;
                    };
                //Emoji
                } else if (image === undefined) {

                    let objectEmoji = 
                    {
                        user: user,
                        emoji: emoji
                    };

                    const content = fs.readFileSync(shout);
                    const Checker = JSON.parse(content);
    
                    if (objectEmoji.emoji !== Checker.img && objectEmoji.user !== Checker.user)
                    {
                        fs.writeFileSync(shout, JSON.stringify(objectEmoji));
                        const webhookClient = new WebhookClient(ID_Discord, Token_Discord);
                            
                        const embed = new MessageEmbed()
                            .setColor("#40D79C")
                            .setDescription(stripIndents`
                            ${finalTouch[0]}
                            Emoji: ${objectEmoji.emoji}`);
                    
                        webhookClient.send('', {
                            username: '',
                            embeds: [embed],
                        });
                        await page.waitFor(2000);
                        await page.goto(url, { waitUntil: ["domcontentloaded"] });
                        ++countToClose;
                        continue;
                    };
                //Image
                } else {
                    let objectImage = 
                    {
                        user: user,
                        img: image
                    };

                    const content = fs.readFileSync(shout);
                    const Checker = JSON.parse(content);
    
                    if (objectImage.img !== Checker.img && objectImage.user !== Checker.user)
                    {
                        fs.writeFileSync(shout, JSON.stringify(objectImage));
                        const webhookClient = new WebhookClient(ID_Discord, Token_Discord);
                            
                        const embed = new MessageEmbed()
                            .setColor("#40D79C")
                            .setDescription(stripIndents`
                            ${objectImage.user}`)
                            .setImage(objectImage.img)
                    
                        webhookClient.send('', {
                            username: '',
                            embeds: [embed],
                        });
                        await page.waitFor(2000);
                        await page.goto(url, { waitUntil: ["domcontentloaded"] });
                        ++countToClose;
                        continue;
                    };
            }
                await page.waitFor(2000);
                ++countToClose;
                await page.goto(url, { waitUntil: ["domcontentloaded"] });
                continue;
            };
        };//While loop
    }
};//end of class shoutbox