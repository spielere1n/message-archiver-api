const discord = require('discord.js');
const bot = new discord.Client();
const config = require('./config.json');
const mongoose = require('mongoose');

let Msg = require('../models/messages');

function archiver() {

bot.on('ready', () => {
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels`);
});

bot.on('message', (message) => {
    const channel = bot.channels.get('495069385569075214');
    const args = message.content.slice(config.prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    if(command === 'archie') {
        message.channel.fetchMessage(args[0])
            .then(message =>  {

                console.log(message.content);

                let msg = new Msg();
                msg.message = message.content;
                msg.save((err) => {
                    if(err) {
                        return handleError(err);
                    } else {
                        console.log('success');
                    }
                });
            })
            .catch(console.error);

        message.reply('Message successfully archived')
            .then(message => {
                message.delete(5000);
            })
            .catch(console.error);
    }

    if(command === 'shane'){
        message.reply('Shane sucks and is bad at everything');
    }
});

bot.login(config.token);
}

module.exports = archiver();