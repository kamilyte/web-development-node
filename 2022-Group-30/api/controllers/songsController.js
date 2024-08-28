const Song = require('../models/Song')
const Artist = require('../models/Artist')
const asyncHandler = require('express-async-handler')

//converts JSON to CSV representation
function jsonToCsv(items) {
    const header = Object.keys(items[0]);
    const headerString = header.join(',');
    const replacer = (key, value) => value ?? '';
    const rowItems = items.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    const csv = [headerString, ...rowItems].join('\r\n');
    return csv;
}

const getAllSongs = asyncHandler(async (req, res) => {
    const songs = await Song.find().lean()
    if (!songs?.length) {
        return res.status(400).json({message: 'No songs found'})
    }

    const paramsString = req.url.split('?')[1];
    const eachParamArray = paramsString.split('&');
    const contentType = await (eachParamArray[0]).split('=')[1]

    if (contentType == 'application/json') {
        res.json(songs)
    } else {
        res.send(jsonToCsv(songs))
    }
})

//GET: songs by name
const getSongs = asyncHandler(async (req, res) => {
    var name = req.params['name']

    var str = '';
    name = name.split("-")
    const len = name.length
    for (var i = 0; i < len - 1; i++) {
        var result = decodeURIComponent(name[i])
        str += result + " "
    }
    var result = decodeURIComponent(name[len - 1])
    str += result 
    
    name = str

    if (!name) {
        return res.status(400).json({message: 'All fields are required'})
    }

    const songs = await Song.find({ name }).lean()

    if (!songs?.length) {
        return res.status(400).json({ message: 'No songs found'})
    }

    const paramsString = req.url.split('?')[1];
    const eachParamArray = paramsString.split('&');
    const contentType = await (eachParamArray[0]).split('=')[1]

    if (contentType == 'application/json') {
        res.json(songs)
    } else {
        res.send(jsonToCsv(songs))
    }
})

//GET: songs by ID
const getSong = asyncHandler(async (req, res) => {
    const id = req.params.id


    if (!id) {
        return res.status(400).json({message: 'All fields are required'})
    }

    const song = await Song.findById( id ).lean()

    if (!song) {
        return res.status(400).json({ message: 'No songs found'})
    }

    const paramsString = req.url.split('?')[1];
    const eachParamArray = paramsString.split('&');
    const contentType = await (eachParamArray[0]).split('=')[1]

    if (contentType == 'application/json') {
        res.json(song)
    } else {
        res.send(jsonToCsv(song))
    }
})

//GET: top songs
const getTopSongs = asyncHandler(async (req, res) => {
    const { n } = req.body 
    if (!n) {
        return res.status(400).json({message: 'All fields are required'})
    }

    const songs = await Song.find().sort({popularity: -1}). limit(n).lean()

    if (!songs?.length) {
        return res.status(400).json({ message: 'No songs found'})
    }

    const paramsString = req.url.split('?')[1];
    const eachParamArray = paramsString.split('&');
    const contentType = await (eachParamArray[0]).split('=')[1]

    if (contentType == 'application/json') {
        res.json(songs)
    } else {
        res.send(jsonToCsv(songs))
    }
})

//POST: create song
const createNewSong = asyncHandler(async (req, res) => {
    const { name, popularity, artists, artistsID, date } = req.body
    if (!name || !popularity || !artists?.length || !artistsID?.length || !date) {
        return res.status(400).json({ message: 'All fields are required'})
    }

    if (duplicate) {
        return res.status(409).json({message: 'Duplicate song'})
    }
    
    const song = await Song.create({ name, popularity, artists, date})
    if (song) {
        song.artistIDs = artistsID
        const updatedSong = await song.save()
        return res.status(201).json({ message: 'New song created'})
    } else {
        return res.status(400).json({ message: 'Invalid song data received'})
    }
})

//PATCH: update song
const updateSong = asyncHandler(async (req, res) => {
    const { id, name, popularity, artists, artistsID, date } = req.body
    if (!id || !name || !popularity || !artists?.length || !artistsID?.length || !date) {
        return res.status(400).json({ message: 'All fields are required'})
    }

    const song = await Song.findById(id).exec()
    if (!song) {
        return res.status(400).json({ message: 'Song not found'})
    }

    const duplicate = await Song.findOne({name}, {artists}).lean().exec()
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate song'})
    }

    song.name = name
    song.popularity = popularity
    song.artists = artists
    song.artistIDs = artistsID
    song.date = date

    const updatedSong = await song.save()

    res.json(`'${updatedSong.name}' updated`)
})

//DELETE: delete song by ID
const deleteSong = asyncHandler(async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({ message: 'Song ID required'})
    }

    const song = await Song.findById(id).exec()
    if (!song) {
        return res.status(400).json({message : 'Song not found'})
    }

    const result = await song.deleteOne()
    const reply = `Song '${result.name}' with ID ${result._id} deleted`
    res.json(reply)
})

//DELETE: delete songs by artist name
const deleteSongName = asyncHandler(async (req, res) => {
    const { artists } = req.body
    if (!artists) {
        return res.status(400).json({message: 'Artist name required'})
    }

    const songs = await Song.find({ artists }).exec()
    if (!songs?.length) {
        return res.status(400).json({message: 'No songs found to delete'})
    }
    const result = await Song.deleteMany({artists})
    const reply = `Deleted ${result.deletedCount} songs`
    res.json(reply)
})

//DELETE: delete songs by artist ID
const deleteSongID = asyncHandler(async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({message: 'Artist ID required'})
    }

    const songs = await Song.find({artistIDs: id}).exec()
    if (!songs?.length) {
        return res.status(400).json({message: 'No songs found to delete'})
    }
    const result = await Song.deleteMany({artistIDs: id})
    const reply = `Deleted ${result.deletedCount} songs`
    res.json(reply)
})


module.exports = {
    getAllSongs,
    getSongs,
    getSong,
    getTopSongs,
    createNewSong,
    updateSong,
    deleteSong,
    deleteSongName,
    deleteSongID
}