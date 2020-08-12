import SteamTotp from "steam-totp";
import config from "../../config.json";
/*

This code logs into steam, explains it self i hope.
Works with puppeteer package, won't work without it.

*/

export default class SteamLogin {
  public async login(page): Promise<boolean> {
    try {
      //Types the users account information.
      await page.focus("#steamAccountName");
      await page.keyboard.type(config.Steam.name);
      await page.focus("#steamPassword");
      await page.keyboard.type(config.Steam.password);

      //await page.click('#remember_login');

      //Clicks on login.
      await page.click("#SteamLogin");

      //Waits for 2 sec
      await page.waitFor(10000);

      //calls for the code
      let code = this.getKey();

      //Enters the secret code, shhhhh
      await page.waitForSelector("#twofactorcode_entry");
      await page.focus("#twofactorcode_entry");
      await page.keyboard.type(code);

      //Logs into steam.
      await page.click(
        "#login_twofactorauth_buttonset_entercode > div.auth_button.leftbtn"
      );
      await page.waitFor(5000);

      return true;
    } catch (err) {
      return false;
    }
  }

  public async oldLogin(page): Promise<boolean> {
    try {
      //Types the users account information.
      await page.focus("#steamAccountName");
      await page.keyboard.type(config.Steam.name);
      await page.focus("#steamPassword");
      await page.keyboard.type(config.Steam.password);

      //await page.click('#remember_login');

      //Clicks on login.
      await page.click("#imageLogin");

      //Waits for 2 sec
      await page.waitFor(10000);

      //calls for the code
      let code = this.getKey();

      //Enters the secret code, shhhhh
      await page.waitForSelector("#twofactorcode_entry");
      await page.focus("#twofactorcode_entry");
      await page.keyboard.type(code);

      //Logs into steam.
      await page.click(
        "#login_twofactorauth_buttonset_entercode > div.auth_button.leftbtn"
      );
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
