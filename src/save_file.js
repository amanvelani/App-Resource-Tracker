const { app, BrowserWindow } = require("electron");
const os = require("os-utils");
const path = require("path");
const { execSync,spawn, execFile } = require('child_process');
const nativeImage = require('electron').nativeImage;
const { exec } = require("child_process");
const fs = require('fs');
const filename = 'top-output.txt';


function saveTopOutputToFile() {
  const stdout = execSync('top -o cpu -n 10');
  const date = new Date();
  const timestamp = date.toISOString();
  const output = `\n\n[${timestamp}]\n${stdout}`;
  fs.writeFile(filename, output, (err) => {
    if (err) throw err;
  }); 
 
}

setInterval(() => saveTopOutputToFile(), 1000);
