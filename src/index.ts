/*
Author: Tolfx | Matthew
Purpose: Get information from panda.tf with a discord bot.

Start: 2020/06/01
Ongoing..

#TODO: 

*/

import fs from "fs";
import { CustomLogger } from "./lib/customLogs";
const log = new CustomLogger();

fs.readFile('config.json', (err, data) => {
  if(!data) {
    log.warn('No config file.. creating one..');
    let parsedData = JSON.parse(fs.readFileSync("default/config.json", "utf8"));
    parsedData = JSON.stringify(parsedData);

    fs.writeFile("config.json", parsedData, (err) => {
      if (err) log.warn(err);
      log.debug(`Created config file.`);
    })
  }
});

fs.readdir("./json", (err, data) => {
  if (!data) {
    log.warn(`No json folder.. creating one..`);
    fs.mkdirSync("./json");
    fs.readdirSync("default/json").forEach((file) => {
      let parsedData = JSON.parse(fs.readFileSync(`default/json/${file}`, "utf8"));
      parsedData = JSON.stringify(parsedData);

      fs.writeFile(`./json/${file}`, parsedData, err => {
        if (err) log.warn(err);
        log.debug(`Created ${file}`);
      })
    })
  }
})


import { Client } from "discord.js";
import CheckBans from "./events/checkBan";
import { stripIndent } from "common-tags";
import { commandHandler } from "./commands/commandHandler";
import { newThread } from "./events/newThread";
import { latestActivity } from "./events/latestActivity";
import CheckComm from "./events/checkComm";
import config from "../config.json";
import mongoose from "mongoose";
import {newLogin, editProfileUser} from "./steamHandler/steamHandler"

mongoose.connect(config.General.MongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

newLogin().catch(e => {
  log.warn(`An error accured.. ${e}, failed to login.`)
})

const prefix = config.General.prefix;

// New modules and shit idk
const client = new Client();
const activity = new latestActivity();
const checkban = new CheckBans();
const checkcomm = new CheckComm();
const newthread = new newThread();
const commandhandler = new commandHandler();

const db = mongoose.connection;
//On error [MongoDB]
db.on("error", (error) => log.warn(error));
//On open [MongoDB]
db.once("open", () => log.normal("Connected to database"));

//When bot is ready.
client.on("ready", () => {
  log.normal("Im online");

  client.user
    .setPresence({ activity: { name: `${prefix}help` }, status: "online" })
    .then()
    .catch(console.error);
});

//All of the messages gets through here, and if a message starts with config.prefix it will execute.
client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  if (cmd) {
    //Goes to commandhandler so all commands can get sorted and etc.. will change in the future.
    commandhandler.run(client, message, args);
  }
});

client.on("guildMemberAdd", (member) => {
  let memberRole = member.guild.roles.cache.find((r) =>
    r.id === "734140557487636561"
  );

  member.roles.add(memberRole);
  log.normal(
    `\nNew member.\nWith username: ${member.user.username}\nWith tag: ${member.user.tag}\nWith ID: ${member.id}\nJoined at: ${member.joinedAt}`,
    true,
  );
});

client.on("guildMemberRemove", (member) => {
  log.normal(
    `\nA member left.\nWith username: ${member.user.username}\nWith tag: ${member.user.tag}\nWith ID: ${member.id}\nJoined at: ${member.joinedAt}`,
    true,
  );
});

//Logo lol xd
console.log(stripIndent`
+--------+  +----+  +        +------+  X     X
    ||      |    |  |        |          X   X
    ||      |    |  |        +---+       X X
    ||      |    |  |        |            X
    ||      |    |  |        |           X X
    ||      |    |  |        |          X   X
    ++      +----+  +-----+  +         X     X`);

//Events starts here
if (config.Boolean.Enable_NewThread_Event) {
  newthread.watchNew();
  log.normal('Starting "newThread" event.');
}
if (config.Boolean.Enable_LatestActivity_Event) {
  activity.checker("https://www.panda-community.com/whats-new/latest-activity");
  log.normal('Starting "latestActivity" event.');
}
if (config.Boolean.Enable_CheckComm_Event) {
  checkcomm.checker("https://bans.panda-community.com/index.php?p=commslist");
  log.normal('Starting "checkComm" event.');
}
if (config.Boolean.Enable_CheckBans_Event) {
  checkban.checker("https://bans.panda-community.com/index.php?p=banlist");
  log.normal('Starting "checkBan" event.');
}

fs.readFile(`./src/private/checkTrialsLoop.ts`, async (err, data) => {
  if (data) {
    require('./private/checkTrialsLoop')();
  } else {
    log.warn(`Not starting checkTrialsLoop`)
  }
})
//Event end
client.login(config.General.tokenDiscord);
