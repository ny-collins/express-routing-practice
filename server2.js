const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Sample user data
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

// Homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// About page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
    });

// Contact page
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Search route (with basic param logic)
app.get('/search', (req, res) => {
  const { term, level, category, difficulty } = req.query;
  let message = '';

  if (term && level) {
    message = `Searching for "${term}" at level "${level}".`;
  } else if (category && difficulty) {
    message = `Filtering by category of "${category}" and difficulty of "${difficulty}".`;
  } else {
    message = 'Please provide valid query parameters.';
  }

  res.send(`<h1>${message}</h1>`);
});

// API - Get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// API - Get user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// 404 Not Found Handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});