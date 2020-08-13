export class Format {
  public run(client, message, args) {
    this.format(client, message, args);
  }

  private format(client, message, args) {
    let argsFull = args[0];

    let parsers = '& || =';

    if (argsFull === 'ban') {
      message.channel.send(`Format: nickname, steamid, reason, length ... ${parsers}`);
    } else if (argsFull === 'mute') {
      message.channel.send(`Format: nickname, steamid, reason, length ... ${parsers}`);
    } else if (argsFull === 'silence') {
      message.channel.send(`Format: nickname, steamid, reason, length ... ${parsers}`);
    } else if (argsFull === 'gag') {
      message.channel.send(`Format: nickname, steamid, reason, length ... ${parsers}`);
    }
  }
} //end of class
