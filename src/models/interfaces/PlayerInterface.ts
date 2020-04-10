import { Document } from 'mongoose'

export interface PlayerInterface extends Document {
  name: string,
  sid64: string,
  sid3: string,
  lastLog: number,
  scoutLogCount: number,
  soldierLogCount: number,
  demomanLogCount: number,
  medicLogCount: number,
  stats: Stats
}

export interface Stats {
  scoutStats: ScoutStats,
  soldierStats: SoldierStats,
  demomanStats: DemomanStats,
  medicStats: MedicClassStats
}

export interface ScoutStats {
  kills: number,
  assists: number,
  deaths: number,
  dmg: number,
  dpm: number,
  teamDmgRatio: number,
  accuracy?: number,
  kad: number,
  healReceived: number
}

export interface SoldierStats {
  kills: number,
  assists: number,
  deaths: number,
  dmg: number,
  dpm: number,
  teamDmgRatio: number,
  kad: number,
  healReceived: number
}

export interface DemomanStats {
  kills: number,
  assists: number,
  deaths: number,
  dmg: number,
  dpm: number,
  teamDmgRatio: number,
  kad: number,
  healReceived: number
}

export interface MedicClassStats {
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