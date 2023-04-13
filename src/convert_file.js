// const { renderFile } = require('ejs');
const fs = require('fs');
const path = require('path');

// const renderFile = require('./render.js');


function convertFile(){
    const readFile = path.join(__dirname, '..', 'top-output.txt')

    fs.readFile(readFile, 'utf8', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            // Split the data by newline
            const lines = data.split('\n');
            // console.log(lines.length);
            let csv = '';
            
            
            // Process each line
            for (let i = 36; i < lines.length-1; i++) {
                // Split the line by space
                const line = lines[i];
                const fields = line.split(/\s+/);
                let row = '';
                
                // Process each field
                fields.forEach(function(field) {
                    // Add the field to the row, surrounded by quotes
                    row += '"' + field + '",';
                });
                // Remove the trailing comma and add the row to the CSV
                csv += row.slice(0, -1) + '\n';
            };

            // return csv
            
            fs.writeFile('output.csv', csv, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    // console.log('Successfully converted text file to CSV!');
                    // renderFile.renderFile();
                    // renderFile.renderFile();
                    // return true;
                    // console.log(document.getElementById('abds').innerHTML);
        
                }
            });
            // Write the CSV to a file
            
        }
    });
}

// function xyz(csv){
//     fs.writeFile('output.csv', csv, function(err) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('Successfully converted text file to CSV!');
//             // renderFile.renderFile();
//             // return true;

//         }
//     });
// }
// Read the contents of the text file

module.exports.convertFile = convertFile
// module.exports.xyz = xyz