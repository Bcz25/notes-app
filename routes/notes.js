const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');    


// GET `/api/notes` responds with all notes from the database
notes.get('/', (req, res) => {
    readFromFile('./db/db.json')
        .then((data) => {
            const notes = JSON.parse(data);
            if (notes.length === 0) {
                res.json([]);
            } else {
                res.json(notes);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json('Error retrieving notes');
        });
});


// POST /notes responds with all notes from the database
notes.post('/', (req, res) => { 
    console.log(req.body);
    const { title, text } = req.body;
    
    if (title && text) {
        const newNote = {
        title,
        text,
        id: uuid(),
        };
    
        readAndAppend(newNote, './db/db.json');
        res.json('Note added');
        console.info('Note added');
    } else {
        res.error('Error in adding note');
    }
    });

//Delet route to handle deleting notes by ID
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((note) => note.id !== noteId);
        writeToFile('./db/db.json', result);
        res.json('Note deleted');
        console.info('Note deleted');
    });
});
// Export the router
module.exports = notes;