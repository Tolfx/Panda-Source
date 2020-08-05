import { MessageEmbed } from 'discord.js';
import { stripIndents } from "common-tags";
import * as checker from "@tensorflow-models/toxicity"
const tfGPU = require('@tensorflow/tfjs-node-gpu')
const puppeteer = require('puppeteer');


export class DetectInsults {

public run(client, message, args) {
    this.detect(client, message, args);
};

private async detect(client, message, args) {


    const url = "https://hlstats.panda-community.com/hlstats.php?mode=chathistory&player=313047"

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    await this.getChat(page).then(async chat => {
        
        const threshold = 0.9;
        let finalResult: any = [];
        let oof;
        
        await checker.load(threshold, ["toxicity", "insult", "severe_toxicity"]).then(async model => {
            for (var i = 0; i < chat.length; i++) {
    
                let chatLog = chat[i];
                model.classify(chat[i]).then(async predictions => {
                    let result = predictions;
                    
    
                    /*let insult = 
                    {
                        label: result[0].label,
                        probabilities: result[0].results[0].probabilities[1],
                        boolean: result[0].results[0].match
                    };
    
                    let severe_toxicity = 
                    {
                        label: result[1].label,
                        probabilities: result[1].results[0].probabilities[1],
                        boolean: result[1].results[0].match
                    };*/
    
                    let toxicity = 
                    {
                        label: result[2].label,
                        probabilities: result[2].results[0].probabilities[1],
                        boolean: result[2].results[0].match
                    };
    
                    let stringResult = Array.from(new Set(toxicity.probabilities.toPrecision(2)));

                    let endResult = 
                    [
                        `chat: ${chatLog}`,
                        `toxicity: ${toxicity.probabilities.toPrecision(2)}`
                    ]

                    let oof = new Set(endResult);
                    console.log(stringResult);
                    return oof;

                    

                    //this.sendMessage(endResult, message);
                    
                });
            }
            //console.log(Array.from(oof));
            //await finalResult;
            //console.log(finalResult);
            
        });
    });
};

private async sendMessage(result, message): Promise<any> {

    const embed = new MessageEmbed()
    .addField('Result', result.toString());

    message.channel.send(embed);
}

private async getChat(page) {

    let first_column_text = await page.evaluate(() => Array.from(document.querySelectorAll('.bg2'), element => element.textContent));
    let unique = {};
    first_column_text.forEach(function(i) {
      if(!unique[i]) {
        unique[i] = "";
      }
    });
    console.log(Object.keys(unique));
    return Object.keys(unique);
};

};//End of class