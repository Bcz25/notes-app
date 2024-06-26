const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route for notes page
app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET route for all unknown pages to redirect to homepage
app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
// What port the app is listening on, defaulting to 3001 if not specified in the environment
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);