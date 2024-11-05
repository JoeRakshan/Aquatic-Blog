const mongoose = require('mongoose');

const speciesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    info: { type: String, required: true },
    imageUrl: { type: String, required: true },
    likes: { type: Number, default: 0 }
});

const Species = mongoose.model('Species', speciesSchema);

module.exports = Species;
