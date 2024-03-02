const { app, BrowserWindow, ipcMain  } = require('electron')
const path = require('path');
const { dialog } = require('electron')

const createWindow = () => {
    const mainWindow  = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 600,
        minHeight: 600,
        webPreferences: {
          preload: path.join(__dirname, 'src/js/preload.js')
        }
    })

    ipcMain.on('open-directory', (event) => {
      selectFolder(event)
    })

    mainWindow.loadFile('src/index.html')
}

app.whenReady().then(() => {
  createWindow()
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})


function selectFolder(event) {
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }).then(result => {
      // result.canceled será true si el usuario cancela la selección
      if (!result.canceled) {
        // result.filePaths contendrá un array de las rutas de las carpetas seleccionadas
        const folderPath = result.filePaths[0]
        console.log('Ruta seleccionada:', folderPath)
        event.sender.send('folder-selected', folderPath);
      } else {
        console.log('Selección de carpeta cancelada por el usuario.')
      }
    }).catch(err => {
      console.log('Error al mostrar el cuadro de diálogo:', err)
    })
}