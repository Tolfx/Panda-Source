import https from 'https';
import fs from 'fs';
import request from 'request';

export class steamPrivacy {
  public setPrivacy() {
    let path = 'cookies_SteamEdit.json';
    const content = fs.readFileSync(path);
    const cookiesArr = JSON.parse(content);

    let sessionID = cookiesArr[1].value;

    let data = JSON.stringify({
      PrivacyProfile: 1,
      PrivacyInventory: 3,
      PrivacyInventoryGifts: 1,
      PrivacyOwnedGames: 3,
      PrivacyPlaytime: 3,
      PrivacyFriendsList: 1,
    });

    const options = {
      uri: 'https://steamcommunity.com/id/my/ajaxsetprivacy',
      method: 'POST',
      json: true,
      formData: {
        sessionid: sessionID,
        Privacy: data,
        eCommentPermission: 1,
      },
    };

    request(options, function (err, res, body) {
      if (err) throw err;

      if (!body) return console.log('fail');

      return console.log(JSON.stringify(body));
    });
  }
}
