const electron = require('electron'),
        { app, BrowserWindow, Menu } = require('electron'),
        path = require('path'),
        url = require('url'),
        isDev = require('electron-is-dev');

if (isDev) {
  require("electron-reload")(__dirname);
} else {
  const updater = require('electron-simple-updater');
  updater.init('https://raw.githubusercontent.com/TanayParikh/Chattrics/master/updates.json');
}

if (require('electron-squirrel-startup')) {
	app.quit();
}



// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1190,
    height: 720,
    icon: __dirname + '/../app/icons/png/256x256.png',
    frame:false
  });

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  const page = win.webContents;

  // Open the DevTools.
  if (isDev)
    page.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  });

  // Create the Application's main menu
  var menuTemplate = [
    {
      label: "Edit",
      submenu: [
          { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
          { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
          { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
          { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); } }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
