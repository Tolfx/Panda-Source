import request from "request";
import config from "../../config.json";

export default function sendMessage(serverID, Message) {
  let data = {
    "content": Message,
    "nonce": "751905390169223872", // <-- Needs some more research.
    "tts": false,
  };

  request(
    {
      url: `https://discord.com/api/v8/channels/${serverID}/messages`,
      method: "POST",
      headers: {
        authorization: config.Discord.authToken,
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    },
    (err, response, body) => {
      if (err) throw err;
    },
  );
}
