const mongoose = require('mongoose')
const Song = require('../models/Song')

const artistSchema = new mongoose.Schema({
    name: {
       type: String,
       required: true
    },
    popularity: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Artist', artistSchema)