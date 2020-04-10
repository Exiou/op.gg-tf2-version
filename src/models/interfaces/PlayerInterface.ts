import { Document } from 'mongoose'

export interface PlayerInterface extends Document {
  name: string,
  sid64: string,
  sid3: string,
  lastLog: number,
  stats: Stats
}

export interface Stats {
  sixesStats: SixesStats,
  highlanderStats: HighlanderStats
}

export interface SixesStats {
  scoutStats: CombatClassStats,
  soldierStats: CombatClassStats,
  demomanStats: CombatClassStats,
  medicStats: MedicClassStats,
  scoutLogCount: number,
  soldierLogCount: number,
  demomanLogCount: number,
  medicLogCount: number
}

export interface HighlanderStats {
  scoutStats: CombatClassStats,
  soldierStats: CombatClassStats,
  pyroStats: CombatClassStats,
  demomanStats: CombatClassStats,
  heavyStats: CombatClassStats,
  engineerStats: CombatClassStats,
  medicStats: MedicClassStats,
  sniperStats: SniperClassStats,
  spyStats: SpyClassStats,
  scoutLogCount: number,
  soldierLogCount: number,
  pyroLogCount: number,
  demomanLogCount: number,
  heavyLogCount: number,
  engineerLogCount: number,
  medicLogCount: number,
  sniperLogCount: number,
  spyLogCount: number
}
export interface CombatClassStats {
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

export interface SniperClassStats{
  kills: number,
  assists: number,
  deaths: number,
  dmg: number,
  dpm: number,
  teamDmgRatio: number,
  kad: number,
  healReceived: number,
  headshots: number
}

export interface SpyClassStats{
  kills: number,
  assists: number,
  deaths: number,
  dmg: number,
  dpm: number,
  teamDmgRatio: number,
  kad: number,
  healReceived: number,
  backstabs: number
}