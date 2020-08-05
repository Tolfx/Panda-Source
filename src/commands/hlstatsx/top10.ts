/*
Link: https://hlstats.panda-community.com/hlstats.php?mode=players&game=

First try to get what kind of server they are searching efter.
args[0] will be what region, and args[1] will be what kind of gamemode.

Then get the top ten players from that server and print it out.

*/
import { MessageEmbed, Message } from 'discord.js';
import { stripIndents } from "common-tags";
import config from "../../../config.json";
import Servers  from "../../json/EU_Server.json";
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

export class topTen {

public run(client, message, args) {
    this.getTopTen(client, message, args)
}

private async getTopTen(client, message, args) {


        if(!args[0]) return message.channel.send('Pick what region you want to search on.', this.pickServerList(client, message, args));
        if(!args[1]) return message.channel.send('You forgot to pick what server'), this.pickServerList(client, message, args);

        const browser = await puppeteer.launch(options);
        const page = await browser.newPage();

        try {
        //Stuff starts here lol :)
        this.whichServer(args[0].toUpperCase(), args[1].toUpperCase()).then(async serverURL => {
            if(serverURL === "ERROR") return message.channel.send(`Error: ${serverURL}`);

            await page.goto(serverURL);
            this.topTenNames(page).then(TopNames => {
                this.topTenPoints(page).then(TopPoints => {
                    this.topTenConnection(page).then(TopConnection => {
                        this.topTenLinks(page).then(TopLinks => {
                            this.TopTenPage(message, TopNames, TopPoints, TopConnection, TopLinks)
                        });
                    });
                });
            });
        });

        } catch(err) {
            console.log(err);
        }//End of try

} //End of getTopTen()

//Gives the top names from the link.
private async topTenNames(page: any): Promise<string[]> {

    let [nameOfTopOne] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[2]/td[2]`); 
    let textContentNameOfTopOne = await nameOfTopOne.getProperty('innerText');
    let rawTextNameOfTopOne = await textContentNameOfTopOne.jsonValue();

    let [nameOfTopTwo] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[3]/td[2]/a/text()`); 
    let textContentNameOfTopTwo = await nameOfTopTwo.getProperty('textContent');
    let rawTextNameOfTopTwo = await textContentNameOfTopTwo.jsonValue();

    let [nameOfTopThree] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[4]/td[2]/a/text()`); 
    let textContentNameOfTopThree = await nameOfTopThree.getProperty('textContent');
    let rawTextNameOfTopThree = await textContentNameOfTopThree.jsonValue();

    let [nameOfTopFour] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[5]/td[2]/a/text()`); 
    let textContentNameOfTopFour = await nameOfTopFour.getProperty('textContent');
    let rawTextNameOfTopFour = await textContentNameOfTopFour.jsonValue();

    let [nameOfTopFive] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[6]/td[2]/a/text()`); 
    let textContentNameOfTopFive = await nameOfTopFive.getProperty('textContent');
    let rawTextNameOfTopFive = await textContentNameOfTopFive.jsonValue();

    let [nameOfTopSix] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[7]/td[2]/a/text()`); 
    let textContentNameOfTopSix = await nameOfTopSix.getProperty('textContent');
    let rawTextNameOfTopSix = await textContentNameOfTopSix.jsonValue();

    let [nameOfTopSeven] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[8]/td[2]/a/text()`); 
    let textContentNameOfTopSeven = await nameOfTopSeven.getProperty('textContent');
    let rawTextNameOfTopSeven = await textContentNameOfTopSeven.jsonValue();

    let [nameOfTopEight] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[9]/td[2]/a/text()`); 
    let textContentNameOfTopEight = await nameOfTopEight.getProperty('textContent');
    let rawTextNameOfTopEight = await textContentNameOfTopEight.jsonValue();

    let [nameOfTopNine] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[10]/td[2]/a/text()`); 
    let textContentNameOfTopNine = await nameOfTopNine.getProperty('textContent');
    let rawTextNameOfTopNine = await textContentNameOfTopNine.jsonValue();

    let [nameOfTopTen] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[11]/td[2]/a/text()`); 
    let textContentNameOfTopTen = await nameOfTopTen.getProperty('textContent');
    let rawTextNameOfTopTen = await textContentNameOfTopTen.jsonValue();


    return new Promise((resolve) => { resolve([
        rawTextNameOfTopOne.trim(), //0
        rawTextNameOfTopTwo.trim(), //1
        rawTextNameOfTopThree.trim(), //2
        rawTextNameOfTopFour.trim(), //3
        rawTextNameOfTopFive.trim(), //4
        rawTextNameOfTopSix.trim(), //5
        rawTextNameOfTopSeven.trim(), //6
        rawTextNameOfTopEight.trim(), //7
        rawTextNameOfTopNine.trim(), //8
        rawTextNameOfTopTen.trim() //9
    ]); })
}

//Gives the top links from hlsatsx
private async topTenLinks(page: any): Promise<string[]> {

    let [nameOfTopOne] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[2]/td[2]/a`); 
    let textContentNameOfTopOne = await nameOfTopOne.getProperty('href');
    let rawTextNameOfTopOne = await textContentNameOfTopOne.jsonValue();

    let [nameOfTopTwo] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[3]/td[2]/a`); 
    let textContentNameOfTopTwo = await nameOfTopTwo.getProperty('href');
    let rawTextNameOfTopTwo = await textContentNameOfTopTwo.jsonValue();

    let [nameOfTopThree] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[4]/td[2]/a`); 
    let textContentNameOfTopThree = await nameOfTopThree.getProperty('href');
    let rawTextNameOfTopThree = await textContentNameOfTopThree.jsonValue();

    let [nameOfTopFour] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[5]/td[2]/a`); 
    let textContentNameOfTopFour = await nameOfTopFour.getProperty('href');
    let rawTextNameOfTopFour = await textContentNameOfTopFour.jsonValue();

    let [nameOfTopFive] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[6]/td[2]/a`); 
    let textContentNameOfTopFive = await nameOfTopFive.getProperty('href');
    let rawTextNameOfTopFive = await textContentNameOfTopFive.jsonValue();

    let [nameOfTopSix] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[7]/td[2]/a`); 
    let textContentNameOfTopSix = await nameOfTopSix.getProperty('href');
    let rawTextNameOfTopSix = await textContentNameOfTopSix.jsonValue();

    let [nameOfTopSeven] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[8]/td[2]/a`); 
    let textContentNameOfTopSeven = await nameOfTopSeven.getProperty('href');
    let rawTextNameOfTopSeven = await textContentNameOfTopSeven.jsonValue();

    let [nameOfTopEight] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[9]/td[2]/a`); 
    let textContentNameOfTopEight = await nameOfTopEight.getProperty('href');
    let rawTextNameOfTopEight = await textContentNameOfTopEight.jsonValue();

    let [nameOfTopNine] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[10]/td[2]/a`); 
    let textContentNameOfTopNine = await nameOfTopNine.getProperty('href');
    let rawTextNameOfTopNine = await textContentNameOfTopNine.jsonValue();

    let [nameOfTopTen] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[11]/td[2]/a`); 
    let textContentNameOfTopTen = await nameOfTopTen.getProperty('href');
    let rawTextNameOfTopTen = await textContentNameOfTopTen.jsonValue();


    return new Promise((resolve) => { resolve([
        rawTextNameOfTopOne.trim(), //0
        rawTextNameOfTopTwo.trim(), //1
        rawTextNameOfTopThree.trim(), //2
        rawTextNameOfTopFour.trim(), //3
        rawTextNameOfTopFive.trim(), //4
        rawTextNameOfTopSix.trim(), //5
        rawTextNameOfTopSeven.trim(), //6
        rawTextNameOfTopEight.trim(), //7
        rawTextNameOfTopNine.trim(), //8
        rawTextNameOfTopTen.trim() //9
    ]); })
}

//Gets the connection of the top players aka 10
private async topTenConnection(page: any): Promise<string[]> {

    let [nameOfTopOne] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[2]/td[6]`); 
    let textContentNameOfTopOne = await nameOfTopOne.getProperty('textContent');
    let rawTextNameOfTopOne = await textContentNameOfTopOne.jsonValue();

    let [nameOfTopTwo] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[3]/td[6]`); 
    let textContentNameOfTopTwo = await nameOfTopTwo.getProperty('textContent');
    let rawTextNameOfTopTwo = await textContentNameOfTopTwo.jsonValue();

    let [nameOfTopThree] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[4]/td[6]`); 
    let textContentNameOfTopThree = await nameOfTopThree.getProperty('textContent');
    let rawTextNameOfTopThree = await textContentNameOfTopThree.jsonValue();

    let [nameOfTopFour] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[5]/td[6]`); 
    let textContentNameOfTopFour = await nameOfTopFour.getProperty('textContent');
    let rawTextNameOfTopFour = await textContentNameOfTopFour.jsonValue();

    let [nameOfTopFive] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[6]/td[6]`); 
    let textContentNameOfTopFive = await nameOfTopFive.getProperty('textContent');
    let rawTextNameOfTopFive = await textContentNameOfTopFive.jsonValue();

    let [nameOfTopSix] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[7]/td[6]`); 
    let textContentNameOfTopSix = await nameOfTopSix.getProperty('textContent');
    let rawTextNameOfTopSix = await textContentNameOfTopSix.jsonValue();

    let [nameOfTopSeven] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[8]/td[6]`); 
    let textContentNameOfTopSeven = await nameOfTopSeven.getProperty('textContent');
    let rawTextNameOfTopSeven = await textContentNameOfTopSeven.jsonValue();

    let [nameOfTopEight] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[9]/td[6]`); 
    let textContentNameOfTopEight = await nameOfTopEight.getProperty('textContent');
    let rawTextNameOfTopEight = await textContentNameOfTopEight.jsonValue();

    let [nameOfTopNine] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[10]/td[6]`); 
    let textContentNameOfTopNine = await nameOfTopNine.getProperty('textContent');
    let rawTextNameOfTopNine = await textContentNameOfTopNine.jsonValue();

    let [nameOfTopTen] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[11]/td[6]`); 
    let textContentNameOfTopTen = await nameOfTopTen.getProperty('textContent');
    let rawTextNameOfTopTen = await textContentNameOfTopTen.jsonValue();

    return new Promise((resolve) => { resolve([
        rawTextNameOfTopOne.trim(), //0
        rawTextNameOfTopTwo.trim(), //1
        rawTextNameOfTopThree.trim(), //2
        rawTextNameOfTopFour.trim(), //3
        rawTextNameOfTopFive.trim(), //4
        rawTextNameOfTopSix.trim(), //5
        rawTextNameOfTopSeven.trim(), //6
        rawTextNameOfTopEight.trim(), //7
        rawTextNameOfTopNine.trim(), //8
        rawTextNameOfTopTen.trim() //9
    ]); })
}

//Gives the points from the top 10 players
private async topTenPoints(page: any): Promise<string[]> {

    let [nameOfTopOne] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[2]/td[4]`); 
    let textContentNameOfTopOne = await nameOfTopOne.getProperty('textContent');
    let rawTextNameOfTopOne = await textContentNameOfTopOne.jsonValue();

    let [nameOfTopTwo] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[3]/td[4]`); 
    let textContentNameOfTopTwo = await nameOfTopTwo.getProperty('textContent');
    let rawTextNameOfTopTwo = await textContentNameOfTopTwo.jsonValue();

    let [nameOfTopThree] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[4]/td[4]`); 
    let textContentNameOfTopThree = await nameOfTopThree.getProperty('textContent');
    let rawTextNameOfTopThree = await textContentNameOfTopThree.jsonValue();

    let [nameOfTopFour] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[5]/td[4]`); 
    let textContentNameOfTopFour = await nameOfTopFour.getProperty('textContent');
    let rawTextNameOfTopFour = await textContentNameOfTopFour.jsonValue();

    let [nameOfTopFive] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[6]/td[4]`); 
    let textContentNameOfTopFive = await nameOfTopFive.getProperty('textContent');
    let rawTextNameOfTopFive = await textContentNameOfTopFive.jsonValue();

    let [nameOfTopSix] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[7]/td[4]`); 
    let textContentNameOfTopSix = await nameOfTopSix.getProperty('textContent');
    let rawTextNameOfTopSix = await textContentNameOfTopSix.jsonValue();

    let [nameOfTopSeven] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[8]/td[4]`); 
    let textContentNameOfTopSeven = await nameOfTopSeven.getProperty('textContent');
    let rawTextNameOfTopSeven = await textContentNameOfTopSeven.jsonValue();

    let [nameOfTopEight] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[9]/td[4]`); 
    let textContentNameOfTopEight = await nameOfTopEight.getProperty('textContent');
    let rawTextNameOfTopEight = await textContentNameOfTopEight.jsonValue();

    let [nameOfTopNine] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[10]/td[4]`); 
    let textContentNameOfTopNine = await nameOfTopNine.getProperty('textContent');
    let rawTextNameOfTopNine = await textContentNameOfTopNine.jsonValue();

    let [nameOfTopTen] = await page.$x(`/html/body/div[2]/div[1]/div[2]/table/tbody/tr[11]/td[4]`); 
    let textContentNameOfTopTen = await nameOfTopTen.getProperty('textContent');
    let rawTextNameOfTopTen = await textContentNameOfTopTen.jsonValue();

    return new Promise((resolve) => { resolve([
        rawTextNameOfTopOne.trim(), //0
        rawTextNameOfTopTwo.trim(), //1
        rawTextNameOfTopThree.trim(), //2
        rawTextNameOfTopFour.trim(), //3
        rawTextNameOfTopFive.trim(), //4
        rawTextNameOfTopSix.trim(), //5
        rawTextNameOfTopSeven.trim(), //6
        rawTextNameOfTopEight.trim(), //7
        rawTextNameOfTopNine.trim(), //8
        rawTextNameOfTopTen.trim() //9
    ]); })
}

//This prints out images on what to search on for whichServer()
private async pickServerList(client, message, args) {
    //images[0] = EU, images[1] == NY, images[2] == SG, images[3] == US
    let pages = 1;
    let images = ["https://i.imgur.com/uOH3jrw.png", "https://i.imgur.com/KZiJQwp.png", "https://i.imgur.com/w0ipPXG.png"];
    let names = ["EU", "SG", "US"];
    
    try {
    let errorEmbed = new MessageEmbed()
    .setColor("#D7B940")
    .setDescription(stripIndents`Click on the arrows to see different servers. *expires in 60 sec*
    Format: \`${config.General.prefix}topten [EU | SG | US] [Server-Name]\``)
    .setFooter(`Page ${pages} of ${names.length} | ${names[pages-1]}`)
    .setImage(images[pages-1])

    message.channel.send(errorEmbed).then(msg => {
        msg.react('⬅').then( async r => {
            msg.react('➡')

            const backWardsFilter = (reaction, user) => reaction.emoji.name === "⬅" && user.id && message.author.id && reaction.remove(message.author.id);
            const forwardsFilter = (reaction, user) => reaction.emoji.name === "➡" && user.id && message.author.id && reaction.remove(message.author.id);

            const backwards = msg.createReactionCollector(backWardsFilter, {time: 60000 });
            const forwards = msg.createReactionCollector(forwardsFilter, {time: 60000 });


            backwards.on('collect', async (r, u) => {
                if (pages === 1) return;
                
                pages--;
                errorEmbed.setImage(images[pages-1]);
                errorEmbed.setFooter(`Page ${pages} of ${names.length} | ${names[pages-1]}`)
                msg.edit(errorEmbed);
            })

            forwards.on('collect', async (r, u) => {
                if (pages === images.length) return;
                pages++;
                errorEmbed.setImage(images[pages-1]);
                errorEmbed.setFooter(`Page ${pages} of ${names.length} | ${names[pages-1]}`)
                msg.edit(errorEmbed);
            })
        })
    })
} catch (err) {
     console.log(err);   
}
}

//Prints out the top players in a embed message.
private async TopTenPage(message, TopNames, TopPoints, TopConnection, TopLinks) {
    //images[0] = EU, images[1] == NY, images[2] == SG, images[3] == US
    let topName = [TopNames[0], TopNames[1], TopNames[2], TopNames[3], TopNames[4], TopNames[5], TopNames[6], TopNames[7], TopNames[8], TopNames[9]];
    let topPoints = [TopPoints[0], TopPoints[1], TopPoints[2], TopPoints[3], TopPoints[4], TopPoints[5], TopPoints[6], TopPoints[7], TopPoints[8], TopPoints[9]];
    let topConnection = [TopConnection[0], TopConnection[1], TopConnection[2], TopConnection[3], TopConnection[4], TopConnection[5], TopConnection[6], TopConnection[7], TopConnection[8], TopConnection[9]];
    let topLinks = [TopLinks[0], TopLinks[1], TopLinks[2], TopLinks[3], TopLinks[4], TopLinks[5], TopLinks[6], TopLinks[7], TopLinks[8], TopLinks[9]];
    let pages = 1;

    try {
    let sendThis = new MessageEmbed()
    .setColor("#D7B940")
    .setDescription(stripIndents`
    **Name:** \`${topName[pages-1]}\`
    **Points:** \`${topPoints[pages-1]}\`
    **Connection time:** \`${topConnection[pages-1]}\`
    
    [HLstatsX Link](${topLinks[pages-1]})`)
    .setFooter(`Top ${pages} | ${topName[pages-1]}`)

    
    message.channel.send(sendThis).then(msg => {
        msg.react('⬅').then( async r => {
            msg.react('➡')

            const backWardsFilter = (reaction, user) => reaction.emoji.name === "⬅" && user.id === message.author.id;
            const forwardsFilter = (reaction, user) => reaction.emoji.name === "➡" && user.id === message.author.id;

            const backwards = msg.createReactionCollector(backWardsFilter, {time: 60000 });
            const forwards = msg.createReactionCollector(forwardsFilter, {time: 60000 });


            backwards.on('collect', async r => {
                if (pages === 1) return;
                pages--;
                sendThis.setDescription(stripIndents`
                **Name:** \`${topName[pages-1]}\`
                **Points:** \`${topPoints[pages-1]}\`
                **Connection time:** \`${topConnection[pages-1]}\`
                
                [HLstatsX Link](${topLinks[pages-1]})`)
                sendThis.setFooter(`Top ${pages} | ${topName[pages-1]}`)
                msg.edit(sendThis);
            })

            forwards.on('collect', async r => {
                if (pages === topName.length) return;
                pages++;
                sendThis.setDescription(stripIndents`
                **Name:** \`${topName[pages-1]}\`
                **Points:** \`${topPoints[pages-1]}\`
                **Connection time:** \`${topConnection[pages-1]}\`
                
                [HLstatsX Link](${topLinks[pages-1]})`)
                sendThis.setFooter(`Top ${pages} | ${topName[pages-1]}`)
                msg.edit(sendThis);
            });
        });
    });
} catch (err) {
    console.log(err);
}
}

//This function picks what link we will give use for what server.
private whichServer(argsOne: string[], argsTwo: string[]): Promise<string> {

    const argsForServers = 3;
       
    const EUServer = Servers.EUServers;
    const SGServer = Servers.SGServer;
    const USServer = Servers.USServer;

        if(argsOne.includes('EU')) {
            for (var xServer = 0; xServer < argsForServers; ++xServer) {
                if (argsTwo.includes(EUServer.Dodgeball_1[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf52`); })
                } else if (argsTwo.includes(EUServer.Duel[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf51`); })
                } else if (argsTwo.includes(EUServer.War3Source[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf49`); })
                } else if (argsTwo.includes(EUServer.Jump[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf50`); })
                } else if (argsTwo.includes(EUServer.Saxton_Hale[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf53`); })
                } else if (argsTwo.includes(EUServer.Hightower_1[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf47`); })
                } else if (argsTwo.includes(EUServer.MGE_1[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf42`); })
                } else if (argsTwo.includes(EUServer.Class_Warfare[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf29`); })
                } else if (argsTwo.includes(EUServer.Deahtrun[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf54`); })
                } else if (argsTwo.includes(EUServer.Hightower_2[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf48`); })
                } else if (argsTwo.includes(EUServer.Surf[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf33`); })
                } else if (argsTwo.includes(EUServer.Slender_Fortress[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf41`); })
                } else if (argsTwo.includes(EUServer.Freak_Fortress_2[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf55`); })
                } else if (argsTwo.includes(EUServer.Turbine[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf61`); })
                } else if (argsTwo.includes(EUServer.TwoFort[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf56`); })
                } else if (argsTwo.includes(EUServer.Jailbreak[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf43`); })
                } else if (argsTwo.includes(EUServer.Mario_Kart[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf46`); })
                } else if (argsTwo.includes(EUServer.Dodgeball_2[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf57`); })
                } else if (argsTwo.includes(EUServer.The_Hidden[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf38`); })
                } else if (argsTwo.includes(EUServer.Prophunt[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf36`); })
                } else if (argsTwo.includes(EUServer.Deathrun_2[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf37`); })
                } else if (argsTwo.includes(EUServer.MGE_2[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf39`); })
                } else if (argsTwo.includes(EUServer.Randomizer[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf30`); })
                } else if (argsTwo.includes(EUServer.Trade[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf58`); })
                } else if (argsTwo.includes(EUServer.Dustbowl[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf31`); })
                } else if (argsTwo.includes(EUServer.Orange_x3[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf35`); })
                } else if (argsTwo.includes(EUServer.Smash_Bros[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf32`); })
                } else if (argsTwo.includes(EUServer.Dodgeball_3[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf1`); })
                } else if (argsTwo.includes(EUServer.Hightower_3[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf2`); })
                } else if (argsTwo.includes(EUServer.Zombie_Fortress[xServer])) {
                    return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf62`); })
                } 
            }
        } else if (argsOne.includes('SG')) {
            if (argsTwo.includes(SGServer.TwoFort)) {
                return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf22`); })
            } else if (argsTwo.includes(SGServer.Deathrun)) {
                return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf20`); })
            } else if  (argsTwo.includes(SGServer.Dodgeball)) {
                return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf14`); })
            } else if (argsTwo.includes(SGServer.MGE)) {
                return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf23`); })
            } else if (argsTwo.includes(SGServer.Trade)) {
                return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf60`); })
            }
        } else if (argsOne.includes('US')) {
            if (argsTwo.includes(USServer.Deathrun)) {
                return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf28`); })
            } else if (argsTwo.includes(USServer.Dodgeball)) {
                return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf45`); })
            } else if (argsTwo.includes(USServer.Dustbowl)) {
                return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf65`); })
            } else if (argsTwo.includes(USServer.Freak_Fortress_2)) {
                return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf44`); })
            } else if (argsTwo.includes(USServer.Hightower)) {
                return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf63`); })
            } else if (argsTwo.includes(USServer.Jailbreak)) {
                return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf40`); })
            } else if (argsTwo.includes(USServer.Jump)) {
                return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf12`); })
            } else if (argsTwo.includes(USServer.MGE)) {
                return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf11`); })
            } else if (argsTwo.includes(USServer.Prophunt)) {
                return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf24`); })
            } else if (argsTwo.includes(USServer.Slender_Fortress)) {
                return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf25`); })
            } else if (argsTwo.includes(USServer.Trade)) {
                return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf3`); })
            } else if (argsTwo.includes(USServer.Turbine)) {
                return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf7`); })
            } else if (argsTwo.includes(USServer.Saxton_Hale)) {
                return new Promise((resolve) => { resolve(`https://hlstats.panda-community.com/hlstats.php?mode=players&game=tf4`); })
            }
        } else {
            return new Promise((resolve) => { resolve(`No server`); })
        } 
}

};//End of class