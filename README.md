# Panda-Source

**Panda-Source** is a bot which gathers data from *panda.tf*. It uses some simple http requests and puppeteer. The bot also provides some commands you can use for *steam*.

## Installing
### Git
- Install [git](https://git-scm.com/) 
- Install this repository by using git: `git clone https://github.com/Tolfx/Panda-Source.git --branch-master`

### Node.JS
- Download Node.JS from https://nodejs.org/.

### Typescript
To use this bot you need to compile the code. Therefor you need typescript.
- Install typescript in cmd by using this command: `npm install typescript@latest -g` (-g so is global)



### Setting up

Run the bat file, and the bot will create the `config.json` file, and then configure it on your likings.

## Configure
```json
{
    "General": {
      "prefix": "!",
      "discord_Owner_ID": "",
      "tokenDiscord": "",
      "MongoDB": ""
    },
  
    "Discord": {
      "logs": "",
      "ShoutboxURL": "",
      "LatestActivity": "",
      "NewComms": "",
      "NewBans": "",
      "NewThread": "",
      "goldHook": "",
      "Chatlog_04": "",
      "EndRacism": "",
      "authToken": ""
    },
  
    "Steam": {
      "name": "",
      "password": "",
      "sharedSecret": ""
    },
  
    "Boolean": {
      "Enable_Shoutbox_Event": false,
      "Enable_NewThread_Event": false,
      "Enable_LatestActivity_Event": true,
      "Enable_CheckComm_Event": true,
      "Enable_CheckBans_Event": true,
      "wantsBigCommIcons": false
    },
  
    "profilePicturePath": "",
    "underCoverProfile": "",
    "numberOfPics": 1,
  
    "names": [
        "test",
        "test2"
    ]
}
```

## Compiling
Be in the right root and type `tsc` and the code should be compiled.

## Running
Depending on the root you are in. You want to navigate to dist/src/index and use this command: `node index` *depending on your root ofc*
