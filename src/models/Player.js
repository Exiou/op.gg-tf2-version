const mongoose = require('mongoose')

const PlayerSchema = new mongoose.Schema({
  name: String,
  sid64: String,
  sid3: String,
  lastLog: Number,
  scoutLogCount: Number,
  soldierLogCount: Number,
  demomanLogCount: Number,
  medicLogCount: Number,
  stats: {
    scoutStats: {
      kills: Number,
      assists: Number,
      deaths: Number,
      dmg: Number,
      dpm: Number,
      team_dmg_ratio: Number,
      accuracy: Number,
      kad: Number,
      heal_received: Number,
    },
    soldierStats: {
      kills: Number,
      assists: Number,
      deaths: Number,
      dmg: Number,
      dpm: Number,
      team_dmg_ratio: Number,
      kad: Number,
      heal_received: Number,
    },
    demomanStats: {
      kills: Number,
      assists: Number,
      deaths: Number,
      dmg: Number,
      dpm: Number,
      team_dmg_ratio: Number,
      kad: Number,
      heal_received: Number,
    },
    medicStats: {
      kills: Number,
      assists: Number,
      deaths: Number,
      kad: Number,
      dmg_taken: Number,
      ubers: Number,
      drops: Number,
      heal: Number,
      avg_time_to_build: Number,
      avg_uber_length: Number
    }
  }
})

module.exports = mongoose.model('Player', PlayerSchema)