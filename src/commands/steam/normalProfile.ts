/*

This will make my profile normal again..

*/
import Steam from '../../steamHandler/steamHandler';
import config from '../../../config.json';
const puppeteer = require('puppeteer');
import fs from 'fs';
import { CustomLogger } from '../../lib/customLogs';
import paths from '../../types/paths';

const log = new CustomLogger();
const steam = new Steam();

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
export class NormalProfile {
  public run(client, message, args) {
    this.normalProfile(client, message, args);
  }

  private async normalProfile(client, message, args) {
    if (message.author.id !== config.General.discord_Owner_ID)
      return message.channel.send('Not owner.');

    message.channel.send('On it!').then(async (msg) => {
      const url = 'https://steamcommunity.com/login/home/?goto=%2Fid%2Fme%2Fedit';
      let DoneResult = 'false';

      const browser = await puppeteer.launch(options);
      const page = await browser.newPage();

      let path = paths.C_SteamEdit;

      try {
        // If the cookies file exists, read the cookies.
        const previousSession = fs.existsSync(path);

        //If there are any..
        if (previousSession) {
          const cookiesArr = JSON.parse(fs.readFileSync(path, "utf8"));

          //If the cookies have no length
          if (cookiesArr.length !== 0) {
            //If there are none cookies start this.
            if (!cookiesArr[0]) {
              msg.edit('No cookies');
              log.warn('No cookies');
              await page.goto(url);
              await steam.login(page).then(async (data) => {
                if (data) {
                  msg.edit('Changing profile..');
                  await this.NormalProfileChange(page);
                  await this.saveCookies(page, path);
                  await browser.close();
                  msg.edit('Back to normal.');
                  return (DoneResult = 'true');
                } else {
                  return msg.edit('Couldnt login');
                }
              });
            } else {
              //If the cookies has expire start this..
              if (cookiesArr[0].expires <= Date.now() / 1000) {
                log.warn('Cookies expired');
                await page.goto(url);
                await steam.login(page).then(async (data) => {
                  if (data) {
                    msg.edit('Changing profile..');
                    await this.NormalProfileChange(page);
                    await this.saveCookies(page, path);
                    await browser.close();
                    msg.edit('Back to normal.');
                    return (DoneResult = 'true');
                  } else {
                    return msg.edit('Couldnt login');
                  }
                });
                // Save Cookies
                this.saveCookies(page, path);
              } else {
                //If the cookies hasnt expired continue.
                log.normal('Adding the cookies');
                await page.setCookie(...cookiesArr);
              }
            }

            if (DoneResult === 'true') {
              log.normal('Everything got excuted as they should be.');
            } else if (DoneResult === 'false') {
              log.normal('Session has been loaded in the browser');
              msg.edit('Session has been loaded in the browser');
              await page.goto(url, { waitUntil: ['domcontentloaded'] });
              await page.waitFor(2000);
              if (page.url() !== 'https://steamcommunity.com/id/Tolfx/edit/info') {
                msg.edit('Login to steam..');
                steam.login(page).then(async (data) => {
                  if (data) {
                    msg.edit('Changing profile..');
                    await this.NormalProfileChange(page);
                    await this.saveCookies(page, path);
                    msg.edit('Back to normal.');
                    return browser.close();
                  } else {
                    msg.edit('Failed to login.');
                  }
                });
              } else {
                msg.edit('Changing profile..');
                await this.NormalProfileChange(page);
                await this.saveCookies(page, path);
                msg.edit('Back to normal.');
                return browser.close();
              }
            } else {
              return browser.close();
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  private async saveCookies(page, path) {
    const cookiesObject = await page.cookies();
    fs.writeFileSync(path, JSON.stringify(cookiesObject));
    log.normal('Session has been saved to ' + path);
  }

  private async NormalProfileChange(page) {
    // This changes name
    await page.waitFor(2000);
    await page.focus(
      '#application_root > div.profileeditshell_Shell_2kqKZ > div.profileeditshell_PageContent_23XE6 > form > div:nth-child(11) > div.profileedit_ProfileBoxContent_3s6BB > div:nth-child(1) > label > div.DialogInput_Wrapper._DialogLayout > input'
    );
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    await page.keyboard.type('Tolfx');

    // Waits for 2 sec
    await page.waitFor(2000);

    // Clicks on save
    await page.click(
      '#application_root > div.profileeditshell_Shell_2kqKZ > div.profileeditshell_PageContent_23XE6 > form > div.profileedit_SaveCancelButtons_2KJ8a > button.DialogButton._DialogLayout.Primary'
    );
    await page.waitFor(2000);

    // Clicks on avatar
    await page.click(
      '#application_root > div.profileeditshell_Shell_2kqKZ > div.profileeditshell_Navigation_33Kl1 > a:nth-child(2)'
    );
    await page.waitFor(2000);

    const [fileChooser] = await Promise.all([
      page.waitForFileChooser(),
      page.click(
        '#application_root > div.profileeditshell_Shell_2kqKZ > div.profileeditshell_PageContent_23XE6 > div > div.avatar_AvatarDialogBody_39Ovv > div.avatar_AvatarDialogTop_aCrGP > div.avatar_AvatarDialogUploadArea_22Ena > button'
      ),
    ]);

    await fileChooser.accept([config.profilePicturePath]);
    await page.waitFor(2000);

    // Clicks on Save
    await page.click(
      `#application_root > div.profileeditshell_Shell_2kqKZ > div.profileeditshell_PageContent_23XE6 > div > div.profileedit_SaveCancelButtons_2KJ8a > button.DialogButton._DialogLayout.Primary`
    );
    await page.waitFor(2000);
  }
} //End of class
