const { app, BrowserWindow } = require("electron");
const os = require("os-utils");
const path = require("path");
const { execSync,spawn, execFile } = require('child_process');
const nativeImage = require('electron').nativeImage;
const { exec } = require("child_process");
const fs = require('fs');
const filename = 'top-output.txt';

// console.log("Hello");

function saveTopOutputToFile() {
  const stdout = execSync('top -o cpu -n 10');
  // console.log(stdout);
  const date = new Date();
  const timestamp = date.toISOString();
  const output = `\n\n[${timestamp}]\n${stdout}`;
  fs.writeFile(filename, output, (err) => {
    if (err) throw err;
    // console.log('The file has been saved!');
  }); 
 
  
  // const out = fs.openSync('./out.log', 'a');
  // const err = fs.openSync('./out.log', 'a');

  // const subprocess = spawn('top -o cpu -n 10', [], {
  //   detached: true,
  //   stdio: [ 'ignore', out, err ],
  // });

  // const child = execFile('top -o cpu -n 10', [], (error, stdout, stderr) => {
  //   if (error) {
  //     throw error;
  //   }
  //   console.log(stdout);
  // });

  // subprocess.unref();
}

// setTimeout(saveTopOutputToFile, 1000);

setInterval(() => saveTopOutputToFile(), 1000);
