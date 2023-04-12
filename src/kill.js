var exec = require('child_process').exec;
function kill(abc){
    console.log(abc);
    exec(`kill -9 ${abc}`,
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });
}
