const Player = require('../models/Player')

const axios = require('axios')
const SteamID = require('steamid')

const statsCounter = require('./utils/statsCounter')

module.exports = {
  async index(req,res) {
    try{
      const { sid64 } = req.params

      const sid3 = new SteamID(sid64).getSteam3RenderedID()

      const logIndex = (await axios.get(`http://logs.tf/api/v1/log?player=${sid64}`)).data.logs

      console.log(logIndex[0].id)

      const playerData = await Player.findOne({ sid64: sid64 }).select('stats lastLog scoutLogCount soldierLogCount demomanLogCount medicLogCount')

      if(playerData){
        
        var {
          stats,
          lastLog,
          scoutLogCount,
          soldierLogCount,
          demomanLogCount,
          medicLogCount
        } = playerData

        console.log(lastLog)
        console.log(scoutLogCount, medicLogCount)

        for(let i = 0; logIndex[i].id > lastLog;i++){
          
          const logData = await axios.get(`http://logs.tf/api/v1/log/${logIndex[i].id}`)

          const player = logData.data.players[`${sid3}`]
          const team = logData.data.teams[`${player.team}`]

          if(player.class_stats[0].type == 'scout'){
            stats.scoutStats.kills = ((stats.scoutStats.kills*scoutLogCount)+player.kills)/(scoutLogCount+1) || 0
            stats.scoutStats.assists = ((stats.scoutStats.assists*scoutLogCount)+player.assists)/(scoutLogCount+1) || 0
            stats.scoutStats.deaths = ((stats.scoutStats.deaths*scoutLogCount)+player.deaths)/(scoutLogCount+1) || 0
            stats.scoutStats.dmg = ((stats.scoutStats.dmg*scoutLogCount)+player.dmg)/(scoutLogCount+1) || 0
            stats.scoutStats.dpm = ((stats.scoutStats.dpm*scoutLogCount)+player.dapm)/(scoutLogCount+1) || 0
            stats.scoutStats.team_dmg_ratio = ((stats.scoutStats.team_dmg_ratio*scoutLogCount)+player.dmg*100/team.dmg)/(scoutLogCount+1) || 0
            stats.scoutStats.kad = ((stats.scoutStats.kad*scoutLogCount)+player.kapd)/(scoutLogCount+1) || 0
            stats.scoutStats.heal_received = ((stats.scoutStats.heal_received*scoutLogCount)+player.hr)/(scoutLogCount+1) || 0
            scoutLogCount++
            console.log('scout')
          }else if(player.class_stats[0].type == 'soldier'){
            stats.soldierStats.kills = ((stats.soldierStats.kills*soldierLogCount)+player.kills)/(soldierLogCount+1) || 0
            stats.soldierStats.assists = ((stats.soldierStats.assists*soldierLogCount)+player.assists)/(soldierLogCount+1) || 0
            stats.soldierStats.deaths = ((stats.soldierStats.deaths*soldierLogCount)+player.deaths)/(soldierLogCount+1) || 0
            stats.soldierStats.dmg = ((stats.soldierStats.dmg*soldierLogCount)+player.dmg)/(soldierLogCount+1) || 0
            stats.soldierStats.dpm = ((stats.soldierStats.dpm*soldierLogCount)+player.dapm)/(soldierLogCount+1) || 0
            stats.soldierStats.team_dmg_ratio = ((stats.soldierStats.team_dmg_ratio*soldierLogCount)+player.dmg*100/team.dmg)/(soldierLogCount+1) || 0
            stats.soldierStats.kad = ((stats.soldierStats.kad*soldierLogCount)+player.kapd)/(soldierLogCount+1) || 0
            stats.soldierStats.heal_received = ((stats.soldierStats.heal_received*soldierLogCount)+player.hr)/(soldierLogCount+1) || 0
            soldierLogCount++
            console.log('soldier')
          }else if(player.class_stats[0].type == 'demoman'){
            stats.demomanStats.kills = ((stats.demomanStats.kills*demomanLogCount)+player.kills)/(demomanLogCount+1) || 0
            stats.demomanStats.assists = ((stats.demomanStats.assists*demomanLogCount)+player.assists)/(demomanLogCount+1) || 0
            stats.demomanStats.deaths = ((stats.demomanStats.deaths*demomanLogCount)+player.deaths)/(demomanLogCount+1) || 0
            stats.demomanStats.dmg = ((stats.demomanStats.dmg*demomanLogCount)+player.dmg)/(demomanLogCount+1) || 0
            stats.demomanStats.dpm = ((stats.demomanStats.dpm*demomanLogCount)+player.dapm)/(demomanLogCount+1) || 0
            stats.demomanStats.team_dmg_ratio = ((stats.demomanStats.team_dmg_ratio*demomanLogCount)+player.dmg*100/team.dmg)/(demomanLogCount+1) || 0
            stats.demomanStats.kad = ((stats.demomanStats.kad*demomanLogCount)+player.kapd)/(demomanLogCount+1) || 0
            stats.demomanStats.heal_received = ((stats.demomanStats.heal_received*demomanLogCount)+player.hr)/(demomanLogCount+1) || 0
            demomanLogCount++
            console.log('demoman')
          }else if(player.class_stats[0].type == 'medic'){
            stats.medicStats.kills = ((stats.medicStats.kills*medicLogCount)+player.kills)/(medicLogCount+1) || 0
            stats.medicStats.assists = ((stats.medicStats.assists*medicLogCount)+player.assists)/(medicLogCount+1) || 0
            stats.medicStats.deaths = ((stats.medicStats.deaths*medicLogCount)+player.deaths)/(medicLogCount+1) || 0
            stats.medicStats.kad = ((stats.medicStats.kad*medicLogCount)+player.kapd)/(medicLogCount+1) || 0 || 0
            stats.medicStats.dmg_taken = ((stats.medicStats.dmg_taken*medicLogCount)+player.dt)/(medicLogCount+1) || 0
            stats.medicStats.ubers = ((stats.medicStats.ubers*medicLogCount)+player.ubers)/(medicLogCount+1) || 0
            stats.medicStats.drops = ((stats.medicStats.drops*medicLogCount)+player.drops)/(medicLogCount+1) || 0
            stats.medicStats.heal = ((stats.medicStats.heal*medicLogCount)+player.heal)/(medicLogCount+1) || 0
            /*stats.medicStats.avg_time_to_build += player.medicstats.avg_time_to_build
            stats.medicStats.avg_uber_length += player.medicstats.avg_uber_length*/
            medicLogCount++
            console.log('medic')
          }
        }   
        console.log(scoutLogCount, medicLogCount)
        
        const updatePlayer = await Player.updateOne({ sid64: sid64 }, {
          'stats.scoutStats.kills': +stats.scoutStats.kills || 0,
          'stats.scoutStats.assists': +stats.scoutStats.assists || 0,
          'stats.scoutStats.deaths': +stats.scoutStats.deaths || 0,
          'stats.scoutStats.dmg': +stats.scoutStats.dmg || 0,
          'stats.scoutStats.dpm': +stats.scoutStats.dpm || 0,
          'stats.scoutStats.team_dmg_ratio': +stats.scoutStats.team_dmg_ratio || 0,
          'stats.scoutStats.kad': +stats.scoutStats.kad || 0,
          'stats.scoutStats.heal_received': +stats.scoutStats.heal_received || 0,
          scoutLogCount: +scoutLogCount,
          'stats.soldierStats.kills': +stats.soldierStats.kills || 0,
          'stats.soldierStats.assists': +stats.soldierStats.assists || 0,
          'stats.soldierStats.deaths': +stats.soldierStats.deaths || 0,
          'stats.soldierStats.dmg': +stats.soldierStats.dmg || 0,
          'stats.soldierStats.dpm': +stats.soldierStats.dpm || 0,
          'stats.soldierStats.team_dmg_ratio': +stats.soldierStats.team_dmg_ratio || 0,
          'stats.soldierStats.kad': +stats.soldierStats.kad || 0,
          'stats.soldierStats.heal_received': +stats.soldierStats.heal_received || 0,
          soldierLogCount: +soldierLogCount,
          'stats.demomanStats.kills': +stats.demomanStats.kills || 0,
          'stats.demomanStats.assists': +stats.demomanStats.assists || 0,
          'stats.demomanStats.deaths': +stats.demomanStats.deaths || 0,
          'stats.demomanStats.dmg': +stats.demomanStats.dmg || 0,
          'stats.demomanStats.dpm': +stats.demomanStats.dpm || 0,
          'stats.demomanStats.team_dmg_ratio': +stats.demomanStats.team_dmg_ratio || 0,
          'stats.demomanStats.kad': +stats.demomanStats.kad || 0,
          'stats.demomanStats.heal_received': +stats.demomanStats.heal_received || 0,
          demomanLogCount: +demomanLogCount,
          'stats.medicStats.kills':  +stats.medicStats.kills || 0,
          'stats.medicStats.assists':  +stats.medicStats.assists || 0,
          'stats.medicStats.deaths':  +stats.medicStats.deaths || 0,
          'stats.medicStats.kad':  +stats.medicStats.kad || 0,
          'stats.medicStats.dmg_taken':  +stats.medicStats.dmg_taken || 0,
          'stats.medicStats.ubers':  +stats.medicStats.ubers || 0,
          'stats.medicStats.drops':  +stats.medicStats.drops || 0,
          'stats.medicStats.heal':  +stats.medicStats.heal || 0,
          'stats.medicStats.avg_time_to_build':  +stats.medicStats.avg_time_to_build || 0,
          'stats.medicStats.avg_uber_length':  +stats.medicStats.avg_uber_length || 0,
          medicLogCount: +medicLogCount
          //lastLog: logIndex[0].id
        })
        

        return res.json(updatePlayer)

      }else{

        console.log('1')

        let playerName = ''
        var stats = {
              scoutStats: {
                kills: 0,
                assists: 0,
                deaths: 0,
                dmg: 0,
                dpm: 0,
                team_dmg_ratio: 0,
                kad: 0,
                heal_received: 0
              },
              soldierStats: {
                kills: 0,
                assists: 0,
                deaths: 0,
                dmg: 0,
                dpm: 0,
                team_dmg_ratio: 0,
                kad: 0,
                heal_received: 0
              },
              demomanStats: {
                kills: 0,
                assists: 0,
                deaths: 0,
                dmg: 0,
                dpm: 0,
                team_dmg_ratio: 0,
                kad: 0,
                heal_received: 0
              },
              medicStats: {
                kills: 0,
                assists: 0,
                deaths: 0,
                kad: 0,
                dmg_taken: 0,
                ubers: 0,
                drops: 0,
                heal: 0,
                avg_time_to_build: 0,
                avg_uber_length: 0
              }
            },
            lastLog = logIndex[0].id,
            scoutLogCount = 0,
            soldierLogCount = 0,
            demomanLogCount = 0,
            medicLogCount = 0
        

        console.log('2')

        for(let i = 0; i < 20; i++){
          const logData = await axios.get(`http://logs.tf/api/v1/log/${logIndex[i].id}`)

          const player = logData.data.players[`${sid3}`]
          const team = logData.data.teams[`${player.team}`]

          if(playerName == '') playerName = logData.data.names[`${sid3}`]

          if(player.class_stats[0].type == 'scout'){
            stats.scoutStats.kills = ((stats.scoutStats.kills*scoutLogCount)+player.kills)/(scoutLogCount+1) || 0
            stats.scoutStats.assists = ((stats.scoutStats.assists*scoutLogCount)+player.assists)/(scoutLogCount+1) || 0
            stats.scoutStats.deaths = ((stats.scoutStats.deaths*scoutLogCount)+player.deaths)/(scoutLogCount+1) || 0
            stats.scoutStats.dmg = ((stats.scoutStats.dmg*scoutLogCount)+player.dmg)/(scoutLogCount+1) || 0
            stats.scoutStats.dpm = ((stats.scoutStats.dpm*scoutLogCount)+player.dapm)/(scoutLogCount+1) || 0
            stats.scoutStats.team_dmg_ratio = ((stats.scoutStats.team_dmg_ratio*scoutLogCount)+player.dmg*100/team.dmg)/(scoutLogCount+1) || 0
            stats.scoutStats.kad = ((stats.scoutStats.kad*scoutLogCount)+player.kapd)/(scoutLogCount+1) || 0
            stats.scoutStats.heal_received = ((stats.scoutStats.heal_received*scoutLogCount)+player.hr)/(scoutLogCount+1) || 0
            scoutLogCount++
            console.log('scout')
          }else if(player.class_stats[0].type == 'soldier'){
            stats.soldierStats.kills = ((stats.soldierStats.kills*soldierLogCount)+player.kills)/(soldierLogCount+1) || 0
            stats.soldierStats.assists = ((stats.soldierStats.assists*soldierLogCount)+player.assists)/(soldierLogCount+1) || 0
            stats.soldierStats.deaths = ((stats.soldierStats.deaths*soldierLogCount)+player.deaths)/(soldierLogCount+1) || 0
            stats.soldierStats.dmg = ((stats.soldierStats.dmg*soldierLogCount)+player.dmg)/(soldierLogCount+1) || 0
            stats.soldierStats.dpm = ((stats.soldierStats.dpm*soldierLogCount)+player.dapm)/(soldierLogCount+1) || 0
            stats.soldierStats.team_dmg_ratio = ((stats.soldierStats.team_dmg_ratio*soldierLogCount)+player.dmg*100/team.dmg)/(soldierLogCount+1) || 0
            stats.soldierStats.kad = ((stats.soldierStats.kad*soldierLogCount)+player.kapd)/(soldierLogCount+1) || 0
            stats.soldierStats.heal_received = ((stats.soldierStats.heal_received*soldierLogCount)+player.hr)/(soldierLogCount+1) || 0
            soldierLogCount++
            console.log('soldier')
          }else if(player.class_stats[0].type == 'demoman'){
            stats.demomanStats.kills = ((stats.demomanStats.kills*demomanLogCount)+player.kills)/(demomanLogCount+1) || 0
            stats.demomanStats.assists = ((stats.demomanStats.assists*demomanLogCount)+player.assists)/(demomanLogCount+1) || 0
            stats.demomanStats.deaths = ((stats.demomanStats.deaths*demomanLogCount)+player.deaths)/(demomanLogCount+1) || 0
            stats.demomanStats.dmg = ((stats.demomanStats.dmg*demomanLogCount)+player.dmg)/(demomanLogCount+1) || 0
            stats.demomanStats.dpm = ((stats.demomanStats.dpm*demomanLogCount)+player.dapm)/(demomanLogCount+1) || 0
            stats.demomanStats.team_dmg_ratio = ((stats.demomanStats.team_dmg_ratio*demomanLogCount)+player.dmg*100/team.dmg)/(demomanLogCount+1) || 0
            stats.demomanStats.kad = ((stats.demomanStats.kad*demomanLogCount)+player.kapd)/(demomanLogCount+1) || 0
            stats.demomanStats.heal_received = ((stats.demomanStats.heal_received*demomanLogCount)+player.hr)/(demomanLogCount+1) || 0
            demomanLogCount++
            console.log('demoman')
          }else if(player.class_stats[0].type == 'medic'){
            stats.medicStats.kills = ((stats.medicStats.kills*medicLogCount)+player.kills)/(medicLogCount+1) || 0
            stats.medicStats.assists = ((stats.medicStats.assists*medicLogCount)+player.assists)/(medicLogCount+1) || 0
            stats.medicStats.deaths = ((stats.medicStats.deaths*medicLogCount)+player.deaths)/(medicLogCount+1) || 0
            stats.medicStats.kad = ((stats.medicStats.kad*medicLogCount)+player.kapd)/(medicLogCount+1) || 0 || 0
            stats.medicStats.dmg_taken = ((stats.medicStats.dmg_taken*medicLogCount)+player.dt)/(medicLogCount+1) || 0
            stats.medicStats.ubers = ((stats.medicStats.ubers*medicLogCount)+player.ubers)/(medicLogCount+1) || 0
            stats.medicStats.drops = ((stats.medicStats.drops*medicLogCount)+player.drops)/(medicLogCount+1) || 0
            stats.medicStats.heal = ((stats.medicStats.heal*medicLogCount)+player.heal)/(medicLogCount+1) || 0
            /*stats.medicStats.avg_time_to_build += player.medicstats.avg_time_to_build
            stats.medicStats.avg_uber_length += player.medicstats.avg_uber_length*/
            medicLogCount++
            console.log('medic')
          }
          console.log(i)
        }

        console.log('3')

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

        console.log('4')

        return res.json(newPlayer)
      }

    }catch(err){
      return res.send('Ocorreu um erro na requisição: ' + err)
    }
  }
}
