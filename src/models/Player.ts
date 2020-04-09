import { Schema, model, Document } from 'mongoose'

interface PlayerInterface extends Document {
  name: string,
  sid64: string,
  sid3: string,
  lastLog: number,
  scoutLogCount: number,
  soldierLogCount: number,
  demomanLogCount: number,
  medicLogCount: number,
  stats: {
    scoutStats: {
      kills: number,
      assists: number,
      deaths: number,
      dmg: number,
      dpm: number,
      teamDmgRatio: number,
      accuracy: number,
      kad: number,
      healReceived: number
    },
    soldierStats: {
      kills: number,
      assists: number,
      deaths: number,
      dmg: number,
      dpm: number,
      teamDmgRatio: number,
      kad: number,
      healReceived: number
    },
    demomanStats: {
      kills: number,
      assists: number,
      deaths: number,
      dmg: number,
      dpm: number,
      teamDmgRatio: number,
      kad: number,
      healReceived: number
    },
    medicStats: {
      kills: number,
      assists: number,
      deaths: number,
      kad: number,
      dmgTaken: number,
      ubers: number,
      drops: number,
      heal: number,
      avgTimeToBuild: number,
      avgUberLength: number
    }
  }
}

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
