const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const {getLibraryEvents} = require('./scrapers/perpus-agenda-literasi');
const {getNews} = require('./scrapers/detik-news');
const command = require('./utils/command')

const waClient = new Client({
    authStrategy : new LocalAuth()
});

waClient.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

waClient.on('ready', () => {
    console.log('Client ready');
});

const handlerListMessage = (documents) => {
    let message = '';
    documents.forEach(document => {
        for(const [keys, value] of Object.entries(document)){
            message += `${keys} : ${value} \n`;
        }
        message+= '\n'
    });
    return message;
}

waClient.on('message', async msg => {
    if(msg.body === '!help'){
        const textReply = handlerListMessage(command)
        waClient.sendMessage(msg.from, textReply)
    }else if(msg.body === '!show-agenda-literasi'){
        const events = await getLibraryEvents();
        const textReply = handlerListMessage(events)
        msg.reply(textReply);
    }else if(msg.body === '!berita-hari-ini'){
        const news = await getNews();
        const textReply = handlerListMessage(news)
        msg.reply(textReply);
    }
});

waClient.initialize();


