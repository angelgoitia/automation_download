const { app, BrowserWindow } = require('electron')
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 600,
        minHeight: 600
    })

    win.loadFile('src/index.html')

   /*  win.on('closed', function () {
        win = null;
    }); */
}

app.whenReady().then(() => {
  createWindow()
})