const electron = require('electron');
const url = require('url');
const path = require('path');

process.env.NODE_ENV = 'production';

const { app, BrowserWindow } = electron;

let mainWindow;

app.on('ready', function () {
   
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true
        }
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'exe/index.html'),
        protocol: 'file:',
        slashes: true
    }));
});