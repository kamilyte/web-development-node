const mongoose = require('mongoose')
const Artist = require('../models/Artist')

const songSchema = new mongoose.Schema(
    {
     name: {
        type: String,
        required: true
     },
     popularity: {
        type: Number,
        required: true
     },
     artists: [{
        type: String,
        required: true,
        ref: 'Artist'
     }],
     artistIDs : [{
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'Artist'
     }],
     date: {
        type: Date,
        required: true
     }
   }
)


module.exports = mongoose.model('Song', songSchema)

