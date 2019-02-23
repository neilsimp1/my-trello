const { app, BrowserWindow, Menu, Tray } = require('electron');

const path = require('path');
const url = require('url');

let mainWindow;
let tray;

function createWindow() {
	mainWindow = new BrowserWindow({ 
		width: 800,
		height: 600,
		title: 'Trello',
		icon: 'trello.png'
	});
	mainWindow.setMenu(null);

	tray = new Tray('trello.png');
	tray.setToolTip('Trello');
	tray.setContextMenu(Menu.buildFromTemplate([
		{
			label: 'Show',
			click: () => { mainWindow.restore(); }
		},
		{
			label: 'Exit',
			click: () => {
				app.isQuiting = true;
				app.quit();
			}
		}
	]));

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if(process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if(mainWindow === null) createWindow();
});
