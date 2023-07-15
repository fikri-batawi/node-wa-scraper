const request = require('request');
const cheerio = require('cheerio');

const getNews = () => {
    return new Promise((resolve, reject) => {
        const url = 'https://news.detik.com/indeks';
        
        request(url, (err, res, body) => {
            const $ = cheerio.load(body);
            let documents = [];

            const dataDocuments = $('article.list-content__item');
            dataDocuments.each((i, value) => {
                documents.push({
                    Title : `${$(value).find('h3').text().trim()}`,
                    URL : `${$(value).find('a').attr('href')}`,
                })
            })
            resolve(documents);
        })
    })
}

module.exports = {getNews}