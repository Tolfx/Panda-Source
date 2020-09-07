import request from 'request';
import config from '../../config.json';

export default function sendMessage(serverID, Message) {
  let data = {
    content: Message,
    tts: false,
  };

  request(
    {
      url: `https://discord.com/api/v8/channels/${serverID}/messages`,
      method: 'POST',
      headers: {
        client_secret: config.General.tokenDiscord,
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    },
    (err, response, body) => {
      if (err) throw err;
      console.log(body);
    }
  );
}
