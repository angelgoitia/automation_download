const { app, BrowserWindow } = require('electron')
const { dialog } = require('electron')

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
  selectFolder()
})



function selectFolder() {
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }).then(result => {
      // result.canceled será true si el usuario cancela la selección
      if (!result.canceled) {
        // result.filePaths contendrá un array de las rutas de las carpetas seleccionadas
        const folderPath = result.filePaths[0]
        console.log('Ruta seleccionada:', folderPath)
        //document.getElementById('directory').value = folderPath;
      } else {
        console.log('Selección de carpeta cancelada por el usuario.')
      }
    }).catch(err => {
      console.log('Error al mostrar el cuadro de diálogo:', err)
    })
}