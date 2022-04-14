// ➤ I M P O R T S
import tmi from 'tmi.js';
import { subscribers } from 'tmi.js/lib/commands';
import { channel, username } from 'tmi.js/lib/utils';
import { BOT_USERNAME, OAUTH_TOKEN , CHANNEL_NAME, BLOCKED_WORDS } from './constants';

// ➤ S T A R T    O F    B O T   C O D E

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
client.on('hosted', (channel, username, viewers, autohost) => {
    onHostedHandler(channel, username, viewers, autohost)
})

client.on('raided', (channel,username, viewers) => {
    onRaidedHandler(channel, username, viewers)
})

client.on(subscribers, (channel, username, method, message, userstate) => {
    onSubscriptionHandler(channel, username, method, message, userstate)
})

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


// ➤ F U N C T I O N S

function checkTwitchChat(userstate, message, channel) {
    message = message.toLowerCase()
    let shouldSendMessage = false

    // bot checks message

    shouldSendMessage = BLOCKED_WORDS.some(blockedWord => message.includes(blockedWord.toLowerCase()))


    //bot moderation actions

    if (shouldSendMessage) {
        // tell user that the message contains a word from the BLOCKED_WORDS list
        client.say(channel, `@${userstate.username}, sorry you're message contained a no no`);

        // delete message
        client.deletemessage(channel, userstate.id);
    }

    
}

function onHostedHandler(channel, username, viewers, autohost) {
    client.say(channel, `Thank you @${username} for the host of ${viewers}!`);
}

function onRaidedHandler(channel, username, viewers) {
    client.say(channel, `THANK YOU @${username} FOR RAIDING WITH ${viewers}!`);
}


function onSubscriptionHandler(channel, username, method, message, userstate) {
    client.say(channel, `THANK YOU @${username} FOR SUBBING, WELCOME TO THE WHIFFLE WAFFLES!`);
}


// ➤ T I M E R S

// timer goes off to ask people to follow, chat or follow other social media
    function StreamTimer() {
        client.action(channel, 'enjoying stream? Then why dont you leave a follow, say something in chat or even go subscribe to the Youtube channel!');
    }
    setInterval(StreamTimer, 480000);
//


//
    function TikTokTimer() {
        client.action(channel, 'come check out our newest TikTok https://vm.tiktok.com/ZTd5LDVsL/');
    }
    setInterval(TikTokTimer, 780000);
//


//
    function DiscTimer() {
        client.action(channel, 'enjoying talking here? Continue the conversation over on Discord! https://discord.gg/A2rYbngxcv');
    }
    setInterval(DiscTimer, 1.02e+6);
//
