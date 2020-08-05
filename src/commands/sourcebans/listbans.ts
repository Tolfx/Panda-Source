import { MessageEmbed } from 'discord.js';
import { stripIndents } from "common-tags";
import config from "../../../config.json";
const puppeteer = require('puppeteer');

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

export default class listbans {

    //Main function to start the command.
    public run(client, message, args) {
        this.bansBlock(message, args)
    }

    private async bansBlock(message, args) {

        //The url 
        const url = (await this.linksSourceban(args[0])).toString();
        //const tdArray: Array<number> = [3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31];

        //If the user doesn't provide something to search on this if statement will activate.
        if (!args[0]) return message.channel.send(`You gonna search for air..? Use the right format: \`${config.General.prefix}listbans [Username | SteamID]\``)

        const browser = await puppeteer.launch(options);
        const page = await browser.newPage();
    
        await page.goto(url);

        try {

            //gets the information from the url, this is spread around the whole code.
            let [noBlock] = await page.$x(`//*[@id="content"]/h3/i`); 
            let textContentNoBlock = await noBlock.getProperty('textContent');
            let rawTextNoblock= await textContentNoBlock.jsonValue().then(async data => {

                //If the search the user did is empty, this if statement takes care of it so it doesn't catch an error.
                if(data.trim() === `Total Blocks: 0`) {
                    message.channel.send(`Couldnt find any sort of ban(s) on: \`${args[0]}\`, please try again.`);
                } else {
                    let [nameOfUser] = await page.$x(`//*[@id="banlist"]/table/tbody/tr[3]/td/div/table/tbody/tr[2]/td[2]`); 
                    let textContentNameOfUser = await nameOfUser.getProperty('textContent');
                    let rawTextNameOfUser = await textContentNameOfUser.jsonValue();
        
                    let [steamID] = await page.$x(`//*[@id="banlist"]/table/tbody/tr[3]/td/div/table/tbody/tr[3]/td[2]`)
                    let textContentSteamID = await steamID.getProperty('textContent')
                    let rawTextSteamID = await textContentSteamID.jsonValue();
        
                    let [invoked] = await page.$x(`//*[@id="banlist"]/table/tbody/tr[3]/td/div/table/tbody/tr[6]/td[2]`)
                    let textContentInvoked = await invoked.getProperty('textContent')
                    let rawTextInvoked = await textContentInvoked.jsonValue();
        
                    let [banLength] = await page.$x(`//*[@id="banlist"]/table/tbody/tr[3]/td/div/table/tbody/tr[7]/td[2]`);
                    let textContentBanLength = await banLength.getProperty('textContent');
                    let rawTextBanLength = await textContentBanLength.jsonValue();
        
                    let [unblocked] = await page.$x(`//*[@id="banlist"]/table/tbody/tr[3]/td/div/table/tbody/tr[9]/td[2]`);
                    let textContentUnblocked = await unblocked.getProperty('textContent');
                    let rawTextUnblocked = await textContentUnblocked.jsonValue().then(async text => {

                        //If the user has been unblocked: aka their gag/mute has been expired. This "function" will start instead.
                        if(text.trim() === `CONSOLE`) {
                            let [reasonOfBan] = await page.$x(`//*[@id="banlist"]/table/tbody/tr[3]/td/div/table/tbody/tr[11]/td[2]`)
                            let textContentReasonOfBan = await reasonOfBan.getProperty('textContent');
                            let rawTextReasonOfBan = await textContentReasonOfBan.jsonValue();
        
                            let [admin] = await page.$x(`//*[@id="banlist"]/table/tbody/tr[3]/td/div/table/tbody/tr[12]/td[2]`);
                            let textContentAdmin = await admin.getProperty('textContent');
                            let rawTextAdmin = await textContentAdmin.jsonValue();
                
                            let [total] = await page.$x(`//*[@id="banlist"]/table/tbody/tr[3]/td/div/table/tbody/tr[14]/td[2]`);
                            let textContentTotal = await total.getProperty('textContent');
                            let rawTextTotal = await textContentTotal.jsonValue();
        
                            let messageRespond: Array<string> = [
                                rawTextNameOfUser.trim(), //0
                                rawTextSteamID.trim(),//1
                                rawTextInvoked.trim(),//2
                                rawTextBanLength.trim(), //3
                                rawTextReasonOfBan.trim(),//4
                                rawTextAdmin.trim(),//5
                                rawTextTotal.trim(),//6
                                text.trim()//7
                            ];
        
                            const embed = new MessageEmbed()
                            .setTimestamp()
                            .setFooter(`Rquested by ${message.author.tag} | ${message.author.id}`)
                            .setColor(`#f15664`)
                            .setDescription(stripIndents`
                            **Most recent ban from \`${messageRespond[0]}\`**
                            **Unblocked**
                
                            **User:** \`${messageRespond[0]}\`
                            **SteamID:** \`${messageRespond[1]}\`
                            **Invoked:** \`${messageRespond[2]}\`
                            **Length:** \`${messageRespond[3]}\`
                            **Unblocked by:** \`${messageRespond[7]}\`
                            **Reason:** \`${messageRespond[4]}\`
                            **Admin:** \`${messageRespond[5]}\`
                            **Total bans:** \`${messageRespond[6]}\`
                            
                            [Sourceban link](${(await this.linksSourceban(args[0])).toString()})
                            [HlstatsX link](${(await this.linksHlstats(messageRespond[1])).toString()})`);
                            
                            await message.channel.send(embed);

                        } 
                        //But if the the comm block is still active this will activate.
                        else {
                            
                            let [reasonOfBan] = await page.$x(`//*[@id="banlist"]/table/tbody/tr[3]/td/div/table/tbody/tr[9]/td[2]`)
                            let textContentReasonOfBan = await reasonOfBan.getProperty('textContent');
                            let rawTextReasonOfBan = await textContentReasonOfBan.jsonValue();
        
                            let [admin] = await page.$x(`//*[@id="banlist"]/table/tbody/tr[3]/td/div/table/tbody/tr[10]/td[2]`);
                            let textContentAdmin = await admin.getProperty('textContent');
                            let rawTextAdmin = await textContentAdmin.jsonValue();
        
                            let [total] = await page.$x(`//*[@id="banlist"]/table/tbody/tr[3]/td/div/table/tbody/tr[12]/td[2]`);
                            let textContentTotal = await total.getProperty('textContent');
                            let rawTextTotal = await textContentTotal.jsonValue();
        
                            let messageRespond: Array<string> = [
                                rawTextNameOfUser.trim(), //0
                                rawTextSteamID.trim(),//1
                                rawTextInvoked.trim(),//2
                                rawTextBanLength.trim(), //3
                                rawTextReasonOfBan.trim(),//4
                                rawTextAdmin.trim(),//5
                                rawTextTotal.trim()//6
                            ];
        
                            const embed = new MessageEmbed()
                            .setTimestamp()
                            .setFooter(`Rquested by ${message.author.tag} | ${message.author.id}`)
                            .setColor(`#f15664`)
                            .setDescription(stripIndents`
                            **Most recent ban from \`${messageRespond[0]}\`**
        
                            **User:** \`${messageRespond[0]}\`
                            **SteamID:** \`${messageRespond[1]}\`
                            **Invoked:** \`${messageRespond[2]}\`
                            **Length:** \`${messageRespond[3]}\`
                            **Reason:** \`${messageRespond[4]}\`
                            **Admin:** \`${messageRespond[5]}\`
                            **Total bans:** \`${messageRespond[6]}\`
                            
                            [Sourceban link](${(await this.linksSourceban(args[0])).toString()})
                            [HlstatsX link](${(await this.linksHlstats(messageRespond[1])).toString()})`);
                            
                            await message.channel.send(embed);
                        }
                    });    
                }
            });
        
 
    } catch(err) {
        console.log(err);
    }
    browser.close();
}

private linksHlstats(args: any): Promise<string> {
        if(args.includes(`STEAM_`)) {
            return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=search&q=${args}&st=uniqueid&game=`); })
        } else {
            return new Promise((resolve) => {resolve(`https://hlstats.panda-community.com/hlstats.php?mode=search&q=${args}&st=player&game=`); })
        };
};

private linksSourceban(args: any): Promise<string> {
        if(args.includes(`STEAM_`)) {
            return new Promise((resolve) => { resolve(`https://bans.panda-community.com/index.php?p=banlist&searchText=${args}&Submit=steamid`); });
        } else {
            return new Promise((resolve) => {resolve(`https://bans.panda-community.com/index.php?p=banlist&searchText=${args}&Submit=name`); });
        };
    };
};

