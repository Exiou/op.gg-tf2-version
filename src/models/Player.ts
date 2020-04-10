import { Schema, model } from 'mongoose'

import { PlayerInterface } from './interfaces/PlayerInterface'

const PlayerSchema = new Schema({
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
      teamDmgRatio: Number,
      accuracy: Number,
      kad: Number,
      healReceived: Number
    },
    soldierStats: {
      kills: Number,
      assists: Number,
      deaths: Number,
      dmg: Number,
      dpm: Number,
      teamDmgRatio: Number,
      kad: Number,
      healReceived: Number
    },
    demomanStats: {
      kills: Number,
      assists: Number,
      deaths: Number,
      dmg: Number,
      dpm: Number,
      teamDmgRatio: Number,
      kad: Number,
      healReceived: Number
    },
    medicStats: {
      kills: Number,
      assists: Number,
      deaths: Number,
      kad: Number,
      dmgTaken: Number,
      ubers: Number,
      drops: Number,
      heal: Number,
      avgTimeToBuild: Number,
      avgUberLength: Number
    }
  }
})

export default model<PlayerInterface>('Player', PlayerSchema)
