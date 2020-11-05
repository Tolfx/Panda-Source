import config from "../../../config.json";

export class Restart {
    public run(client, message, args) {
      this.restart(message, args);
    }
  
    private restart(message, args) {
        if(message.author.id != config.General.discord_Owner_ID)
            return message.channel.send('Not owner.');

        message.channel.send(`Restarting bot..`)
        process.exit(10);
    }
}  