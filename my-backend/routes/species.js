const express = require('express');
const Species = require('../models/Species');

const router = express.Router();

// Get all species
router.get('/', async (req, res) => {
    try {
        const species = await Species.find();
        res.status(200).json(species);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Like a species
router.post('/:id/like', async (req, res) => {
    const { id } = req.params;
    try {
        const species = await Species.findById(id);
        if (!species) {
            return res.status(404).json({ error: 'Species not found' });
        }
        species.likes += 1;
        await species.save();
        res.status(200).json({ message: 'Species liked!', likes: species.likes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
