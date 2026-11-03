const fs = require('fs');
const path = require('path');

const files = ['a1.txt', 'a2.txt', 'a3.txt', 'a4.txt', 'a5.txt', 'a6.txt', 'a7.txt', 'a8.txt', 'a9.txt', 'a10.txt'];

let result = '';

for (let i = 0; i < files.length; i++) {

    const content = fs.readFileSync(path.join(__dirname, files[i]), 'utf8');

    const lines = content.split('\n');
    const n = i + 1;

    for (let j = 0; j < n && j < lines.length; j++) {
        if (lines[j] !== '') {
            console.log(lines[j]);
            result += lines[j] + '\n';
        }
    }
}

fs.writeFileSync(path.join(__dirname, 'output.txt'), result);