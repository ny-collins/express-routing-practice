const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
    }
);

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
    }
);

app.get('/search', (req, res) => {
    const term = req.query.term;
    const level = req.query.level;
    res.send(`You searched for ${term} at the level ${level}.`);
    }
);

app.get('/search', (req, res) => {
    const { category, difficulty } = req.query;
    res.send(`You searched in category : ${category} with difficulty: ${difficulty}.`);
    }
);

app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
        { id: 3, name: 'Jim Doe', email: 'jim@example.com'}
    ];
    res.json(users);
    }
);

app.get('/api/users/:id', (req, res) => {
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
        { id: 3, name: 'Jim Doe', email: 'jim@example.com'}
    ];
    const userID = parseInt(req.params.id);
    const user = users.find(user => user.id === userID);    
    
    if (!user) {
        return res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
    }
    res.json(user);
    }
);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
    }
);

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
    }
);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    }
);

