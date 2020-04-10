import { Schema, model } from 'mongoose'

import { PlayerInterface } from './interfaces/PlayerInterface'

const PlayerSchema = new Schema({
  name: String,
  sid64: String,
  sid3: String,
  lastLog: Number,
  stats: {
    sixesStats: {
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
      },
      scoutLogCount: Number,
      soldierLogCount: Number,
      demomanLogCount: Number,
      medicLogCount: Number
    },
    highlanderStats: {
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
      pyroStats: {
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
      heavyStats: {
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
      engineerStats: {
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
      },
      sniperStats: {
        kills: Number,
        assists: Number,
        deaths: Number,
        dmg: Number,
        dpm: Number,
        teamDmgRatio: Number,
        kad: Number,
        healReceived: Number,
        headshots: Number
      },
      spyStats: {
        kills: Number,
        assists: Number,
        deaths: Number,
        dmg: Number,
        dpm: Number,
        teamDmgRatio: Number,
        kad: Number,
        healReceived: Number,
        backstabs: Number
      },
      scoutLogCount: Number,
      soldierLogCount: Number,
      pyroLogCount: Number,
      demomanLogCount: Number,
      heavyLogCount: Number,
      engineerLogCount: Number,
      medicLogCount: Number,
      sniperLogCount: Number,
      spyLogCount: Number
    }
  }
})

export default model<PlayerInterface>('Player', PlayerSchema)
