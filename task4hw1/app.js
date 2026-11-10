//mohamad zubidat
//tarek bdrea


const http = require('http');
const path = require('path');
const { readFileSync } = require('fs');

// resolve from this file's folder so the server works from any cwd
const read = (file) => readFileSync(path.join(__dirname, 'templates', file));

const homePage = read('page.html');
const aboutPage = read('about.html');
const contactPage = read('contact.html');
const homeStyles = read('css.css');
const homeImage = read('img/ex1.jpg');

const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === '/' || url === '/page' || url === '/home') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(homePage);
    }
    else if (url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(aboutPage);
    }
    else if (url === '/contact') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(contactPage);
    }
    else if (url === '/css.css') {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(homeStyles);
    }
    else if (url === '/ex1.jpg') {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(homeImage);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>Page Not Found</h1>');
    }
});

server.listen(3000, () => console.log('http://localhost:3000'));
