const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const {getEvents} = require('./scrapers/perpus-agenda-literasi');
const {getNews} = require('./scrapers/detik-news');

const waClient = new Client({
    authStrategy : new LocalAuth()
});

waClient.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

waClient.on('ready', () => {
    console.log('Client ready');
});

const textCommand = `
Halo, mau dapet info apa nih? Masukin perintah dibawah buat dapet infonya!

!show-agenda-literasi : Agenda literasi perpustakaan jakarta
!berita-hari-ini : Kumpulan berita hari ini dari detik.com
`

waClient.on('message', async msg => {
    if(msg.body === '!help'){
        waClient.sendMessage(msg.from, textCommand)
    }else if(msg.body === '!show-agenda-literasi'){
        const messageEvents = await getEvents();
        msg.reply(messageEvents);
    }else if(msg.body === '!berita-hari-ini'){
        const messageNews = await getNews();
        msg.reply(messageNews);
    }
});

waClient.initialize();

