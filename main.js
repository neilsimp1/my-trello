const { app, BrowserWindow, Menu, Tray } = require('electron');
const path = require('path');
const url = require('url');

const iconPath = path.join(__dirname, 'trello.png');

let mainWindow;
let tray;

function createWindow() {
	mainWindow = new BrowserWindow({ 
		width: 800,
		height: 600,
		title: 'Trello',
		icon: iconPath
	});

	tray = new Tray(iconPath);
	tray.setToolTip('Trello');
	tray.setContextMenu(Menu.buildFromTemplate([
		{
			label: 'Show', click: () => { mainWindow.show(); }
		},
		{
			label: 'Exit', click: () => {
				app.isQuiting = true;
				exit();
			}
		}
	]));
	tray.on('click', () => {
		mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
	});

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));

	mainWindow.on('minimize', (event) => {
		event.preventDefault();
		mainWindow.hide();
  });

	mainWindow.on('close', (event) => {
		if (!app.isQuitting) {
			event.preventDefault();
			mainWindow.hide();
		}
	});

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

function exit() {
	tray.destroy();
	mainWindow.destroy();
	app.quit();
}

app.on('ready', createWindow);

app.on('browser-window-created', (event, mainWindow) => {
	mainWindow.setMenuBarVisibility(false);
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') exit();
});

app.on('activate', () => {
  if(mainWindow === null) createWindow();
});
