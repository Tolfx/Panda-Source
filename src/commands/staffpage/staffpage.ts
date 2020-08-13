/*

This logs into the staff page, which i will use someday maybe.

*/

import config from '../../../config.json';
const puppeteer = require('puppeteer');
import fs from 'fs';
import Steam from '../../steamHandler/steamHandler';
const steam = new Steam();
import paths from '../../types/paths';

const options = {
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--no-first-run',
    '--no-zygote',
    '--disable-gpu',
  ],
  headless: true,
};

export class staffPage {
  public run(client, message, args) {
    this.staffPage(client, message, args);
  }

  private async staffPage(client, message, args) {
    if (message.author.id !== config.General.discord_Owner_ID)
      return message.channel.send('Not owner.');

    const url =
      'https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.mode=checkid_setup&openid.return_to=https://staff.panda-community.com/login&openid.realm=https://staff.panda-community.com&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select';
    try {
      const browser = await puppeteer.launch(options);
      const page = await browser.newPage();

      let path = paths.C_Staffpage;
      // If the cookies file exists, read the cookies.
      const previousSession = fs.existsSync(path);
      if (previousSession) {
        const content = fs.readFileSync(path);
        const cookiesArr = JSON.parse(content);
        if (cookiesArr.length !== 0) {
          if (!cookiesArr[0]) {
            console.log('No cookies');
            await page.goto(url);
            await steam.oldLogin(page);

            this.saveCookies(page, path);
          } else {
            if (cookiesArr[0].expires <= Date.now() / 1000) {
              console.log('Cookies expired');
              await page.goto(url);
              await steam.oldLogin(page);

              // Write Cookies
              this.saveCookies(page, path);
            } else {
              console.log('Adding the cookies');
              await page.setCookie(...cookiesArr);
            }
          }

          console.log('Session has been loaded in the browser');
          await page.goto('https://staff.panda-community.com/');
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  private async saveCookies(page, path) {
    const cookiesObject = await page.cookies();
    fs.writeFileSync(path, JSON.stringify(cookiesObject));
    console.log('Session has been saved to ' + path);
  }
} //End of class

//await page.screenshot({path: "screenshot.png", fullPage: true})
