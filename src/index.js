const electron = require("electron");
const os = require("os");
const fs = require("fs");
const path = require("path");

const { app, BrowserWindow, ipcMain } = electron;
let window;
let homeDir;

app.on("ready", startApp);
ipcMain.on("view-data", (event, data) => {
    console.log(data);
});

function startApp() {
    fs.mkdir(path.join(os.homedir(), "demo-app"), () => { homeDir = path.join(os.homedir(), "demo-app") });

    if (window == null) {
        window = new BrowserWindow({});
        window.loadURL(`file://${path.resolve(__dirname, "..", "view", "index.html")}`);
    }
    else {
        console.log("Window already created");
    }
}