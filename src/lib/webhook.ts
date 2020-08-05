/*

This will take a webhook url from discord and take the token and id

*/

/**
 * @description Returns the token and ID from a discod webhook.
 * @param url The url of the webhook.
 * @param callback Token and ID
 */
export function getWebHook(
    url,
    callback: (err: null | Error, Token?, ID?) => void
    ): void {

        if(!url)
            callback(new Error('No URL provided.'));

        /*if(url !== url.includes('https://discordapp.com/api/webhooks/'))
            return callback(new Error('Invalid URL'));*/

        //let url = 'https://discordapp.com/api/webhooks/738689316058038295/OcQ1mcjT1ZYjNjFnLMTLKdIn3eQ8dTMxFgd0f-_QCvrIBZCV7UxRWW8bfIFVTV7h6MeU';

        let removeURL = url.replace('https://discordapp.com/api/webhooks/', "");

        let parser = removeURL.split(/\//g);

        let token = parser[1];
        let ID = parser[0];

        callback(null, token, ID);
    
};

export function getToken(url) {
    let removeURL = url.replace('https://discordapp.com/api/webhooks/', "");

    let parser = removeURL.split(/\//g);

    let token = parser[1];
    let ID = parser[0];

    return token;
};

export function getID(url) {
    let removeURL = url.replace('https://discordapp.com/api/webhooks/', "");

    let parser = removeURL.split(/\//g);

    let token = parser[1];
    let ID = parser[0];

    return ID;
};
