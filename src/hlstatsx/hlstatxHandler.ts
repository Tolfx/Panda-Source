import request from "request";
const { stripIndents } = require('common-tags');
import { CustomLogger } from '../lib/customLogs';
import * as jsdom from "jsdom";
import config from "../../config.json";

const log = new CustomLogger();
const hlstatxURL = config.General.HlstatXURL;

/*
const { JSDOM } = jsdom;
const DOM = new JSDOM($);
*/

/**
 * 
 * @param serverName The server name.
 */
export function getGameURL(serverName): Promise<String | Boolean> {
    //if(serverName.includes("Panda-Community.com #13 | Freak Fortress 2"))
    serverName = serverName.split(/\|/g).slice(0, 2).join("|")
    
    return new Promise((resolve, reject) => {
        request(hlstatxURL, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                const { JSDOM } = jsdom;
                const DOM = new JSDOM(body);

                let tbodyChildren = DOM.window.document.querySelector("body > div.content > div:nth-child(4) > table").children[0];
                
                for(let i = 1; i < tbodyChildren.children.length; i++) {
                    //[1].children[0].children[0].textContent
                    let names = tbodyChildren.children[i].children[0].children[0].textContent;
                    let serverURL = tbodyChildren.children[i].children[0].children[0].children[1].attributes[0].value;
                    console.log(`${names} === ${serverName}`)
                    if(names === serverName) {
                        serverURL = serverURL.replace("/hlstats.php?", "")
                        log.debug(serverURL);
                        resolve(`${serverURL}`);
                    };

                    if(i+1 === tbodyChildren.children.length) {
                        resolve(false)
                    };
                };
            } else {
                reject(`An error accured while doing an request to ${hlstatxURL} with status code: ${response.statusCode}`);
            };
        });
    });
};

export function getPlayerURL(gameQuery, steamID): Promise<String> {
    return new Promise((resolve, reject) => {
        let url = hlstatxURL + "mode=search&q=" + steamID + "&" + gameQuery;

        request(url, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                const { JSDOM } = jsdom;
                const DOM = new JSDOM(body);

                let table = DOM.window.document.querySelector("body > div:nth-child(10) > table > tbody").children;

                if(table.lenght != 2)
                    return reject(`No player found.`);
                
                if(table.lenght >= 2)
                    return reject(`Found more than 1 player..`);

                let playerURL = (table.children[1].children[1].children[0].attributes[0].value).replce("/hlstats.php?mode=playerinfo&", "");

                resolve(`${playerURL}`)
            } else {
                reject(`An error accured while doing an request to ${url} with status code: ${response.statusCode}`);
            };
        });
    });
};

export function isPlaying(gameQuery, playerQuery) {
    return new Promise((resolve, reject) => {
        resolve(false)
        /*
        request(hlstatxURL+"?"+gameQuery, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                const { JSDOM } = jsdom;
                const DOM = new JSDOM(body);
                log.debug(`${gameQuery} | ${playerQuery}`)
                let table = DOM.window.document.querySelector("body > div.content > div.block > div > table.livestats-table > tbody").children;

                for(let i = 1; i < table.length; i++) {
                    let urlOfPlayer = table[i].children[1].children[1].href

                    if(urlOfPlayer === `${hlstatxURL}?mode=playerinfo&${playerQuery}`) {
                        resolve(true);
                    }

                    if(i+1 === table.lenght) {
                        resolve(false)
                    }
                };
            } else {
                reject(`An error accured while doing an request to ${hlstatxURL+"?"+gameQuery} with status code: ${response.statusCode}`);
            };
        });
        */
    });
};