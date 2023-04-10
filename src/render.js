// Load the CSV file using Papa Parse
const fs = require('fs');
const csv = require('csv-parser');

const inputFile = '/Users/aman/Documents/ISSQUARED/CPU-Tracker/output.csv';
const outputFile = '/Users/aman/Documents/ISSQUARED/CPU-Tracker/src/index.html';

function renderFile(){
  const htmlHeader = '<!DOCTYPE html>\n<html>\n<head>\n<meta charset="UTF-8">\n<title>CSV to HTML</title>\n</head>\n<body>\n<table>\n';
  const htmlFooter = '</table>\n</body>\n</html>';

  let htmlContent = '';
  let isFirstRow = true;

  fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (data) => {
    htmlContent += '<tr>\n';

    for (const [key, value] of Object.entries(data)) {
      if (isFirstRow) {
        htmlContent += `<th>${key}</th>\n`;
      }else{
      htmlContent += `<td>${value}</td>\n`;
      }
    }

    htmlContent += '</tr>\n';
    isFirstRow = false;
  })
  .on('end', () => {
    const output = htmlHeader + htmlContent + htmlFooter;

    fs.writeFile(outputFile, output, (err) => {
      if (err) throw err;
      console.log('HTML file generated!');
    });
  });
}

module.exports.renderFile = renderFile
