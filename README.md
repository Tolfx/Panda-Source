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

## Configure
```js
{
    "General": {
        "prefix": "!", // The prefix for the bot
        "discord_Owner_ID": "", // Your ID on discord
        "tokenDiscord": "" // The token for the bot
    },

    //All of these are webhooks, and if you want to gather data you need to add discord webhooks.
    "Discord": {
        "logs": "", 
        "ShoutboxURL": "",
        "LatestActivity": "",
        "NewComms": "",
        "NewBans": "",
	    "NewThread": "",

        "Chatlog_04": "",
        "EndRacism": ""
    },

    "Steam": {
        "name": "", //Steam name
        "password": "", //Steam password
        "sharedSecret": "" //Shared secret
    },

    //If you want to enable an event you use true or false
    "Boolean": {
        "Enable_NewThread_Event": false,
        "Enable_LatestActivity_Event": false,
        "Enable_CheckComm_Event": false,
        "Enable_CheckBans_Event": false,
        "wantsBigCommIcons": false
    },
    
    "profilePicturePath": "", //The path for your normal profile picture when using command "normal"
    "underCoverProfile": "", //The path for your undercover profiles pictures.
    "numberOfPics": 0, //How many profile pictures are you using?

    //When going undercover the bot picks a random name, aka these under here.
    "names": 
    [
		"name1",
		"name2"
    ]
}
```

## Compiling
Be in the right root and type `tsc` and the code should be compiled.

## Running
Depending on the root you are in. You want to navigate to dist/src/index and use this command: `node index` *depending on your root ofc*
