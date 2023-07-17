const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const {loadClientCommand} = require('./command');
const {saveDataClient, saveDataContactClient} = require('./client');

const startWhatsapp = (username) => {
    const client = username;
    const waClient = new Client({
        authStrategy : new LocalAuth(({
            clientId : client
        }))
    });
    
    waClient.on('qr', (qr) => {
        qrcode.generate(qr, {small: true});
    });
    
    waClient.on('ready', () => {
        console.log(`${client} ready!`);
    
        const clientToLower = client.toLowerCase(); 
        const path = `./datas/clients/${clientToLower}.json`;
        saveDataClient(path, waClient);
        saveDataContactClient(path, waClient)
    });

    const commands = loadClientCommand(client)
    waClient.on('message', async msg => {
        commands.forEach(value => {
            if(msg.body.toLowerCase() === value.message.toLowerCase()){
                msg.reply(value.reply);
            };
        })
    });

    waClient.initialize();
};

const handlerListMessage = (documents) => {
    let message = '';
    documents.forEach(document => {
        for(const [keys, value] of Object.entries(document)){
            message += `${keys} : ${value} \n`;
        }
        message+= '\n'
    });
    return message;
};

module.exports = { startWhatsapp };