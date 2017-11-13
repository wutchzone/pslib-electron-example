const electron = require("electron");
const os = require("os");
const fs = require("fs");
const path = require("path");

const { app, BrowserWindow, ipcMain } = electron;
let window;
let homeDir;

app.on("ready", startApp); // Při startu instancuje okno

// Event handler, který nasloouchá na události u okna (první parametr "view-data" je libovolný, jen musí být stejný jako ve view)
ipcMain.on("view-data", (event, data) => {
    fs.writeFileSync(`${path.resolve(homeDir,"data.txt")}`, data, 'utf-8'); // Vytvoří a zapíše do souboru v domácim adresáři
});

function startApp() {
    // Získá adresu složky, kam se pak následně vytvoří soubor s daty
    // Jsou použity knihovny Node.js, aby se zaručila multiplatformnost (rozdíl lomítek na jiných OS)
    fs.mkdir(path.join(os.homedir(), "demo-app"), () => { homeDir = path.join(os.homedir(), "demo-app") });

    window = new BrowserWindow({}); // Instancovaní jednoho okna (vlákna)
    window.loadURL(`file://${path.resolve(__dirname, "..", "view", "index.html")}`); // Načtení HTML do okna
}