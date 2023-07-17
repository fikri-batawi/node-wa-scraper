const {existsSync, readFileSync} = require('node:fs')

const getPathCommand = (client) => {
    const clientToLower = client.toLowerCase();
    const pathClientCommand = `./datas/commands/${clientToLower}-command.json`;
    const pathBasicCommand = `./datas/commands/basic-command.json`;
    return existsSync(pathClientCommand) ? pathClientCommand : pathBasicCommand;
}

const loadCommand = (path) => {
    const commands = JSON.parse(readFileSync(path, 'utf-8'))
    return commands;
}

const loadClientCommand = (client) => {
    const pathCommand = getPathCommand(client);
    const cliendCommand = loadCommand(pathCommand);
    return cliendCommand;
}

module.exports = {loadClientCommand}