const { Router } = require('express')
const express = require('express')
const router = express.Router()
const artistsController = require('../controllers/artistsController')

router.route('/')
    .post(artistsController.createArtist)
    .get(artistsController.getAllArtists)

router.route('/summary')
    .get(artistsController.getSummaryName)

router.route('/summary/id')
    .get(artistsController.getSummaryID)

router.route('/songs')
    .get(artistsController.getSongsName)

router.route('/songs/id')
    .get(artistsController.getSongsID)

router.route('/top')
    .get(artistsController.getTopArtists)

module.exports = router