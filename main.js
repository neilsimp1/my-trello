const { app, BrowserWindow, Menu, remote, Tray } = require('electron');
const Config = require('electron-config');
const config = new Config();
const path = require('path');
const url = require('url');

const defaultConfig = {
	minimizeToTray: true,
	closeToTray: true,
	window: {
		width: 800,
		height: 600
	}
};

if (config.size === 0) config.store = defaultConfig;

const iconPath = path.join(__dirname, 'trello.png');

let mainWindow;
let tray;
let contextMenu = [
	{
		label: 'Show', click: () => { mainWindow.show(); }
	},
	{ label: 'Settings',
		submenu: [
			{
				label: 'Minimize to tray',
				type: 'checkbox',
				checked: config.get('minimizeToTray'),
				click: (menuOption) => {
					config.set('minimizeToTray', menuOption.checked);
				}
			},
			{
				label: 'Close to tray',
				type: 'checkbox',
				checked: config.get('closeToTray'),
				click: (menuOption) => {
					config.set('closeToTray', menuOption.checked);
				}
			}
		]
	},
	{
		label: 'Exit', click: () => {
			app.isQuiting = true;
			exit();
		}
	}
];

function createWindow() {
	mainWindow = new BrowserWindow({ 
		width: config.get('window.width'),
		height: config.get('window.height'),
		title: 'Trello',
		icon: iconPath
	});

	tray = new Tray(iconPath);
	tray.setToolTip('Trello');
	tray.setContextMenu(Menu.buildFromTemplate(contextMenu));
	tray.on('click', () => {
		mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
	});

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));

	mainWindow.on('minimize', (event) => {
		if (config.get('minimizeToTray')) {
			event.preventDefault();
			mainWindow.hide();
		}
  });

	mainWindow.on('close', (event) => {
		if (config.get('closeToTray') && !app.isQuitting) {
			event.preventDefault();
			mainWindow.hide();
		}
		else {
			exit();
		}
	});

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

function exit() {
	const windowSize = mainWindow.getSize();
	if (windowSize[0] !== 0) config.set('window.width', windowSize[0]);
	if (windowSize[1] !== 0) config.set('window.height', windowSize[1]);

	tray.destroy();
	mainWindow.destroy();
	app.quit();
}

app.on('ready', createWindow);

app.on('browser-window-created', (event, mainWindow) => {
	mainWindow.setMenuBarVisibility(false);
});

app.on('window-all-closed', () => {
	//if (process.platform !== 'darwin') exit();
});

app.on('activate', () => {
  if(mainWindow === null) createWindow();
});
