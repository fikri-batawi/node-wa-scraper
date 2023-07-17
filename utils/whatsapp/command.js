const {existsSync, readFileSync} = require('node:fs')

const path = './datas/commands/';

const getPathCommand = (client) => {
    const clientToLower = client.toLowerCase();
    const pathClientCommand = `${path + clientToLower}-command.json`;
    const pathBasicCommand = `${path}basic-command.json`;
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