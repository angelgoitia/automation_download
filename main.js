const { app, BrowserWindow, ipcMain, dialog  } = require('electron');
const path = require('path');
const fs = require('fs');

const createWindow = () => {
    const mainWindow  = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 600,
        minHeight: 600,
        webPreferences: {
          webviewTag: true,
          preload: path.join(__dirname, 'src/js/preload.js')
        }
    })

    ipcMain.on('download-demo', (event) => {
      downloadDemo(event)
    })

    ipcMain.on('open-directory', (event) => {
      selectFolder(event)
    })

    mainWindow.loadFile('src/index.html')
}

app.whenReady().then(() => {
  createWindow()
  //infoFile();
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

function downloadDemo() {
  const filePath = 'file/demo.xlsx';

  dialog.showSaveDialog({ defaultPath: 'demo.xlsx' }).then(result => {
    if (!result.canceled) {
      const destination = result.filePath;

      fs.copyFile(filePath, destination, err => {
        if (err) {
          console.error('Error al copiar el archivo:', err);
        } else {
          console.log('Archivo descargado exitosamente.');
        }
      });
    }
  });
}


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

function infoFile(){
  const filePath = 'D:/angel/Documentos/Maria/archivos/29villablanca23_3_3B_URGE/SR_VILLABLANCA23_ESCALERA23_3.pdf';
  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.error('Error al obtener la fecha de creación del archivo:', err);
    } else {
      console.log('Fecha de creación del archivo:', stats.birthtime);
      checkTime(stats.birthtime);
    }
  });


}

function checkTime(dateFile){
  const currentDate = new Date();

  const uploadedDate = new Date(dateFile);
  const timeDifference = currentDate.getTime() - uploadedDate.getTime();
  const hoursDifference = timeDifference / 3600000;
  if (hoursDifference > 48) {
    console.log('Han pasado más de 48 horas.');
  } else {
    console.log('No han pasado más de 48 horas.');
  }
}