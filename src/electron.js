const electron = require('electron');
// const log = require('electron-log');
// const settings = require('electron-settings');
const path = require('path');

const { app, BrowserWindow, Menu } = electron;
const rPath = path.resolve(__dirname, '../public');
// RootPath
const ROOT_PATH = `file://${rPath}`;

// mainWindowのHTMLファイル(第4項で解説)
const rootPath = `${ROOT_PATH}/index.html`;
const appPath = app.getPath('userData');

// ElectronのMenuの設定
const templateMenu = [
    {
        label: 'Edit',
        submenu: [
            {
                role: 'undo',
            },
            {
                role: 'redo',
            },
        ],
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click(item, focusedWindow) {
                    if (focusedWindow) focusedWindow.reload();
                },
            },
            { type: 'separator' },
            { role: 'resetzoom' },
            { role: 'zoomin', label: '拡大' },
            { role: 'zoomout', label: '縮小' },
            { type: 'separator' },
            { role: 'togglefullscreen', label: 'フルスクリーン' },
            { role: 'toggledevtools', label: '開発ツール' },
        ],
    },
    {
        role: 'window',
        submenu: [
            { role: 'minimize' },
            { role: 'close' },
        ],
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click() {
                    electron.shell.openExternal('https://electronjs.org');
                },
            },
        ],
    },
];

if (process.platform === 'darwin') {
    templateMenu.unshift({
        label: app.getName(),
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' },
        ],
    });
}
// アプリ起動時の処理
app.on('ready', () => {
    const winSetting = {
        width: 1280,
        height: 900,
    };
    let mainWindow = new BrowserWindow(winSetting);
    // デベロップツールの表示
    // mainWindow.openDevTools();
    mainWindow.loadURL(rootPath);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    mainWindow.webContents.on('new-window', (event, url) => {
        event.preventDefault();
        // 外部ブラウザを起動する
        electron.shell.openExternal(url);
    });
    const menu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(menu);
    // electron設定
    // settings.set('host', ROOT_PATH);
    // settings.set('app_root', rPath);
    // settings.set('appPath', appPath);
});

// アプリ終了時の処理
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

process.on('uncaughtException', (err) => {
    log.error('electron:event:uncaughtException');
    log.error(err);
    log.error(err.stack);
    app.quit();
});
