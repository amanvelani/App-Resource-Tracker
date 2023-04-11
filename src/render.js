// Load the CSV file using Papa Parse
const fs = require('fs');
const csv = require('csv-parser');

const inputFile = '/Users/aman/Documents/ISSQUARED/CPU-Tracker/output.csv';
const outputFile = '/Users/aman/Documents/ISSQUARED/CPU-Tracker/src/index.html';

function renderFile(){
  const htmlHeader = '<!DOCTYPE html>\n<html>\n<head>\n<meta charset="UTF-8">\n<title>CPU-Tracker</title>\n<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">\n<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>\n</head>\n<body>\n<table class="table table-bordered border-primary">\n';
  const htmlFooter = '</table>\n<script src="kill.js"></script>\n</body>\n</html>';

  let htmlContent = '';
  let isFirstRow = true;
  let isFirstColumn = true;


  fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (data) => {
    htmlContent += '<tr>\n';
    for (const [key, value] of Object.entries(data)) {
      // if (isFirstColumn) {
      //   htmlContent += '<th class="table-primary">Action</th>\n';
      //   isFirstColumn = false;
      // }
      if (isFirstRow) {
        if(['PID','COMMAND','%CPU','TIME','MEM','STATE','POWER','USER'].includes(key)){
            htmlContent += `<th class="table-primary">${key}</th>\n`;
        }
      }else{

        if(['PID','COMMAND','%CPU','TIME','MEM','STATE','POWER','USER'].includes(key)){
          if(key == 'PID'){
            htmlContent += `<td class="table-secondary" onclick="kill('${value}')">${value}</td>\n`;
          } else {
            
            htmlContent += `<td class="table-secondary">${value}</td>\n`;
          }
        } 
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