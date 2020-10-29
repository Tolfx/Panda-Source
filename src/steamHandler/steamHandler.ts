import SteamTotp from 'steam-totp';
import config from '../../config.json';
const SteamCommunity = require('steamcommunity');
let community = new SteamCommunity();
/*

This code logs into steam, explains it self i hope.
Works with puppeteer package, won't work without it.

*/

interface settingsProfile {
  name?
  realName?
  summar?
  country?
  state?
  city?
  customURL?
}

interface settingsPrivacy {
  profile?: 1 | 2 | 3
  comments?: 1 | 2 | 3
  inventory?: 1 | 2 | 3
  inventoryGifts?: Boolean
  gameDetails?: 1 | 2 | 3
  playtime?: Boolean
  friendsList?: 1 | 2 | 3
}

export function newLogin() {
  return new Promise((resolve, reject) => {
    const loginDetailsSteam = {
      "accountName": config.Steam.name,
      "password": config.Steam.password,
      "steamguard": getKey(),  
      "twoFactorCode": getKey(),
      "disableMobile": true
    }
    
    community.login(loginDetailsSteam, (err, sessionID, cookies, steamguard, oauth) => {
      if (err) 
        reject(err)
      
      community.setCookies(cookies)

      resolve({
        sessionID,
        cookies,
        steamguard,
        oauth
      });
    });
  });

};

export function editProfileUser(settings: settingsProfile) {
  return new Promise((resolve, reject) => {    
    community.editProfile(settings, (err) => {
      if (err)
        reject(err)

      resolve(true)
    });
  });
}

export function changeAvatar(image: Buffer | String | URL): Promise<URL> {
  return new Promise((resolve, reject) => {
    community.uploadAvatar(image, (err, url) => {
      if (err)
        reject(err)
      
      resolve(url)
    });
  });
}

export function privacySettings(settings: settingsPrivacy) {
  return new Promise((resolve, reject) => {
    community.profileSettings(settings, (err) => {
      if (err)
        reject(err)
      
      resolve(true)
    })
  })
}

function getKey() {
  let code = SteamTotp.getAuthCode(config.Steam.sharedSecret);
  return code;
}
/**
 * @deprecated Old class
 */
export class SteamLogin {

  public async login(page): Promise<boolean> {
    try {
      //Types the users account information.
      await page.focus('#steamAccountName');
      await page.keyboard.type(config.Steam.name);
      await page.focus('#steamPassword');
      await page.keyboard.type(config.Steam.password);

      //await page.click('#remember_login');

      //Clicks on login.
      await page.click('#SteamLogin');

      //Waits for 2 sec
      await page.waitFor(10000);

      //calls for the code
      let code = this.getKey();

      //Enters the secret code, shhhhh
      await page.waitForSelector('#twofactorcode_entry');
      await page.focus('#twofactorcode_entry');
      await page.keyboard.type(code);

      //Logs into steam.
      await page.click('#login_twofactorauth_buttonset_entercode > div.auth_button.leftbtn');
      await page.waitFor(5000);

      return true;
    } catch (err) {
      return false;
    }
  }

  public async oldLogin(page): Promise<boolean> {
    try {
      //Types the users account information.
      await page.focus('#steamAccountName');
      await page.keyboard.type(config.Steam.name);
      await page.focus('#steamPassword');
      await page.keyboard.type(config.Steam.password);

      //await page.click('#remember_login');

      //Clicks on login.
      await page.click('#imageLogin');

      //Waits for 2 sec
      await page.waitFor(10000);

      //calls for the code
      let code = this.getKey();

      //Enters the secret code, shhhhh
      await page.waitForSelector('#twofactorcode_entry');
      await page.focus('#twofactorcode_entry');
      await page.keyboard.type(code);

      //Logs into steam.
      await page.click('#login_twofactorauth_buttonset_entercode > div.auth_button.leftbtn');
      await page.waitFor(5000);

      return true;
    } catch (err) {
      return false;
    }
  }

  public getKey() {
    let code = SteamTotp.getAuthCode(config.Steam.sharedSecret);
    return code;
  }
} //End of class
