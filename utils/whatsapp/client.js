const {readFileSync, writeFileSync} = require('node:fs')

const loadDataClient = (path) => {
    return JSON.parse(readFileSync(path, 'utf-8'))
}

const getContactsClient = (waClient) => {
    return new Promise((resolve, reject) => {
        waClient.getContacts().then(contacts => {
            resolve(contacts);
        })
    })
}

const saveDataClient = (path, dataClient) => {
    const timeUpdate = `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
    const client = {...dataClient.info.me, platform: dataClient.info.platform, last_update: timeUpdate };
    const data = {client}
    writeFileSync(path, JSON.stringify(data), 'utf-8');
}

const saveDataContactClient = async (path, waClient) => {
    const dataClient = loadDataClient(path);
    const contacts = await getContactsClient(waClient);
    const data = {...dataClient, contacts}
    writeFileSync(path, JSON.stringify(data), 'utf-8')
}

module.exports = {saveDataClient, saveDataContactClient}