import { init, start } from './WebServer';
import Server from './ServerModel';
import { Injectable } from './requestProcessor';

const injectables: { [key: string]: Injectable } = {};

const defaultFile = 'index.html';
const wwwFolder = `${process.cwd()}/bin/www`;
let defaultPort = 9990;
const server: Server = init(defaultPort, wwwFolder, injectables, defaultFile);

start(server, defaultPort);
