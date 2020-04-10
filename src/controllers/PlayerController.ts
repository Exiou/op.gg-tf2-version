import { Request, Response } from 'express'
import SteamID from 'steamid'
// import { LogService } from '../service/LogService'
import { TeamData } from '../vendors/LogDomain'
import { LogsTfApi } from '../vendors/logstf'

import Player from '../models/Player'

import statsCounter from './utils/statsCounter'
import { statsInitializer } from './utils/statsInitializer'

class PlayerController {
  public async updateStats (req: Request, res: Response): Promise<Response> {
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
        } = playerData

        console.log(lastLog)

        for (let i = 0; logIndex.logs[i].id > lastLog; i++) {
          const logData = await LogsTfApi.fetchLog(logIndex.logs[i].id)

          const player = logData.players[`${sid3}`]
          const numJogadores = Object.keys(logData.names).length;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const team = (logData.teams as any)[`${player.team}`] as TeamData

          
          console.log(i)
          stats  = statsCounter(stats,player,team,numJogadores)
          
        }

        const updatePlayer = await Player.updateOne({ sid64: sid64 }, { stats/*, lastLog: logIndex.logs[0].id*/ })

        return res.send(updatePlayer)
      } else {
        let playerName = ''
        let stats = statsInitializer
        const lastLog = logIndex.logs[0].id

        for (let i = 0; i < 20; i++) {
          const logData = await LogsTfApi.fetchLog(logIndex.logs[i].id)

          const player = logData.players[`${sid3}`]
          const numJogadores = Object.keys(logData.names).length;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const team = (logData.teams as any)[`${player.team}`] as TeamData

          if (playerName === '') playerName = logData.names[`${sid3}`];

          console.log(i)
          stats  = statsCounter(stats,player,team,numJogadores)
        }

        const newPlayer = await Player.create({
          stats,
          name: playerName,
          sid64,
          sid3,
          lastLog
        })

        return res.json(newPlayer)
      }
    } catch (err) {
      return res.send('Ocorreu um erro na requisição: ' + err)
    }
  }
}

export default new PlayerController()
