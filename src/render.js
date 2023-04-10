const csv = require('csv-parser');
const fs = require('fs');

const writeStream = fs.createWriteStream('src/index.html');
function renderFile(){
  writeStream.write(`
  <table>
    <thead>
      <tr>
        <th>PID</th>
        <th>COMMAND</th>
        <th>%CPU</th>
        <th>TIME</th>
      </tr>
    </thead>
    <tbody>
`);
writeStream.end();
// abc();
}
// function abc(){
//   fs.createReadStream('/Users/aman/Documents/ISSQUARED/Github/CPU-Usage-Monitor-App/output.csv')
//   .pipe(csv())
//   .on('data', (row) => {
//     writeStream.write(`<tr><td>${row.PID}</td><td>${row.COMMAND}</td><td>${row['%CPU']}</td><td>${row.TIME}</td></tr>\n`);
//   })
//   .on('end', () => {
//     writeStream.write(`
//       </tbody>
//     </table>
//     `);
//     writeStream.end();
//     console.log('HTML file successfully generated');
//   });
// }


module.exports.renderFile = renderFile
