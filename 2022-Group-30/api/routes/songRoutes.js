const express = require('express')
const router = express.Router()
const songsController = require('../controllers/songsController')

router.route('/all')
    .get(songsController.getAllSongs)

router.route('/')
    .post(songsController.createNewSong)

router.route('/name/:name')
    .get(songsController.getSongs)

router.route('/:id')
    .get(songsController.getSong)

router.route('/id')

    .patch(songsController.updateSong)
    .delete(songsController.deleteSong)
    
router.route('/top')
    .get(songsController.getTopSongs)

router.route('/artist')
    .delete(songsController.deleteSongName)

router.route('/artist/id')
    .delete(songsController.deleteSongID)

module.exports = router