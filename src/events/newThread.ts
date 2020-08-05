import { WebhookClient, MessageEmbed } from "discord.js";
import config from "../../config.json"
import fs from "fs"
const puppeteer = require('puppeteer');
const { stripIndents } = require("common-tags");
import { CustomLogger } from "../lib/customLogs"
import cheerio from "cheerio"
import request from "request"
import paths from '../types/paths';

const log = new CustomLogger;

export class newThread
{

    private async newThreads($) {
        let A_newThreads = [];

        for (var i = 0; i < 50; ++i) {
            let test = $('#top > div.p-body > div > div > div > div > div > div:nth-child(2) > div > div.block-body > div').nextAll()
            let title = $('#top > div.p-body > div > div > div > div > div > div:nth-child(2) > div > div.block-body > div > div.structItem.structItem--thread.is-prefix19.js-inlineModContainer.js-threadListItem-22418 > div.structItem-cell.structItem-cell--main > div.structItem-title > a').text().trim();
            let titleURL = $('#top > div.p-body > div > div > div > div > div > div:nth-child(2) > div > div.block-body > div > div.structItem.structItem--thread.is-prefix19.js-inlineModContainer.js-threadListItem-22418 > div.structItem-cell.structItem-cell--main > div.structItem-title > a').attr('href');
            let user = $('#top > div.p-body > div > div > div > div > div > div:nth-child(2) > div > div.block-body > div > div.structItem.structItem--thread.is-prefix19.js-inlineModContainer.js-threadListItem-22418 > div.structItem-cell.structItem-cell--main > div.structItem-minor > ul > li:nth-child(1) > a').text().trim();
            let userURL = $('#top > div.p-body > div > div > div > div > div > div:nth-child(2) > div > div.block-body > div > div.structItem.structItem--thread.is-prefix19.js-inlineModContainer.js-threadListItem-22418 > div.structItem-cell.structItem-cell--main > div.structItem-minor > ul > li:nth-child(1) > a').attr('href');
            let time = $('#top > div.p-body > div > div > div > div > div > div:nth-child(2) > div > div.block-body > div > div.structItem.structItem--thread.is-prefix19.js-inlineModContainer.js-threadListItem-22418 > div.structItem-cell.structItem-cell--main > div.structItem-minor > ul > li.structItem-startDate > a > time.u-dt').text().trim();
            
            $('#top > div.p-body > div > div > div > div > div > div:nth-child(2) > div > div.block-body > div').each((i, elem) => {
                A_newThreads[0] = $(elem).text().trim();
            });

            let lol = $('#top > div.p-body > div > div > div > div > div > div:nth-child(2) > div > div.block-body > div').filter((i, el) => {
                // this === el
                return $(el).attr('class');
              }).attr('div')

            console.log(lol);
            break;
        }
    }

    public async watchNew() {
        let url = "https://www.panda-community.com/whats-new/";
        let dataCheck = "newThread.json";


        request(url,
            (error, response, html) => {
                if(!error && response.statusCode == 200) {
                    let $ = cheerio.load(html);

                    this.newThreads($);
                }
            })

        
    };

};//end of class