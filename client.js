const {Client, LocalAuth} = require('whatsapp-web.js');
const commands = require('./datas/commands/basic-command.json');

const client = new Client({
    authStrategy : new LocalAuth({
        clientId: 'fikri'
    })
});

client.on('qr', (qr) => {
   console.log(qr)
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
    commands.forEach(value => {
        if(message.body === value.message) {
            message.reply(value.reply);
        }
    })
});

client.initialize();

module.exports = client;