// ➤ I M P O R T S
import tmi from 'tmi.js';
import axios from 'axios';
import { subscribers } from 'tmi.js/lib/commands';
import { channel, get, username } from 'tmi.js/lib/utils';
import { BOT_USERNAME, OAUTH_TOKEN , CHANNEL_NAME, BLOCKED_WORDS, MOD_USERS } from './constants';

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

const badges = tags.badges || {};

client.connect();
client.on('hosted', (channel, username, viewers, autohost) => {
    onHostedHandler(channel, username, viewers, autohost)
});

client.on('raided', (channel,username, viewers) => {
    onRaidedHandler(channel, username, viewers)
});

client.on(subscribers, (channel, username, method, message, userstate) => {
    onSubscriptionHandler(channel, username, method, message, userstate)
});

client.on('message', (channel, userstate, message, self) => {
    if(self) return;
    if(userstate.username === BOT_USERNAME) return;
    if(userstate.username === MOD_USERS) return;
    if(message.toLowerCase() === 'hello') {
        client.say(channel, `@${userstate.username}, hey there!`);
    }

    checkTwitchChat(userstate, message, channel)

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
        case '!shout':
            client.say(channel, `Go check out ${returnUsername()} and follow to see when they go live over at twitch.tv/${returnUsername()}`);
            break;
        case '!rank':
            client.say(channel, `Nyxie is currently Silver 1 in Valorant`);
            break;
        case '!dead':
            client.say(channel, `Nyxie has died ${addDeathCounter()} time(s)`);
            break;
        case '!fall':
            client.say(channel, `Nyxie has fell ${addFallCounter()} time(s)`);
            break;
    }

});



// ➤ C O U N T E R S

var deathCounter = 0;
function addDeathCounter() {
    return deathCounter = deathCounter + 1;
}

var fallCounter = 0;
function addFallCounter() {
    return fallCounter = fallCounter+ 1;
}




// ➤ F U N C T I O N S
let shouldSendMessage = false
function checkTwitchChat(userstate, message, channel) {
    message = message.toLowerCase()

    // bot checks message

    shouldSendMessage = BLOCKED_WORDS.some(blockedWord => message.includes(blockedWord.toLowerCase()))

    //bot moderation actions
    if (shouldSendMessage) {
        // tell user that the message contains a word from the BLOCKED_WORDS list
        client.say(channel, `@${userstate.username}, sorry you're message contained a no no`);

        client.deletemessage(channel, userstate.id)
    }

    
    
}


function onHostedHandler(channel, username, viewers) {
    client.say(channel, `Thank you @${username} for the host of ${viewers}!`);
}

function onRaidedHandler(channel, username, viewers) {
    client.say(channel, `THANK YOU @${username} FOR RAIDING WITH ${viewers}!`);
}


function onSubscriptionHandler(channel, username) {
    client.say(channel, `THANK YOU @${username} FOR SUBBING, WELCOME TO THE WHIFFLE WAFFLES!`);
}


// ➤ T I M E R S

// timer goes off to ask people to follow, chat or follow other social media
function StreamTimer() {
    client.action(channel(CHANNEL_NAME), 'enjoying stream? Then why dont you leave a follow, say something in chat or even go subscribe to the Youtube channel!');
}
setInterval(StreamTimer, 480000);
//480000 millisecs = 8 mins

//
function TikTokTimer() {
    client.action(channel(CHANNEL_NAME), 'come check out our newest TikTok https://vm.tiktok.com/ZTd5LDVsL/');
}
setInterval(TikTokTimer, 780000);
//780000 millisecs = 13 mins

//
function DiscTimer() {
    client.action(channel(CHANNEL_NAME), 'enjoying talking here? Continue the conversation over on Discord! https://discord.gg/A2rYbngxcv');
}
setInterval(DiscTimer, 1.02e+6);
//1.02e+6 millisecs = 17 mins
