const router = require('express').Router();

// Imports modlular routes for /notes
const notesRouter = require('./notes');

router.use('/notes', notesRouter);

module.exports = router;