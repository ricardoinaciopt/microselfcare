const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const Store = require('electron-store')

function createWindow () {
  const mainWindow = new BrowserWindow({
    show: false,
    width: 800,
    height: 500,
    minWidth: 780,
    minHeight: 360,
    backgroundColor: '#000',
    frame: false,
    icon: path.join(__dirname, { darwin: 'icon.icns', linux: 'icon.png', win32: 'icon.ico' }[process.platform] || 'icon.ico'),
    resizable: true,
    webPreferences: {
      zoomFactor: 1.0,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      backgroundThrottling: false,
      nativeWindowOpen: true,
      devtools: false,
    }
  })

  if(isDev){
    mainWindow.webContents.openDevTools()
  }else{
    mainWindow.removeMenu()
  }


  const store = new Store();

  if (!store.get('user')) {
    mainWindow.loadFile("intro.html")
  } else {
    mainWindow.loadFile("index.html")
  }

  mainWindow.loadFile("intro2.html")
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  //ipcMain events
  ipcMain.on('max', () => {
    if(!mainWindow.isMaximized()){
      mainWindow.maximize()
    }else{
      mainWindow.unmaximize()
    }
  })

  ipcMain.on('min', () => {
    if(!mainWindow.isMinimized()){
      mainWindow.minimize()
    }else{
      mainWindow.unminimize()
    }
  })

  ipcMain.on('x', () => {
    mainWindow.close();
    app.exit();
  })

  ipcMain.on('userexists', () => {
    mainWindow.loadFile('index.html');
  })
}



app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})


if (require('electron-squirrel-startup')) return app.quit();
