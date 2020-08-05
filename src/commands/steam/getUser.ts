import { MessageEmbed } from 'discord.js';
import { stripIndents } from "common-tags";

const puppeteer = require('puppeteer');
import steamID from "steamid";

export class getUserSteam 
{

public run(client, message, args)
{
    this.getProfile(client, message, args);
};


private getProfile(client, message, args)
{
    let sid = new steamID('Tolfx');

    console.log(sid.getSteam2RenderedID()); 
    console.log(sid.getSteam3RenderedID()); 
    console.log(sid.getSteamID64()); 
};

};//End of class