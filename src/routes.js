const routes = require('express').Router()

const axios = require('axios')
const SteamID = require('steamid')

const PlayerController = require('./controllers/PlayerController')

routes.get('/player/:sid64', PlayerController.index)

module.exports = routes