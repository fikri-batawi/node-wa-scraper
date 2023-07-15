const request = require('request');
const cheerio = require('cheerio');


const getLibraryEvents = () => {
    const url = 'https://perpustakaan.jakarta.go.id/agenda';
    return new Promise((resolve, reject) => {
        request(url, (err, res, body) => {
            let documents = [];
            const $ = cheerio.load(body);
            
            const dataDocuments = $('div.flex.rounded')
            dataDocuments.each((i, value) => {
                documents.push({
                    Event : `${$(value).find('h3').text()}`,
                    URL : `${$(value).find('a').attr('href')}`,
                    Speaker : `${$($(value).find('span.line-clamp-1')[0]).text().trim()}`,
                    date : `${$(value).find('span.font-medium').text()}`,
                    address : `${$($(value).find('span.line-clamp-1')[1]).text().trim()}`
                })
            })
    
            resolve(documents);
        })
    })
}

module.exports = {getLibraryEvents}