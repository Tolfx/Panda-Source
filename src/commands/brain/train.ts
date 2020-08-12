import { good, bad, guess } from "../../brains/toxic";
const puppeteer = require("puppeteer");

export class TrainBrain {
  public run(client, message, args) {
    this.train(client, message, args);
  }

  private async getChat(page) {
    let first_column_text = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(".bg2"),
        (element) => element.textContent
      )
    );
    let unique = {};
    first_column_text.forEach(function (i) {
      if (!unique[i]) {
        unique[i] = "";
      }
    });
    return Object.keys(unique);
  }

  private async train(client, message, args) {
    if (!args[0]) return message.channel.send("You need to provide a link");

    const url = args[0];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    this.getChat(page).then(async (chat) => {
      for (var i = 0; i < chat.length; ++i) {
        let chatlog = chat[i];

        message.channel
          .send(`Is this toxic? \`${chat[i]}\` \n\nGuess: ${guess(chat[i])}`)
          .then((msg) => {
            msg.react("✅").then(async (r) => {
              msg.react("❌");

              const backWardsFilter = (reaction, user) =>
                reaction.emoji.name === "✅" && user.id === message.author.id;
              const forwardsFilter = (reaction, user) =>
                reaction.emoji.name === "❌" && user.id === message.author.id;

              const backwards = msg.createReactionCollector(backWardsFilter, {
                time: 60000,
              });
              const forwards = msg.createReactionCollector(forwardsFilter, {
                time: 60000,
              });

              backwards.on("collect", async (r, u) => {
                bad(chatlog);
                msg.delete();
              });

              forwards.on("collect", async (r, u) => {
                good(chatlog);
                msg.delete();
              });
            });
          });
      } //For loop
    }); // chat
  }
}
