//imports
import tmi from 'tmi.js';
import { channel } from 'tmi.js/lib/utils';
import { BOT_USERNAME, OAUTH_TOKEN , CHANNEL_NAME, BLOCKED_WORDS } from './constants';

//start of bot code

const options = {
    options: { debug: true, messagesLogLevel: "info" },
    connection: {
        cluster: 'aws',
        reconnect: true,
        secure: true
    },
    identity: {
        username: BOT_USERNAME,
        password: OAUTH_TOKEN
    },
    channels: [ CHANNEL_NAME ]
}


const client = new tmi.Client(options);

client.connect();
client.on('message', (channel, userstate, message, self) => {
    if(self) return;
    if (userstate.username === BOT_USERNAME) return;
    if (userstate.username === CHANNEL_NAME) return;
    if(message.toLowerCase() === 'hello') {
        client.say(channel, `@${userstate.username}, hey there!`);
    }

    checkTwitchChat (userstate, message, channel)

    switch(message) {
        case '!discord':
            client.say(channel, `@${userstate.username}, This is the server you're looking for https://discord.gg/A2rYbngxcv`);
            break;
        case '!lurk':
            client.say(channel, `@${userstate.username}, PopCorn Thanks for Lurking! We hope you enjoy your stay PopCorn`);
            break;
        case '!rules':
            client.say(channel, `@${userstate.username}, these are the rules make sure to follow them (see below as well)! Breaking them will entitle a ban! |No Slurs will be Tolerated| |No Racism| |No LGBTQIA+ Hate| |Use the Golden Rule| |No Politics|`);
            break;
        case '!sens':
            client.say(channel, `|sensitivity aim : 0.288| |scoped sens : 1|`);
            break;
        






    }

});



function checkTwitchChat(userstate, message, channel) {
    message = message.toLowerCase()
    let shouldSendMessage = false

    // first check message

    shouldSendMessage = BLOCKED_WORDS.some(blockedWord => message.includes(blockedWord.toLowerCase()))


    //bot moderation actions

    if (shouldSendMessage) {
        // tell user
        client.say(channel, `@${userstate.username}, sorry you're message contained a no no`);

        // delete message
        client.deletemessage(channel, userstate.id); 
}


    


}
