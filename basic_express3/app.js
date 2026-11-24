//majd yassin
//tarek bdrea
//mohamad zubidat


const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// 1. read the users list from users.json
const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'), 'utf8'));
const userTemplate = fs.readFileSync(path.join(__dirname, 'templates', 'user.html'), 'utf8');

// GET /api/users -> all users
app.get('/api/users', (req, res) => {
  res.json(users);
});


app.get('/api/users/filter', (req, res) => {
  const min = req.query.minAge ? Number(req.query.minAge) : 0;
  const max = req.query.maxAge ? Number(req.query.maxAge) : Infinity;

  if (Number.isNaN(min) || Number.isNaN(max)) {
    return res.status(400).json({ error: 'minAge and maxAge must be numbers' });
  }

  if (min > max) {
    return res.status(400).json({ error: 'minAge cannot be bigger than maxAge' });
  }

  res.json(users.filter(user => user.age >= min && user.age <= max));
});

// GET /api/users/:id -> one user, or 404
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});

// GET /user/:id -> HTML page with the user's details (filled into the template)
app.get('/user/:id', (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));

  if (!user) {
    return res.status(404).send('<h1>User not found</h1>');
  }

  const html = userTemplate
    .replaceAll('{{id}}', user.id)
    .replaceAll('{{name}}', user.name)
    .replaceAll('{{email}}', user.email)
    .replaceAll('{{age}}', user.age);

  res.send(html);
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
