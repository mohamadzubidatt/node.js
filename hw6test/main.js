//mohamad zubidat
//tarek bdrea


const fs = require('fs');
const path = require('path');

const files = ['a1.txt', 'a2.txt', 'a3.txt'];

const allLines = [];
for (let f = 0; f < files.length; f++) {
    const content = fs.readFileSync(path.join(__dirname, files[f]), 'utf8');
    allLines.push(content.split(/\r?\n/).filter(line => line !== ''));
}

let result = '';
let start = 0;

for (let i = 1; i <= 10; i++) {

    for (let f = 0; f < files.length; f++) {
        for (let j = start; j < start + i && j < allLines[f].length; j++) {
            console.log(allLines[f][j]);
            result += allLines[f][j] + '\n';
        }
    }

    start += i;
}

fs.writeFileSync(path.join(__dirname, 'output.txt'), result);
