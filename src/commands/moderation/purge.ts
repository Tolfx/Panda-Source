export class Purge
{

public run(client, message, args)
{
    this.purge(message, args);
}

private purge(message, args)
{
    if(!message.member.hasPermission("MANAGE_MESSAGES"))
        return message.reply(`Sorry ${message.author} you dont have permission to do this`).then(m => m.delete(5000));

    if(!args[0])
        return message.channel.send(`${message.author} you need a number to purge!`).then(m => m.delete(5000));


    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
        return message.reply("I do not have permissions to do this command.")
            .then(m => m.delete(5000));
    };

    message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Purged ${args[0]} messages`)
        .then(m => m.delete({timeout: 5000}));
    }); 
}


}