const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  openDirectory: () => ipcRenderer.send('open-directory')
})

ipcRenderer.on('folder-selected', (event, folderPath) => {
    // Dispara un evento personalizado para enviar el resultado a jQuery
    window.dispatchEvent(new CustomEvent('folder-selected', { detail: folderPath }));
});