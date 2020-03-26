import express from 'express';
import SteamID from 'steamid';
import { LogService } from '../service/LogService';
import { TeamData } from '../vendor/LogDomain';
import { LogsTfApi } from '../vendor/logstf';

export const PlayerController = (app: express.Express) => {
  app.get('/player/:sid64', async (req, res) => {
    try {
      const { sid64 } = req.params;
      const { classe = '', logs = 0, gamemode = '' } = req.query;
      const sid3 = new SteamID(sid64).getSteam3RenderedID();

      const logIndex = await LogsTfApi.fetchLogIndex(sid64)

      var playerName = ""
      const logService = new LogService()
      const logStatistics = {
        kills: 0,
        deaths: 0,
        assists: 0,
        dmg: 0,
        dapm: 0,
        ubers: 0,
        drops: 0,
        pctgDanoTime: 0,
        logs: [] as Array<number>
      }

      const logsToSerach = logIndex.logs.slice(0, logs)
      for (const log of logsToSerach) {
        const logObject = await LogsTfApi.fetchLog(log.id)
        logObject.players.

        const player = logObject.players[`${sid3}`];
        const team = (logObject.teams as any)[`${player.team}`] as TeamData;
        const numberOfPlayers = Object.keys(logObject.names).length;

        playerName = logObject.names[`${sid3}`];
        logObject.players

        const logGamemode = logService.getGameMode(numberOfPlayers)
        const mostPlayedClass = logService.getMostPlayedClass(player)
        
        if(logGamemode == gamemode && mostPlayedClass.type == classe){
           console.log(`[INFO] Processing log ${log.id} of player ${playerName} playing as ${mostPlayedClass.type}`)
           logStatistics.kills += player.kills;
           logStatistics.deaths += player.deaths;
           logStatistics.assists += player.assists;
           logStatistics.ubers += player.ubers;
           logStatistics.drops += player.drops;
           logStatistics.dmg += player.dmg;
           logStatistics.dapm += player.dapm;
           logStatistics.pctgDanoTime += (player.dmg * 100) / team.dmg;
           logStatistics.logs.push(log.id)
        } else {
          console.log(`[INFO] Skipping log ${log.id} of player ${playerName}`)
          continue
        }
      }

      const logsProcessed = logStatistics.logs.length
      const media = {
        kills: logStatistics.kills / logsProcessed,
        deaths: logStatistics.deaths / logsProcessed,
        assists: logStatistics.assists / logsProcessed,
        dmg: logStatistics.dmg / logsProcessed,
        dapm: logStatistics.dapm / logsProcessed,
        ubers: logStatistics.ubers / logsProcessed,
        drops: logStatistics.drops / logsProcessed,
        pctgDanoTime:
          Math.round((logStatistics.pctgDanoTime / logsProcessed + Number.EPSILON) * 100) / 100,
      };

      const data = {
        playerName,
        logStatistics,
        media,
        logsProcessed
      };

      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(err);
    }
  });
};
