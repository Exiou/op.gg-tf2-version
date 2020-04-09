import { Request, Response } from 'express'
import SteamID from 'steamid'
// import { LogService } from '../service/LogService'
import { TeamData } from '../vendor/LogDomain'
import { LogsTfApi } from '../vendor/logstf'

import Player from '../models/Player'

class PlayerController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const { sid64 } = req.params

      const sid3 = new SteamID(sid64).getSteam3RenderedID()

      const logIndex = await LogsTfApi.fetchLogIndex(sid64)

      console.log(logIndex.logs[0].id)

      const playerData = await Player.findOne({ sid64 }).select('stats lastLog scoutLogCount soldierLogCount demomanLogCount medicLogCount')

      if (playerData) {
        let {
          stats,
          lastLog,
          scoutLogCount,
          soldierLogCount,
          demomanLogCount,
          medicLogCount
        } = playerData

        console.log(lastLog)

        for (let i = 0; logIndex.logs[i].id > lastLog; i++) {
          const logData = await LogsTfApi.fetchLog(logIndex.logs[i].id)

          const player = logData.players[`${sid3}`]
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const team = (logData.teams as any)[`${player.team}`] as TeamData

          if (player.class_stats[0].type === 'scout') {
            stats.scoutStats.kills = ((stats.scoutStats.kills * scoutLogCount) + player.kills) / (scoutLogCount + 1) || 0
            stats.scoutStats.assists = ((stats.scoutStats.assists * scoutLogCount) + player.assists) / (scoutLogCount + 1) || 0
            stats.scoutStats.deaths = ((stats.scoutStats.deaths * scoutLogCount) + player.deaths) / (scoutLogCount + 1) || 0
            stats.scoutStats.dmg = ((stats.scoutStats.dmg * scoutLogCount) + player.dmg) / (scoutLogCount + 1) || 0
            stats.scoutStats.dpm = ((stats.scoutStats.dpm * scoutLogCount) + player.dapm) / (scoutLogCount + 1) || 0
            stats.scoutStats.teamDmgRatio = ((stats.scoutStats.teamDmgRatio * scoutLogCount) + player.dmg * 100 / team.dmg) / (scoutLogCount + 1) || 0
            stats.scoutStats.kad = ((stats.scoutStats.kad * scoutLogCount) + +player.kapd) / (scoutLogCount + 1) || 0
            stats.scoutStats.healReceived = ((stats.scoutStats.healReceived * scoutLogCount) + player.hr) / (scoutLogCount + 1) || 0
            scoutLogCount++
            console.log('scout')
          } else if (player.class_stats[0].type === 'soldier') {
            stats.soldierStats.kills = ((stats.soldierStats.kills * soldierLogCount) + player.kills) / (soldierLogCount + 1) || 0
            stats.soldierStats.assists = ((stats.soldierStats.assists * soldierLogCount) + player.assists) / (soldierLogCount + 1) || 0
            stats.soldierStats.deaths = ((stats.soldierStats.deaths * soldierLogCount) + player.deaths) / (soldierLogCount + 1) || 0
            stats.soldierStats.dmg = ((stats.soldierStats.dmg * soldierLogCount) + player.dmg) / (soldierLogCount + 1) || 0
            stats.soldierStats.dpm = ((stats.soldierStats.dpm * soldierLogCount) + player.dapm) / (soldierLogCount + 1) || 0
            stats.soldierStats.teamDmgRatio = ((stats.soldierStats.teamDmgRatio * soldierLogCount) + player.dmg * 100 / team.dmg) / (soldierLogCount + 1) || 0
            stats.soldierStats.kad = ((stats.soldierStats.kad * soldierLogCount) + +player.kapd) / (soldierLogCount + 1) || 0
            stats.soldierStats.healReceived = ((stats.soldierStats.healReceived * soldierLogCount) + player.hr) / (soldierLogCount + 1) || 0
            soldierLogCount++
            console.log('soldier')
          } else if (player.class_stats[0].type === 'demoman') {
            stats.demomanStats.kills = ((stats.demomanStats.kills * demomanLogCount) + player.kills) / (demomanLogCount + 1) || 0
            stats.demomanStats.assists = ((stats.demomanStats.assists * demomanLogCount) + player.assists) / (demomanLogCount + 1) || 0
            stats.demomanStats.deaths = ((stats.demomanStats.deaths * demomanLogCount) + player.deaths) / (demomanLogCount + 1) || 0
            stats.demomanStats.dmg = ((stats.demomanStats.dmg * demomanLogCount) + player.dmg) / (demomanLogCount + 1) || 0
            stats.demomanStats.dpm = ((stats.demomanStats.dpm * demomanLogCount) + player.dapm) / (demomanLogCount + 1) || 0
            stats.demomanStats.teamDmgRatio = ((stats.demomanStats.teamDmgRatio * demomanLogCount) + player.dmg * 100 / team.dmg) / (demomanLogCount + 1) || 0
            stats.demomanStats.kad = ((stats.demomanStats.kad * demomanLogCount) + +player.kapd) / (demomanLogCount + 1) || 0
            stats.demomanStats.healReceived = ((stats.demomanStats.healReceived * demomanLogCount) + player.hr) / (demomanLogCount + 1) || 0
            demomanLogCount++
            console.log('demoman')
          } else if (player.class_stats[0].type === 'medic') {
            stats.medicStats.kills = ((stats.medicStats.kills * medicLogCount) + player.kills) / (medicLogCount + 1) || 0
            stats.medicStats.assists = ((stats.medicStats.assists * medicLogCount) + player.assists) / (medicLogCount + 1) || 0
            stats.medicStats.deaths = ((stats.medicStats.deaths * medicLogCount) + player.deaths) / (medicLogCount + 1) || 0
            stats.medicStats.kad = ((stats.medicStats.kad * medicLogCount) + +player.kapd) / (medicLogCount + 1) || 0 || 0
            stats.medicStats.dmgTaken = ((stats.medicStats.dmgTaken * medicLogCount) + player.dt) / (medicLogCount + 1) || 0
            stats.medicStats.ubers = ((stats.medicStats.ubers * medicLogCount) + player.ubers) / (medicLogCount + 1) || 0
            stats.medicStats.drops = ((stats.medicStats.drops * medicLogCount) + player.drops) / (medicLogCount + 1) || 0
            stats.medicStats.heal = ((stats.medicStats.heal * medicLogCount) + player.heal) / (medicLogCount + 1) || 0
            /* stats.medicStats.avgTimeToBuild += player.medicstats.avgTimeToBuild
            stats.medicStats.avgUberLength += player.medicstats.avgUberLength */
            medicLogCount++
            console.log('medic')
          }
        }

        const updatePlayer = await Player.updateOne({ sid64: sid64 }, {
          'stats.scoutStats.kills': +stats.scoutStats.kills || 0,
          'stats.scoutStats.assists': +stats.scoutStats.assists || 0,
          'stats.scoutStats.deaths': +stats.scoutStats.deaths || 0,
          'stats.scoutStats.dmg': +stats.scoutStats.dmg || 0,
          'stats.scoutStats.dpm': +stats.scoutStats.dpm || 0,
          'stats.scoutStats.teamDmgRatio': +stats.scoutStats.teamDmgRatio || 0,
          'stats.scoutStats.kad': +stats.scoutStats.kad || 0,
          'stats.scoutStats.healReceived': +stats.scoutStats.healReceived || 0,
          scoutLogCount: +scoutLogCount,
          'stats.soldierStats.kills': +stats.soldierStats.kills || 0,
          'stats.soldierStats.assists': +stats.soldierStats.assists || 0,
          'stats.soldierStats.deaths': +stats.soldierStats.deaths || 0,
          'stats.soldierStats.dmg': +stats.soldierStats.dmg || 0,
          'stats.soldierStats.dpm': +stats.soldierStats.dpm || 0,
          'stats.soldierStats.teamDmgRatio': +stats.soldierStats.teamDmgRatio || 0,
          'stats.soldierStats.kad': +stats.soldierStats.kad || 0,
          'stats.soldierStats.healReceived': +stats.soldierStats.healReceived || 0,
          soldierLogCount: +soldierLogCount,
          'stats.demomanStats.kills': +stats.demomanStats.kills || 0,
          'stats.demomanStats.assists': +stats.demomanStats.assists || 0,
          'stats.demomanStats.deaths': +stats.demomanStats.deaths || 0,
          'stats.demomanStats.dmg': +stats.demomanStats.dmg || 0,
          'stats.demomanStats.dpm': +stats.demomanStats.dpm || 0,
          'stats.demomanStats.teamDmgRatio': +stats.demomanStats.teamDmgRatio || 0,
          'stats.demomanStats.kad': +stats.demomanStats.kad || 0,
          'stats.demomanStats.healReceived': +stats.demomanStats.healReceived || 0,
          demomanLogCount: +demomanLogCount,
          'stats.medicStats.kills': +stats.medicStats.kills || 0,
          'stats.medicStats.assists': +stats.medicStats.assists || 0,
          'stats.medicStats.deaths': +stats.medicStats.deaths || 0,
          'stats.medicStats.kad': +stats.medicStats.kad || 0,
          'stats.medicStats.dmgTaken': +stats.medicStats.dmgTaken || 0,
          'stats.medicStats.ubers': +stats.medicStats.ubers || 0,
          'stats.medicStats.drops': +stats.medicStats.drops || 0,
          'stats.medicStats.heal': +stats.medicStats.heal || 0,
          'stats.medicStats.avgTimeToBuild': +stats.medicStats.avgTimeToBuild || 0,
          'stats.medicStats.avgUberLength': +stats.medicStats.avgUberLength || 0,
          medicLogCount: +medicLogCount
          // lastLog: logIndex[0].id
        })

        return res.send(updatePlayer)
      } else {
        let playerName = ''
        // eslint-disable-next-line prefer-const
        let stats = {
          scoutStats: {
            kills: 0,
            assists: 0,
            deaths: 0,
            dmg: 0,
            dpm: 0,
            teamDmgRatio: 0,
            kad: 0,
            healReceived: 0
          },
          soldierStats: {
            kills: 0,
            assists: 0,
            deaths: 0,
            dmg: 0,
            dpm: 0,
            teamDmgRatio: 0,
            kad: 0,
            healReceived: 0
          },
          demomanStats: {
            kills: 0,
            assists: 0,
            deaths: 0,
            dmg: 0,
            dpm: 0,
            teamDmgRatio: 0,
            kad: 0,
            healReceived: 0
          },
          medicStats: {
            kills: 0,
            assists: 0,
            deaths: 0,
            kad: 0,
            dmgTaken: 0,
            ubers: 0,
            drops: 0,
            heal: 0,
            avgTimeToBuild: 0,
            avgUberLength: 0
          }
        }
        const lastLog = logIndex.logs[0].id
        let scoutLogCount = 0
        let soldierLogCount = 0
        let demomanLogCount = 0
        let medicLogCount = 0

        for (let i = 0; i < 20; i++) {
          const logData = await LogsTfApi.fetchLog(logIndex.logs[i].id)

          const player = logData.players[`${sid3}`]
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const team = (logData.teams as any)[`${player.team}`] as TeamData

          if (playerName === '') playerName = logData.names[`${sid3}`]

          if (player.class_stats[0].type === 'scout') {
            stats.scoutStats.kills = ((stats.scoutStats.kills * scoutLogCount) + player.kills) / (scoutLogCount + 1) || 0
            stats.scoutStats.assists = ((stats.scoutStats.assists * scoutLogCount) + player.assists) / (scoutLogCount + 1) || 0
            stats.scoutStats.deaths = ((stats.scoutStats.deaths * scoutLogCount) + player.deaths) / (scoutLogCount + 1) || 0
            stats.scoutStats.dmg = ((stats.scoutStats.dmg * scoutLogCount) + player.dmg) / (scoutLogCount + 1) || 0
            stats.scoutStats.dpm = ((stats.scoutStats.dpm * scoutLogCount) + player.dapm) / (scoutLogCount + 1) || 0
            stats.scoutStats.teamDmgRatio = ((stats.scoutStats.teamDmgRatio * scoutLogCount) + player.dmg * 100 / team.dmg) / (scoutLogCount + 1) || 0
            stats.scoutStats.kad = ((stats.scoutStats.kad * scoutLogCount) + +player.kapd) / (scoutLogCount + 1) || 0
            stats.scoutStats.healReceived = ((stats.scoutStats.healReceived * scoutLogCount) + player.hr) / (scoutLogCount + 1) || 0
            scoutLogCount++
            console.log('scout')
          } else if (player.class_stats[0].type === 'soldier') {
            stats.soldierStats.kills = ((stats.soldierStats.kills * soldierLogCount) + player.kills) / (soldierLogCount + 1) || 0
            stats.soldierStats.assists = ((stats.soldierStats.assists * soldierLogCount) + player.assists) / (soldierLogCount + 1) || 0
            stats.soldierStats.deaths = ((stats.soldierStats.deaths * soldierLogCount) + player.deaths) / (soldierLogCount + 1) || 0
            stats.soldierStats.dmg = ((stats.soldierStats.dmg * soldierLogCount) + player.dmg) / (soldierLogCount + 1) || 0
            stats.soldierStats.dpm = ((stats.soldierStats.dpm * soldierLogCount) + player.dapm) / (soldierLogCount + 1) || 0
            stats.soldierStats.teamDmgRatio = ((stats.soldierStats.teamDmgRatio * soldierLogCount) + player.dmg * 100 / team.dmg) / (soldierLogCount + 1) || 0
            stats.soldierStats.kad = ((stats.soldierStats.kad * soldierLogCount) + +player.kapd) / (soldierLogCount + 1) || 0
            stats.soldierStats.healReceived = ((stats.soldierStats.healReceived * soldierLogCount) + player.hr) / (soldierLogCount + 1) || 0
            soldierLogCount++
            console.log('soldier')
          } else if (player.class_stats[0].type === 'demoman') {
            stats.demomanStats.kills = ((stats.demomanStats.kills * demomanLogCount) + player.kills) / (demomanLogCount + 1) || 0
            stats.demomanStats.assists = ((stats.demomanStats.assists * demomanLogCount) + player.assists) / (demomanLogCount + 1) || 0
            stats.demomanStats.deaths = ((stats.demomanStats.deaths * demomanLogCount) + player.deaths) / (demomanLogCount + 1) || 0
            stats.demomanStats.dmg = ((stats.demomanStats.dmg * demomanLogCount) + player.dmg) / (demomanLogCount + 1) || 0
            stats.demomanStats.dpm = ((stats.demomanStats.dpm * demomanLogCount) + player.dapm) / (demomanLogCount + 1) || 0
            stats.demomanStats.teamDmgRatio = ((stats.demomanStats.teamDmgRatio * demomanLogCount) + player.dmg * 100 / team.dmg) / (demomanLogCount + 1) || 0
            stats.demomanStats.kad = ((stats.demomanStats.kad * demomanLogCount) + +player.kapd) / (demomanLogCount + 1) || 0
            stats.demomanStats.healReceived = ((stats.demomanStats.healReceived * demomanLogCount) + player.hr) / (demomanLogCount + 1) || 0
            demomanLogCount++
            console.log('demoman')
          } else if (player.class_stats[0].type === 'medic') {
            stats.medicStats.kills = ((stats.medicStats.kills * medicLogCount) + player.kills) / (medicLogCount + 1) || 0
            stats.medicStats.assists = ((stats.medicStats.assists * medicLogCount) + player.assists) / (medicLogCount + 1) || 0
            stats.medicStats.deaths = ((stats.medicStats.deaths * medicLogCount) + player.deaths) / (medicLogCount + 1) || 0
            stats.medicStats.kad = ((stats.medicStats.kad * medicLogCount) + +player.kapd) / (medicLogCount + 1) || 0 || 0
            stats.medicStats.dmgTaken = ((stats.medicStats.dmgTaken * medicLogCount) + player.dt) / (medicLogCount + 1) || 0
            stats.medicStats.ubers = ((stats.medicStats.ubers * medicLogCount) + player.ubers) / (medicLogCount + 1) || 0
            stats.medicStats.drops = ((stats.medicStats.drops * medicLogCount) + player.drops) / (medicLogCount + 1) || 0
            stats.medicStats.heal = ((stats.medicStats.heal * medicLogCount) + player.heal) / (medicLogCount + 1) || 0
            /* stats.medicStats.avgTimeToBuild += player.medicstats.avgTimeToBuild
            stats.medicStats.avgUberLength += player.medicstats.avgUberLength */
            medicLogCount++
            console.log('medic')
          }
        }

        const newPlayer = await Player.create({
          stats,
          name: playerName,
          sid64,
          sid3,
          lastLog,
          scoutLogCount,
          soldierLogCount,
          demomanLogCount,
          medicLogCount
        })

        return res.json(newPlayer)
      }
    } catch (err) {
      return res.send('Ocorreu um erro na requisição: ' + err)
    }
  }
}

export default new PlayerController()
