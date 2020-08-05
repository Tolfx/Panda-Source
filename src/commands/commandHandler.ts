/*

This file takes all of the commands into one place and executes it if the message includes the name of the command
Nothing really special tbh..

*/
import config from "../../config.json";
import help from "../commands/info/help";
import listcomms from "../commands/sourcebans/listcomms";
import listbans from "../commands/sourcebans/listbans";
import {topTen} from "../commands/hlstatsx/top10";
import {SearchHlstatsx} from "../commands/hlstatsx/hlstats-Search";
import {staffPage} from "./staffpage/staffpage";
import {whoIsPlaying} from "../commands/hlstatsx/whoIsPlaying";
import {UnderCover} from "../commands/steam/undercover";
import {NormalProfile} from "../commands/steam/normalProfile";
import {DetectInsults} from "./hlstatsx/insults";
import {sourceGag} from "../commands/sourcebans/gag"
import {sourceMute} from "../commands/sourcebans/mute"
import {sourceSilence} from "../commands/sourcebans/silence"
import {sourceBan} from "../commands/sourcebans/ban"
import {Purge} from "../commands/moderation/purge";
import {Hug} from "../commands/fun/hug";
import {Kiss} from "../commands/fun/kiss";
import {eightBall} from "../commands/fun/8ball";
import {Format} from "../commands/info/format";
import {TrainBrain} from "../commands/brain/train";

//Modules / classes
let train = new TrainBrain();
let Listcomms = new listcomms();
let Listbans = new listbans();
let topten = new topTen();
let search_h = new SearchHlstatsx();
let staffpage = new staffPage();
let whoisplaying = new whoIsPlaying();
let undercover = new UnderCover();
let normalprofile = new NormalProfile();
let check = new DetectInsults();
let gag = new sourceGag();
let mute = new sourceMute();
let silence = new sourceSilence();
let ban = new sourceBan();
let purge = new Purge;
let hug = new Hug;
let kiss = new Kiss;
let ball = new eightBall;
let format = new Format;

export class commandHandler {

    public run(client, message, args) {

        let arg: Array<string> = args;
        
        if (message.content.includes(`${config.General.prefix}help`)) {
            help.run(client, message, args);
        } else if (message.content.includes(`${config.General.prefix}listcomms`)) {
            Listcomms.run(client, message, arg); 
        } else if (message.content.includes(`${config.General.prefix}listbans`)) {
            Listbans.run(client, message, arg); 
        } else if (message.content.includes(`${config.General.prefix}topten`)) {
            topten.run(client, message, args);
        } else if (message.content.includes(`${config.General.prefix}h-search`)) {
            search_h.run(client, message, args);
        } else if (message.content.includes(`${config.General.prefix}staffpage`)) {
            staffpage.run(client, message, args);
        } else if (message.content.includes(`${config.General.prefix}whoisplaying`)) {
            whoisplaying.run(client, message, args);
        } else if (message.content.includes(`${config.General.prefix}undercover`)) {
            undercover.run(client, message, args);
        } else if (message.content.includes(`${config.General.prefix}normal`)) {
            normalprofile.run(client, message, args);
        } else if (message.content.includes(`${config.General.prefix}check`)) {
            check.run(client, message, args);
        } else if (message.content.includes(`${config.General.prefix}gag`)) {
            gag.run(client, message, args);
        } else if (message.content.includes(`${config.General.prefix}mute`)) {
            mute.run(client, message, args);
        } else if (message.content.includes(`${config.General.prefix}silence`)) {
            silence.run(client, message, args);
        } else if (message.content.includes(`${config.General.prefix}ban`)) {
            ban.run(client, message, args);
        } else if (message.content.includes(`${config.General.prefix}purge`)) {
            purge.run(client, message, args);
        } else if (message.content.includes(`${config.General.prefix}hug`)) {
            hug.run(client, message, args);
        } else if (message.content.includes(`${config.General.prefix}kiss`)) {
            kiss.run(client, message, args);
        } else if (message.content.includes(`${config.General.prefix}format`)) {
            format.run(client, message, args);
        } else if (message.content.includes(`${config.General.prefix}8ball`)) {
            ball.run(client, message, args);
        } else if (message.content.includes(`${config.General.prefix}train`)) {
            train.run(client, message, args);
        } else {
            return;
        };
    };
};