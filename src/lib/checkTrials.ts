import gameDig from "gamedig";
import request from "request";
import steamID from "steamid";
import { getToken, getID } from "./webhook";
import { WebhookClient, MessageEmbed } from "discord.js";
import cheerio from "cheerio";
import { embededWebhook } from "../interfaces/webhooks"
const parseString = require("xml2js").parseString;
import { getGameURL, getPlayerURL, isPlaying } from "../hlstatsx/hlstatxHandler"

interface ServerInterface {
  IP: String;
  Port: Number;
}

export default class monitorTrail {
  //Private variables
  private discordWebhook: String;
  private TrailID: String;
  private Server: ServerInterface[];
  private connectURL: String;
  private Mentor: String;
  private isOnlineCheck: boolean = false;
  private lastServer: String;
  private SourceBanID: Number;
  private commsAmount: Number | number | any;
  private bansAmount: Number | number | any;
  private currentSession: Date;
  private lastSession: Date;
  private playerQuery: String;
  private gameQuery: String;

  /**
   * @param steamID The steamID of the player
   * @param server The server ip and port
   * @param mentorID Their ID on discord
   * @param SBID Trails ID in SourceBan
   * @param webhook The discord webhook.
   */
  constructor(steamID: String, server: ServerInterface[], mentorID: String, SBID: Number, webhook: String) {
    this.TrailID = steamID;
    this.Server = server;
    this.Mentor = mentorID;
    this.SourceBanID = SBID;
    this.discordWebhook = webhook;
  }

  /**
   *
   * @param id A steamID
   * @description Returns steamID64
   */
  private getID64(id): Promise<String> {
    let sid = new steamID(id);
    return sid.getSteamID64();
  }

  /**
   *
   * @param IP The ip for the server
   * @param Port The port for the server
   * @description Returns server information for tf2.
   */
  private getServerInformation(IP: String, Port: Number) {
    return gameDig.query({
      type: `tf2`,
      host: IP,
      port: Port,
      socketTimeout: 5000,
      updTimeout: 10000,
    });
  }

  /**
   * 
   * @param body The embeded webhook message
   * @param mentor If you want to mention the mentor
   */
  private messageWebhook(body: embededWebhook, mentor?) {
    const D_Token = getToken(this.discordWebhook);
    const D_ID = getID(this.discordWebhook);
    const webhookClient = new WebhookClient(D_ID, D_Token);

    let embed = new MessageEmbed();

    if (body.author) {
      embed.setAuthor(body.author.name, body.author.iconURL ? body.author.iconURL : null, body.author.url ? body.author.url : null);
    }

    if (body.color) {
      embed.setColor(body.color);
    }

    if (body.description) {
      embed.setDescription(body.description);
    }

    if (body.footer) {
      embed.setFooter(body.footer.text, body.footer.iconURL ? body.footer.iconURL : null);
    }

    if (body.timestamp) {
      embed.setTimestamp();
    }

    if (body.title) {
      embed.setTitle(body.title);
    }

    webhookClient.send(`${mentor ? `<@${this.Mentor}>` : ""}`, {
      embeds: [embed],
    });
  }

  /**
   * @param callback The message it returns, from the trial
   * @description Checks if the user is online on the server they are asigned too.
   */
  public isOnline(callback?, checkForNewServer: Boolean = true): Promise<Boolean | String> {
    return new Promise(async (resolve, reject) => {

      //The end point for steam
      const endPoint = "/?xml=1";

      //Steam URL
      const URL = "https://steamcommunity.com/profiles/";

      //Get the steamID64 from trials steamID
      const steamID64 = this.getID64(this.TrailID);

      //Fails for checking.
      let fails = [];

      //Do a request to steam
      request(
        {
          url: `${URL}${steamID64}${endPoint}`,
          headers: { "Content-Type": "text/xml" },
        },
        (error, response, body) => {

          //If no errors, continue.
          if (!error && response.statusCode == 200) {

            //Parse the XML to json.
            parseString(body, async (err, result) => {

              //The name of the user according to steam
              const name = result.profile.steamID[0];
              const connect = "steam://connect/";

              //Loop for each player in the game
              for (let x = 0; x < this.Server.length; ++x) {

                //Get the server information according to the IP and Port
                const server = await this.getServerInformation(
                  this.Server[x].IP,
                  this.Server[x].Port,
                ).catch((r) => fails.push(`Failed to get information from server from trial ${name}`,));

                //If there are none players give a fail to push.
                if (typeof server === "undefined" || server.players.length === 0) {
                  fails.push(1)
                }

                // Checking if the server could get information or not.
                if (typeof server != "undefined") {

                  //Loop for each player in the game.
                  for (let i = 0; i < server.players.length; ++i) {

                    //If we find the trail continue
                    if (server.players[i].name === name) {

                      if(typeof this.playerQuery != "undefined") {

                        getGameURL(server.name).then(gameURL => {
                          if(typeof gameURL === "string") {
                            this.gameQuery = gameURL;
                            getPlayerURL(gameURL, this.TrailID).then(playerURL => {
                              this.playerQuery = playerURL
                              isPlaying(gameURL, playerURL).then(online => {
                                if(online) {
                                  this.messanger(server, checkForNewServer, callback, resolve, connect, x)
                                } else {
                                  callback(`${name} seems to be an imposter in server: ${server.name}`, true);
                                  resolve(true);
                                }
                              }).catch(r => {
                                this.messanger(server, checkForNewServer, callback, resolve, connect, x)
                                callback(r)
                              });
                            }).catch(r => {
                              this.messanger(server, checkForNewServer, callback, resolve, connect, x)
                              callback(r)
                            });
                          } else {
                            this.messanger(server, checkForNewServer, callback, resolve, connect, x)
                          }
                        }).catch(r =>  {
                          this.messanger(server, checkForNewServer, callback, resolve, connect, x)
                          callback(r)
                        });
                      }
                    } else {
                      isPlaying(this.gameQuery, this.playerQuery).then(online => {
                        if(online) {
                          this.messanger(server, checkForNewServer, callback, resolve, connect, x)
                        } else {
                          callback(`${name} seems to be an imposter in server: ${server.name}`, true);
                          resolve(true);
                        }
                      }).catch(r => {
                        this.messanger(server, checkForNewServer, callback, resolve, connect, x)
                        callback(r)
                      });
                    }
                    
                    //Push to fail if we didn't find the player in the array.
                    if (i + 1 === server.players.length) {
                      fails.push(1);
                    }

                    //If the player isn't online but was marked online then return this
                    if (this.isOnlineCheck && fails.length === this.Server.length) {
                      this.lastSession = this.currentSession;
                      this.currentSession = new Date;
                      callback(`${name} left`, true);
                      this.isOnlineCheck = false;
                      resolve("left");
                      break;
                      
                    // If we didn't find trial at all return this.  
                    } else if (fails.length === this.Server.length) {
                      callback(`Couldn't find ${name}`, true);
                      this.isOnlineCheck = false;
                      resolve(false);
                      break;
                    }
                  } //For loop ends here
                }
              } // For loop ends here.
            });
          } else {
            //If we fail to get information from steam reject.
            reject(`Failed to get information from steam API with status code: ${response.statusCode}`)
          }
        },
      );
    });
  }

  private messanger(server, checkForNewServer, callback, resolve, connect, x) {
    if (this.isOnlineCheck) {

      //If the trail joined a new server
      if (this.lastServer != server.name && checkForNewServer) {
        this.lastServer = server.name;
        this.connectURL = `${connect}${this.Server[x].IP}:${this.Server[x].Port}`
        callback(`${name} joined a new server: ${server.name}`, true);
        resolve(true);

      //Already in game
      } else {
        this.lastServer = server.name;
        callback(`${name} already in game`, true);
        resolve(false);
      }

    //If the trial isnt marked as "online" then mark him
    } else {
      this.currentSession = new Date
      this.lastServer = server.name;
      this.connectURL = `${connect}${this.Server[x].IP}:${this.Server[x].Port}`
      callback(`${name} joined ${server.name}`, true);
      this.isOnlineCheck = true;
      resolve(true);
    }
  }

  /**
   * @returns {Session = {
   * hours,
   * minutes,
   * seconds
   * }}
   */
  public sessionLasted() {
    let session = this.currentSession.getTime() - this.lastSession.getTime();

    let hh = Math.floor(session / 1000 / 60 / 60);
    session -= hh * 1000 * 60 * 60;
    let mm = Math.floor(session / 1000 / 60);
    session -= mm * 1000 * 60;
    let ss = Math.floor(session / 1000);
    session -= ss * 1000;

    return {
      hours: hh,
      minutes: mm,
      seconds: ss,
    }
  }

  /**
   * @description Shows where the trial was last online.
   */
  public lastOnline(): Promise<String> {
    return new Promise((resolve, reject) => {
      resolve(this.lastServer);
    });
  }

  /**
   * @description Returns the url of the server
   */
  public serverConnectURL(): String {
    return this.connectURL;
  }

  /**
   *
   * @param body The message the mentor will recive
   * @param mention Whatever they should get mentioned or not [true | false]
   */
  public noticeMentor(body: embededWebhook, mention: Boolean): void {
    if (mention) {
      this.messageWebhook(body, mention)
    } else {
      this.messageWebhook(body, mention)
    }
  }

  /**
   * @param save Save in memory
   * @description Returns the comms amount from the trial
   */
  public CommsAmount(save: Boolean): Promise<String | Number> {
    return new Promise(async (resolve, reject) => {
      const URL = "https://bans.panda-community.com/index.php?";
      const SEARCH_COMM = "p=commslist&advSearch=";
      const ID = this.SourceBanID;
      const ENDPOINT = "&advType=admin";

      request(
        {
          url: `${URL}${SEARCH_COMM}${ID}${ENDPOINT}`,
          headers: { "Content-Type": "text/xml" },
        },
        (error, response, html) => {
          if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            let amount: string = $("#content > h3 > i").text().trim().replace(
              "Total Blocks: ",
              "",
            );
            if (save) {
              this.commsAmount = parseInt(amount);
            }
            resolve(amount);
          } else {
            reject("Something went wrong on checking Comms");
          }
        },
      );
    });
  }

  /**
   * @param save Save in memory
   * @description Returns the ban amount from the trial
   */
  public BansAmount(save: Boolean): Promise<String | Number> {
    return new Promise((resolve, reject) => {
      const URL = "https://bans.panda-community.com/index.php?";
      const SEARCH_BAN = "p=banlist&advSearch=";
      const ID = this.SourceBanID;
      const ENDPOINT = "&advType=admin";
      request(
        {
          url: `${URL}${SEARCH_BAN}${ID}${ENDPOINT}`,
          headers: { "Content-Type": "text/xml" },
        },
        (error, response, html) => {
          if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            let amount: string = $("#content > h3 > i").text().trim().replace(
              "Total Bans: ",
              "",
            );
            if (save) {
              this.commsAmount = parseInt(amount);
            }
            resolve(amount);
          } else {
            reject("Something went wrong checking Bans");
          }
        },
      );
    });
  }

  public increasedBlocks(banAmount: number, commsAmount: number) {
    return {
      Bans: banAmount - this.bansAmount,
      Comms: commsAmount - this.commsAmount,
    };
  }
}
