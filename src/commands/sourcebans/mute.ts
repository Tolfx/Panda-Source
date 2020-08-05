/*

This code will gag an user. lol

*/
import steam from "../../steamHandler/steamHandler";
const puppeteer = require('puppeteer');
import config from "../../../config.json";
import fs from "fs";
import { MessageEmbed } from "discord.js";
import { stripIndents } from "common-tags";
import { CustomLogger } from "../../lib/customLogs"
import {CommandParser} from "../../lib/commandParser";

const log = new CustomLogger;

const Steam = new steam();
let path = "cookies_Sourceban.json";

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

export class sourceMute
{

public run(client, message, args)
{
    this.mute(client, message, args);
};

private async mute(client, message, args) 
{
    if (message.author.id !== config.General.discord_Owner_ID) return message.channel.send('Not owner.');

    let parms = CommandParser.parseParams(args.slice(0).join(" "));

    let nickname = parms.nickname;
    let steamID = parms.steamid;
    let length = parms.length;
    let reason = parms.reason;

    if (!nickname) return message.channel.send(`You need to insert a nickname..`);
    if (!steamID) return message.channel.send(`You need to provide a steamid.`);
    if (!length) return message.channel.send(`You need to provide the length`);
    if (!reason) return message.channel.send(`You need to provide a reason.`);

    const endURL = `https://bans.alisha.se/index.php?p=commslist&advSearch=${steamID}&advType=steamid`;

    const embed = new MessageEmbed()
    .setColor("#5940D7")
    .setDescription(stripIndents`
    **Success**
    Muted user: ${nickname}
    SteamID: ${steamID}
    Length: ${length} min
    Reason: ${reason}
    
    [Sourceban link](${endURL})`);

    const url = "https://bans.alisha.se/index.php?p=admin&c=comms";

    let DoneResult = "false";

    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    try {
        // If the cookies file exists, read the cookies.
        const previousSession = fs.existsSync(path)

        //If there are any..
        if (previousSession) {
        const content = fs.readFileSync(path);
        const cookiesArr = JSON.parse(content);

        //If the cookies have no length
        if (cookiesArr.length !== 0) {
            //If there are none cookies start this.
            if (!cookiesArr[0]) {
                log.warn('No cookies in: ' + path);
                await page.goto(url);
                await page.click("#loginSubmit > center > a > img");
                await page.waitFor(2000);

                await Steam.oldLogin(page).then(async data => {
                    if (data) {
                        await this.saveCookies(page, path);
                        await page.goto(url);
                        await page.waitFor(2000);
                        await this.scriptLunch(page, nickname, steamID, length, reason);
                        await browser.close();
                        message.channel.send(embed);
                        return DoneResult = "true";
                    } else {
                        log.warn('Couldnt login to steam.');
                        return message.channel.send('Couldnt login');
                    }
                });
            } else {
                //If the cookies has expire start this..
                if (cookiesArr[0].expires <= Date.now() / 1000) {
                    log.warn('Cookies expired in: ' + path);
                    await page.goto(url);
                    await page.click("#loginSubmit > center > a > img");
                    await page.waitFor(2000);

                    await Steam.oldLogin(page).then(async data => {
                        if(data) {
                            await this.saveCookies(page, path);
                            await page.goto(url);
                            await page.waitFor(2000);
                            await this.scriptLunch(page, nickname, steamID, length, reason);
                            await browser.close();
                            message.channel.send(embed);
                            return DoneResult = "true";
                        } else {
                            log.warn('Couldnt login to steam.');
                            return message.channel.send('Couldnt login');
                        }
                    });
                    // Save Cookies
                    this.saveCookies(page, path);
        
                } else {
                    //If the cookies hasnt expired continue.
                    log.normal('Adding the cookies');
                    await page.setCookie(...cookiesArr);
                }
            };

            if (DoneResult === "true") {
                return log.normal('Everything was success in mute.ts');
            } else if (DoneResult === "false") {
                log.normal('Session has been loaded in the browser');
                await page.goto(url);
                await page.waitFor(2000);
                if(page.url() != url)
                {
                    await page.click("#loginSubmit > center > a > img");
                    await page.waitFor(2000);
                    Steam.oldLogin(page).then(async data => {
                        if(data)
                        {
                            await page.waitFor(2000);
                            await this.scriptLunch(page, nickname, steamID, length, reason);
                            await this.saveCookies(page, path);
                            message.channel.send(embed);
                            return browser.close();
                        }
                        else
                        {
                            log.warn('Couldnt login to steam.');
                            message.channel.send('Couldnt login');
                        }
                    })
                }
                else
                {
                    await this.scriptLunch(page, nickname, steamID, length, reason);
                    await this.saveCookies(page, path);
                    message.channel.send(embed);
                    return browser.close();
                }
                
            } else {
                return browser.close();
            }

            };
        }; 
    } catch(error) {
        log.warn("A error from catch: " + error);
        return browser.close();
    }

}

private async scriptLunch(page, nickname, steamid, length, reason)
{
    let xajax_AddBlock;
    await page.evaluate((nickname, steamid, length, reason) => {
        xajax_AddBlock(nickname, 1, steamid, length, reason);
    }, nickname, steamid, length, reason);
}

private async saveCookies(page, path) {
    const cookiesObject = await page.cookies();
    fs.writeFileSync(path, JSON.stringify(cookiesObject));
    log.normal('Session has been saved to ' + path);
};

};//End of class