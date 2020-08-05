

export class eightBall {


    public run(client, message, args) {
        this.eightball(client, message, args);
    }

    private eightball(client, message, args) {
        if(!args[0]) return message.channel.send('You can ask air?');

        //let question = args.slice(1).join(" ");

        let answers = 
        [
            "Yes",
            "No",
            "Maybe",
            "Ask later",
            "I'll think about it",
            "You just ask later, I can't answer it right now",
            "The universe says so"
        ]

        let random = Math.floor(Math.random() * answers.length);

        return message.channel.send(answers[random]);
    };
};