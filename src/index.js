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
// import convertFile from ('./convert_file')
const filename = 'top-output.txt';
const inputFile = path.join(__dirname, '..', 'output.csv')


function saveTopOutputToFile() {
  // let abortController = new AbortController();
  const stdout = execSync('top -o cpu -n 10 -l 2');
  // console.log(typeof(stdout));
  // console.log(Object.values(stdout));
  // setTimeout(() => {
  //   abortController.abort();
  // }, 3300);
  const date = new Date();
  const timestamp = date.toISOString();
  const output = `\n\n[${timestamp}]\n${stdout}`;
  // console.log(typeof(output));
  fs.writeFile(filename, output, (err) => {
    if (err) throw err;
    // console.log('The file has been saved!');
    let csv_text  = convertFile.convertFile();
    // let csv_output = convertFile.xyz();
    // console.log(csv_text);
  }); 
}

function generateHTMLOutput(){
  return new Promise((resolve, reject) => {
    let htmlContent = '';
    let isFirstRow = true;

    let pid_val = null;
    let cpu_val = null;
    let process_name = null;
    fs.createReadStream(inputFile)
      .pipe(csv())
      .on('data', (data) => {
        htmlContent += '<tr>\n';
        for (const [key, value] of Object.entries(data)) {
          // if (isFirstRow) {
          //   if(['PID','COMMAND','%CPU','TIME','MEM','STATE','POWER','USER'].includes(key)){
          //     th += key + ',';
          //     htmlContent += `<th class="table-primary">${key}</th>\n`;
          //   }
          // } else {
            if(['PID','COMMAND','%CPU','TIME','MEM','STATE','POWER','USER'].includes(key)){
              if(key == 'PID'){
                pid_val = value;
                pid_val = pid_val.replace("*","");
                htmlContent += `<td class="table-secondary" id = "pid">${pid_val}</td>\n`;
              }else if(key == '%CPU'){
                cpu_val = value;
                htmlContent += `<td class="table-secondary" id = "cpu_val">${cpu_val}</td>\n`;
              }
              else if(key == 'COMMAND'){
                process_name = value;
                htmlContent += `<td class="table-secondary" id = "process_name">${process_name}</td>\n`;
              }
              else {
                // tr += value + ',';
                // console.log("Inside TR: "+tr);
                htmlContent += `<td class="table-secondary">${value}</td>\n`;
              }
            // } 
          }
        }
        htmlContent += `<td class="table-secondary" onclick="kill('${pid_val}')"> <button type="button" class="btn btn-outline-danger">Close</button>
        </td>\n`;
        htmlContent += '</tr>\n';
        isFirstRow = false;
      })
      .on('end', () => {
        // const value = tr.split(',');
        // console.log(th);
        // console.log(tr);
        resolve(htmlContent);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}



// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}
var image = nativeImage.createFromPath(__dirname + '/app_icon.jpeg'); 
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
  mainWindow.loadFile(path.join(__dirname, "index.html"));
  

  // const htmlHeader = '<!DOCTYPE html>\n<html>\n<head>\n<meta charset="UTF-8">\n<title>CPU-Tracker</title>\n<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">\n<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>\n</head>\n<body>\n<table class="table table-bordered border-primary">\n';
  // const htmlFooter = '</table>\n<script src="kill.js"></script>\n</body>\n</html>';

  setInterval(() => {
    generateHTMLOutput()
      .then((htmlContent) => {
        const send = htmlContent;
        // console.log("Send" + send);
        mainWindow.webContents.send("cpu", send);
    })
  }, 10000); 



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