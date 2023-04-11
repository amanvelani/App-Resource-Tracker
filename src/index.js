// const {AbortController} =  require("node-abort-controller");
const { app, BrowserWindow } = require("electron");
const os = require("os-utils");
const path = require("path");
const { execSync } = require('child_process');
const nativeImage = require('electron').nativeImage;
const { exec } = require("child_process");
const fs = require('fs');
const csv  = require('csv-parser');
const convertFile = require('./convert_file.js');
const renderFile = require('./render.js');
// import convertFile from ('./convert_file')
const filename = 'top-output.txt';

function saveTopOutputToFile() {
  // let abortController = new AbortController();
  const stdout = execSync('top -o cpu -n 10 -l 2');
  console.log(typeof(stdout));
  // console.log(Object.values(stdout));
  // setTimeout(() => {
  //   abortController.abort();
  // }, 3300);
  const date = new Date();
  const timestamp = date.toISOString();
  const output = `\n\n[${timestamp}]\n${stdout}`;
  console.log(typeof(output));
  fs.writeFile(filename, output, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
    let csv_text  = convertFile.convertFile();
    // let csv_output = convertFile.xyz();
    // console.log(csv_text);
  }); 
}
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}
var image = nativeImage.createFromPath(__dirname + '/icon.ico'); 
image.setTemplateImage(true);

const createWindow = () => {

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 450,
    icon: image,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  
  // and load the index.html of the app.
  setInterval(() => {
    mainWindow.loadFile(path.join(__dirname, "index.html"));
  }, 1000);
  
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
    // Retrieve the CSV file using the fetch() API

  // setInterval(() => {
  //   os.cpuUsage(function (v) {
  //     mainWindow.webContents.send("cpu", v * 100);
  //     mainWindow.webContents.send("mem", os.freemem()/1024);
  //     mainWindow.webContents.send("total-mem", os.totalmem() / 1024);
  //   });
  // }, 1000);
};

// setInterval(() => saveTopOutputToFile(), 5000); // run the command every 5 seconds
setInterval(saveTopOutputToFile, 3000);
// setTimeout(saveTopOutputToFile, 1000);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.