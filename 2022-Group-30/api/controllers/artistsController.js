const Artist = require('../models/Artist')
const Song = require('../models/Song')
const asyncHandler = require('express-async-handler')
const { areIntervalsOverlappingWithOptions } = require('date-fns/fp')

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

const getAllArtists = asyncHandler( async (req, res) => {
    const artists = await Artist.find().lean()
    if (!artists?.length) {
        return res.status(400).json({message: 'No artists found'})
    }

    const paramsString = req.url.split('?')[1];
    const eachParamArray = paramsString.split('&');
    const contentType = await (eachParamArray[0]).split('=')[1]

    if (contentType == 'application/json') {
        res.json(artists)
    } else {
        res.send(jsonToCsv(artists))
    }
})

//POST: create artist
const createArtist = asyncHandler(async (req, res) => {
    const { name, popularity } = req.body
    if (!name || !popularity) {
        return res.status(400).json({ message: 'All fields are required'})
    }
    const duplicate = await Artist.findOne({name}).lean()
    if (duplicate) {
        return res.status(409).json({message: 'Duplicate artist'})
    }

    const artist = await Artist.create({name, popularity})
    if (artist) {
        return res.status(201).json({ message: 'New artist created'})
    } else {
        return res.status(400).json({ message: 'Invalid artist data received'})
    }
})

//GET: summary (name)
const getSummaryName = asyncHandler(async (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ message: 'All fields are required'})
    }
    const artists = await Artist.find({name}).lean()
    if (!artists?.length) {
        return res.status(400).json({message: 'No artists found'})
    }

    const summaryList = []
    for (var i = 0; i < artists.length; i++) {
        const id = artists[i]._id
        const sortedDates = await Song.find({artistIDs: id }).sort({date: -1}).lean()
        const artistName =  artists[i].name
        const popularity = artists[i].popularity
        const numOfSongs = (await Song.find({artistIDs: id }).exec()).length
        const earliest = sortedDates[sortedDates.length - 1].date
        const latest = sortedDates[0].date
        const mostPopularSong = await Song.find({artistIDs: id}).sort({popularity: -1}).lean()
        const mostPopular = mostPopularSong[0].name
    
        const summary = { 
            "id": id,
            "name": artistName,
            "popularity": popularity,
            "numOfSongs": numOfSongs,
            "eariest": earliest,
            "latest": latest,
            "mostPopular": mostPopular
        }
       
        summaryList.push(summary) 
    }

    const paramsString = req.url.split('?')[1];
    const eachParamArray = paramsString.split('&');
    const contentType = await (eachParamArray[0]).split('=')[1]

    if (contentType == 'application/json') {
        res.json(summaryList)
    } else {
        res.send(jsonToCsv(summaryList))
    }
})

//GET: summary (id)
const getSummaryID = asyncHandler (async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({ message: 'All fields are required'})
    }
    const artist = await Artist.findById(id).lean()
    if (!artist) {
        return res.status(400).json({message: 'No artists found'})
    }

    const sortedDates = await Song.find({artistIDs: id }).sort({date: -1}).lean()
    const artistName =  artist.name
    const popularity = artist.popularity
    const numOfSongs = (await Song.find({artistIDs: id }).exec()).length
    const earliest = sortedDates[sortedDates.length - 1].date
    const latest = sortedDates[0].date
    const mostPopularSong = await Song.find({artistIDs: id}).sort({popularity: -1}).lean()
    const mostPopular = mostPopularSong[0].name
    
    const summary = { 
        "id": id,
        "name": artistName,
        "popularity": popularity,
        "numOfSongs": numOfSongs,
        "eariest": earliest,
        "latest": latest,
        "mostPopular": mostPopular
    }

    const paramsString = req.url.split('?')[1];
    const eachParamArray = paramsString.split('&');
    const contentType = await (eachParamArray[0]).split('=')[1]

    if (contentType == 'application/json') {
        res.json(summary)
    } else {
        res.send(jsonToCsv(summary))
    }
})

//GET: songs of artist (name)
const getSongsName = asyncHandler (async (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ message: 'All fields are required'})
    }
    const songs = await Song.find({artists: name}).lean().exec()
    if (!songs) {
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

//GET: songs of artist (ID)
const getSongsID = asyncHandler (async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({ message: 'All fields are required'})
    }
    const songs = await Song.find({artistIDs: id}).lean().exec()
    if (!songs) {
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

//GET: top N artists 
const getTopArtists = asyncHandler(async (req, res) => {
    const { n } = req.body
    if (!n) {
        return res.status(400).json({message: 'All fields are required'})
    }
    const artists = await Artist.find().sort({popularity: -1}).limit(n).lean()

    if(!artists?.length) {
        return res.status(400).json({ message: 'No artists found'})
    }

    const paramsString = req.url.split('?')[1];
    const eachParamArray = paramsString.split('&');
    const contentType = await (eachParamArray[0]).split('=')[1]

    if (contentType == 'application/json') {
        res.json(artists)
    } else {
        res.send(jsonToCsv(artists))
    }
})

module.exports = {
    createArtist,
    getAllArtists,
    getSummaryName,
    getSummaryID,
    getSongsName,
    getSongsID,
    getTopArtists
}