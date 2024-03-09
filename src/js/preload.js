const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  openDirectory: () => ipcRenderer.send('open-directory'),
  downloadDemo: () => ipcRenderer.send('download-demo')
})

ipcRenderer.on('folder-selected', (event, folderPath) => {
    // Fire a custom event to send the result to jQuery
    window.dispatchEvent(new CustomEvent('folder-selected', { detail: folderPath }));
});

