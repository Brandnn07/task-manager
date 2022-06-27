const router = require('express').Router();
const { Notes } = require('../../models/noteModel');

router.get('/newNote', async (req, res) => {
    try {
        const notesInfo = await Notes.findAll()
        res.status(200).json(notesInfo);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});