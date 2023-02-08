const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  openPrompt: () => ipcRenderer.invoke('prompt')
})