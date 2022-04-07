/* eslint-disable */

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');
// electron.Menu.setApplicationMenu(null);

let mainWindow;
let cmdQPressed = false;

function createWindow() {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();
    mainWindow.show();
  } else {
    mainWindow = new BrowserWindow({
      show: false,
      minWidth: 900,
      minHeight: 600,
      webPreferences: {
        nodeIntegration: false,
        webSecurity: false
      }
    });
    mainWindow.loadURL(isDev ? 'http://localhost:8080' : `file://${path.join(__dirname, '../dist/index.html')}`);
  
    mainWindow.on('closed', () => (mainWindow = null));
    mainWindow.show();
  }
}

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (event, argv, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到mainWindow这个窗口
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();
      mainWindow.show();
    }
  })
  app.on('ready', () => createWindow());
  if (process.platform === 'darwin') {
    app.on('before-quit', () => {
      cmdQPressed = true;
    });
  }
  app.on('window-all-closed', () => {
    if (cmdQPressed || process.platform !== 'darwin') {
      app.quit();
    }
  });
  app.on('activate', () => createWindow());
}
