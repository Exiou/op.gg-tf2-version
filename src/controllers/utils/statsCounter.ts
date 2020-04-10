import { PlayerData, TeamData } from '../../vendors/LogDomain'
import { Stats } from '../../models/interfaces/PlayerInterface'
import { LogService } from '../../services/LogService'

const logService = new LogService()

function statsCounter(stats: Stats, player: PlayerData, team: TeamData, numJogadores: number){
  const logGamemode = logService.getGameMode(numJogadores)

  console.log(logGamemode)

  if(logGamemode === '6V'){
    let sixesStats = stats.sixesStats
    if (player.class_stats[0].type === 'scout') {
      sixesStats.scoutStats.kills = ((sixesStats.scoutStats.kills * sixesStats.scoutLogCount) + player.kills) / (sixesStats.scoutLogCount + 1) || 0
      sixesStats.scoutStats.assists = ((sixesStats.scoutStats.assists * sixesStats.scoutLogCount) + player.assists) / (sixesStats.scoutLogCount + 1) || 0
      sixesStats.scoutStats.deaths = ((sixesStats.scoutStats.deaths * sixesStats.scoutLogCount) + player.deaths) / (sixesStats.scoutLogCount + 1) || 0
      sixesStats.scoutStats.dmg = ((sixesStats.scoutStats.dmg * sixesStats.scoutLogCount) + player.dmg) / (sixesStats.scoutLogCount + 1) || 0
      sixesStats.scoutStats.dpm = ((sixesStats.scoutStats.dpm * sixesStats.scoutLogCount) + player.dapm) / (sixesStats.scoutLogCount + 1) || 0
      sixesStats.scoutStats.teamDmgRatio = ((sixesStats.scoutStats.teamDmgRatio * sixesStats.scoutLogCount) + player.dmg * 100 / team.dmg) / (sixesStats.scoutLogCount + 1) || 0
      sixesStats.scoutStats.kad = ((sixesStats.scoutStats.kad * sixesStats.scoutLogCount) + +player.kapd) / (sixesStats.scoutLogCount + 1) || 0
      sixesStats.scoutStats.healReceived = ((sixesStats.scoutStats.healReceived * sixesStats.scoutLogCount) + player.hr) / (sixesStats.scoutLogCount + 1) || 0
      sixesStats.scoutLogCount++
      console.log('scout')
    } else if (player.class_stats[0].type === 'soldier') {
      sixesStats.soldierStats.kills = ((sixesStats.soldierStats.kills * sixesStats.soldierLogCount) + player.kills) / (sixesStats.soldierLogCount + 1) || 0
      sixesStats.soldierStats.assists = ((sixesStats.soldierStats.assists * sixesStats.soldierLogCount) + player.assists) / (sixesStats.soldierLogCount + 1) || 0
      sixesStats.soldierStats.deaths = ((sixesStats.soldierStats.deaths * sixesStats.soldierLogCount) + player.deaths) / (sixesStats.soldierLogCount + 1) || 0
      sixesStats.soldierStats.dmg = ((sixesStats.soldierStats.dmg * sixesStats.soldierLogCount) + player.dmg) / (sixesStats.soldierLogCount + 1) || 0
      sixesStats.soldierStats.dpm = ((sixesStats.soldierStats.dpm * sixesStats.soldierLogCount) + player.dapm) / (sixesStats.soldierLogCount + 1) || 0
      sixesStats.soldierStats.teamDmgRatio = ((sixesStats.soldierStats.teamDmgRatio * sixesStats.soldierLogCount) + player.dmg * 100 / team.dmg) / (sixesStats.soldierLogCount + 1) || 0
      sixesStats.soldierStats.kad = ((sixesStats.soldierStats.kad * sixesStats.soldierLogCount) + +player.kapd) / (sixesStats.soldierLogCount + 1) || 0
      sixesStats.soldierStats.healReceived = ((sixesStats.soldierStats.healReceived * sixesStats.soldierLogCount) + player.hr) / (sixesStats.soldierLogCount + 1) || 0
      sixesStats.soldierLogCount++
      console.log('soldier')
    } else if (player.class_stats[0].type === 'demoman') {
      sixesStats.demomanStats.kills = ((sixesStats.demomanStats.kills * sixesStats.demomanLogCount) + player.kills) / (sixesStats.demomanLogCount + 1) || 0
      sixesStats.demomanStats.assists = ((sixesStats.demomanStats.assists * sixesStats.demomanLogCount) + player.assists) / (sixesStats.demomanLogCount + 1) || 0
      sixesStats.demomanStats.deaths = ((sixesStats.demomanStats.deaths * sixesStats.demomanLogCount) + player.deaths) / (sixesStats.demomanLogCount + 1) || 0
      sixesStats.demomanStats.dmg = ((sixesStats.demomanStats.dmg * sixesStats.demomanLogCount) + player.dmg) / (sixesStats.demomanLogCount + 1) || 0
      sixesStats.demomanStats.dpm = ((sixesStats.demomanStats.dpm * sixesStats.demomanLogCount) + player.dapm) / (sixesStats.demomanLogCount + 1) || 0
      sixesStats.demomanStats.teamDmgRatio = ((sixesStats.demomanStats.teamDmgRatio * sixesStats.demomanLogCount) + player.dmg * 100 / team.dmg) / (sixesStats.demomanLogCount + 1) || 0
      sixesStats.demomanStats.kad = ((sixesStats.demomanStats.kad * sixesStats.demomanLogCount) + +player.kapd) / (sixesStats.demomanLogCount + 1) || 0
      sixesStats.demomanStats.healReceived = ((sixesStats.demomanStats.healReceived * sixesStats.demomanLogCount) + player.hr) / (sixesStats.demomanLogCount + 1) || 0
      sixesStats.demomanLogCount++
      console.log('demoman')
    } else if (player.class_stats[0].type === 'medic') {
      sixesStats.medicStats.kills = ((sixesStats.medicStats.kills * sixesStats.medicLogCount) + player.kills) / (sixesStats.medicLogCount + 1) || 0
      sixesStats.medicStats.assists = ((sixesStats.medicStats.assists * sixesStats.medicLogCount) + player.assists) / (sixesStats.medicLogCount + 1) || 0
      sixesStats.medicStats.deaths = ((sixesStats.medicStats.deaths * sixesStats.medicLogCount) + player.deaths) / (sixesStats.medicLogCount + 1) || 0
      sixesStats.medicStats.kad = ((sixesStats.medicStats.kad * sixesStats.medicLogCount) + +player.kapd) / (sixesStats.medicLogCount + 1) || 0 || 0
      sixesStats.medicStats.dmgTaken = ((sixesStats.medicStats.dmgTaken * sixesStats.medicLogCount) + player.dt) / (sixesStats.medicLogCount + 1) || 0
      sixesStats.medicStats.ubers = ((sixesStats.medicStats.ubers * sixesStats.medicLogCount) + player.ubers) / (sixesStats.medicLogCount + 1) || 0
      sixesStats.medicStats.drops = ((sixesStats.medicStats.drops * sixesStats.medicLogCount) + player.drops) / (sixesStats.medicLogCount + 1) || 0
      sixesStats.medicStats.heal = ((sixesStats.medicStats.heal * sixesStats.medicLogCount) + player.heal) / (sixesStats.medicLogCount + 1) || 0
      /* stats.medicStats.avgTimeToBuild += player.medicstats.avgTimeToBuild
      stats.medicStats.avgUberLength += player.medicstats.avgUberLength */
      sixesStats.medicLogCount++
      console.log('medic')
    }
  }else if (logGamemode === '9V'){
    let highlanderStats = stats.highlanderStats
    if (player.class_stats[0].type === 'scout') {
      highlanderStats.scoutStats.kills = ((highlanderStats.scoutStats.kills * highlanderStats.scoutLogCount) + player.kills) / (highlanderStats.scoutLogCount + 1) || 0
      highlanderStats.scoutStats.assists = ((highlanderStats.scoutStats.assists * highlanderStats.scoutLogCount) + player.assists) / (highlanderStats.scoutLogCount + 1) || 0
      highlanderStats.scoutStats.deaths = ((highlanderStats.scoutStats.deaths * highlanderStats.scoutLogCount) + player.deaths) / (highlanderStats.scoutLogCount + 1) || 0
      highlanderStats.scoutStats.dmg = ((highlanderStats.scoutStats.dmg * highlanderStats.scoutLogCount) + player.dmg) / (highlanderStats.scoutLogCount + 1) || 0
      highlanderStats.scoutStats.dpm = ((highlanderStats.scoutStats.dpm * highlanderStats.scoutLogCount) + player.dapm) / (highlanderStats.scoutLogCount + 1) || 0
      highlanderStats.scoutStats.teamDmgRatio = ((highlanderStats.scoutStats.teamDmgRatio * highlanderStats.scoutLogCount) + player.dmg * 100 / team.dmg) / (highlanderStats.scoutLogCount + 1) || 0
      highlanderStats.scoutStats.kad = ((highlanderStats.scoutStats.kad * highlanderStats.scoutLogCount) + +player.kapd) / (highlanderStats.scoutLogCount + 1) || 0
      highlanderStats.scoutStats.healReceived = ((highlanderStats.scoutStats.healReceived * highlanderStats.scoutLogCount) + player.hr) / (highlanderStats.scoutLogCount + 1) || 0
      highlanderStats.scoutLogCount++
      console.log('scout')
    } else if (player.class_stats[0].type === 'soldier') {
      highlanderStats.soldierStats.kills = ((highlanderStats.soldierStats.kills * highlanderStats.soldierLogCount) + player.kills) / (highlanderStats.soldierLogCount + 1) || 0
      highlanderStats.soldierStats.assists = ((highlanderStats.soldierStats.assists * highlanderStats.soldierLogCount) + player.assists) / (highlanderStats.soldierLogCount + 1) || 0
      highlanderStats.soldierStats.deaths = ((highlanderStats.soldierStats.deaths * highlanderStats.soldierLogCount) + player.deaths) / (highlanderStats.soldierLogCount + 1) || 0
      highlanderStats.soldierStats.dmg = ((highlanderStats.soldierStats.dmg * highlanderStats.soldierLogCount) + player.dmg) / (highlanderStats.soldierLogCount + 1) || 0
      highlanderStats.soldierStats.dpm = ((highlanderStats.soldierStats.dpm * highlanderStats.soldierLogCount) + player.dapm) / (highlanderStats.soldierLogCount + 1) || 0
      highlanderStats.soldierStats.teamDmgRatio = ((highlanderStats.soldierStats.teamDmgRatio * highlanderStats.soldierLogCount) + player.dmg * 100 / team.dmg) / (highlanderStats.soldierLogCount + 1) || 0
      highlanderStats.soldierStats.kad = ((highlanderStats.soldierStats.kad * highlanderStats.soldierLogCount) + +player.kapd) / (highlanderStats.soldierLogCount + 1) || 0
      highlanderStats.soldierStats.healReceived = ((highlanderStats.soldierStats.healReceived * highlanderStats.soldierLogCount) + player.hr) / (highlanderStats.soldierLogCount + 1) || 0
      highlanderStats.soldierLogCount++
      console.log('soldier')
    }else if (player.class_stats[0].type === 'pyro') {
      highlanderStats.pyroStats.kills = ((highlanderStats.pyroStats.kills * highlanderStats.pyroLogCount) + player.kills) / (highlanderStats.pyroLogCount + 1) || 0
      highlanderStats.pyroStats.assists = ((highlanderStats.pyroStats.assists * highlanderStats.pyroLogCount) + player.assists) / (highlanderStats.pyroLogCount + 1) || 0
      highlanderStats.pyroStats.deaths = ((highlanderStats.pyroStats.deaths * highlanderStats.pyroLogCount) + player.deaths) / (highlanderStats.pyroLogCount + 1) || 0
      highlanderStats.pyroStats.dmg = ((highlanderStats.pyroStats.dmg * highlanderStats.pyroLogCount) + player.dmg) / (highlanderStats.pyroLogCount + 1) || 0
      highlanderStats.pyroStats.dpm = ((highlanderStats.pyroStats.dpm * highlanderStats.pyroLogCount) + player.dapm) / (highlanderStats.pyroLogCount + 1) || 0
      highlanderStats.pyroStats.teamDmgRatio = ((highlanderStats.pyroStats.teamDmgRatio * highlanderStats.pyroLogCount) + player.dmg * 100 / team.dmg) / (highlanderStats.pyroLogCount + 1) || 0
      highlanderStats.pyroStats.kad = ((highlanderStats.pyroStats.kad * highlanderStats.pyroLogCount) + +player.kapd) / (highlanderStats.pyroLogCount + 1) || 0
      highlanderStats.pyroStats.healReceived = ((highlanderStats.pyroStats.healReceived * highlanderStats.pyroLogCount) + player.hr) / (highlanderStats.pyroLogCount + 1) || 0
      highlanderStats.pyroLogCount++
      console.log('pyro')
    } else if (player.class_stats[0].type === 'demoman') {
      highlanderStats.demomanStats.kills = ((highlanderStats.demomanStats.kills * highlanderStats.demomanLogCount) + player.kills) / (highlanderStats.demomanLogCount + 1) || 0
      highlanderStats.demomanStats.assists = ((highlanderStats.demomanStats.assists * highlanderStats.demomanLogCount) + player.assists) / (highlanderStats.demomanLogCount + 1) || 0
      highlanderStats.demomanStats.deaths = ((highlanderStats.demomanStats.deaths * highlanderStats.demomanLogCount) + player.deaths) / (highlanderStats.demomanLogCount + 1) || 0
      highlanderStats.demomanStats.dmg = ((highlanderStats.demomanStats.dmg * highlanderStats.demomanLogCount) + player.dmg) / (highlanderStats.demomanLogCount + 1) || 0
      highlanderStats.demomanStats.dpm = ((highlanderStats.demomanStats.dpm * highlanderStats.demomanLogCount) + player.dapm) / (highlanderStats.demomanLogCount + 1) || 0
      highlanderStats.demomanStats.teamDmgRatio = ((highlanderStats.demomanStats.teamDmgRatio * highlanderStats.demomanLogCount) + player.dmg * 100 / team.dmg) / (highlanderStats.demomanLogCount + 1) || 0
      highlanderStats.demomanStats.kad = ((highlanderStats.demomanStats.kad * highlanderStats.demomanLogCount) + +player.kapd) / (highlanderStats.demomanLogCount + 1) || 0
      highlanderStats.demomanStats.healReceived = ((highlanderStats.demomanStats.healReceived * highlanderStats.demomanLogCount) + player.hr) / (highlanderStats.demomanLogCount + 1) || 0
      highlanderStats.demomanLogCount++
      console.log('demoman')
    }else if (player.class_stats[0].type === 'heavyweapons') {
      highlanderStats.heavyStats.kills = ((highlanderStats.heavyStats.kills * highlanderStats.heavyLogCount) + player.kills) / (highlanderStats.heavyLogCount + 1) || 0
      highlanderStats.heavyStats.assists = ((highlanderStats.heavyStats.assists * highlanderStats.heavyLogCount) + player.assists) / (highlanderStats.heavyLogCount + 1) || 0
      highlanderStats.heavyStats.deaths = ((highlanderStats.heavyStats.deaths * highlanderStats.heavyLogCount) + player.deaths) / (highlanderStats.heavyLogCount + 1) || 0
      highlanderStats.heavyStats.dmg = ((highlanderStats.heavyStats.dmg * highlanderStats.heavyLogCount) + player.dmg) / (highlanderStats.heavyLogCount + 1) || 0
      highlanderStats.heavyStats.dpm = ((highlanderStats.heavyStats.dpm * highlanderStats.heavyLogCount) + player.dapm) / (highlanderStats.heavyLogCount + 1) || 0
      highlanderStats.heavyStats.teamDmgRatio = ((highlanderStats.heavyStats.teamDmgRatio * highlanderStats.heavyLogCount) + player.dmg * 100 / team.dmg) / (highlanderStats.heavyLogCount + 1) || 0
      highlanderStats.heavyStats.kad = ((highlanderStats.heavyStats.kad * highlanderStats.heavyLogCount) + +player.kapd) / (highlanderStats.heavyLogCount + 1) || 0
      highlanderStats.heavyStats.healReceived = ((highlanderStats.heavyStats.healReceived * highlanderStats.heavyLogCount) + player.hr) / (highlanderStats.heavyLogCount + 1) || 0
      highlanderStats.heavyLogCount++
      console.log('heavy')
    }else if (player.class_stats[0].type === 'engineer') {
      highlanderStats.engineerStats.kills = ((highlanderStats.engineerStats.kills * highlanderStats.engineerLogCount) + player.kills) / (highlanderStats.engineerLogCount + 1) || 0
      highlanderStats.engineerStats.assists = ((highlanderStats.engineerStats.assists * highlanderStats.engineerLogCount) + player.assists) / (highlanderStats.engineerLogCount + 1) || 0
      highlanderStats.engineerStats.deaths = ((highlanderStats.engineerStats.deaths * highlanderStats.engineerLogCount) + player.deaths) / (highlanderStats.engineerLogCount + 1) || 0
      highlanderStats.engineerStats.dmg = ((highlanderStats.engineerStats.dmg * highlanderStats.engineerLogCount) + player.dmg) / (highlanderStats.engineerLogCount + 1) || 0
      highlanderStats.engineerStats.dpm = ((highlanderStats.engineerStats.dpm * highlanderStats.engineerLogCount) + player.dapm) / (highlanderStats.engineerLogCount + 1) || 0
      highlanderStats.engineerStats.teamDmgRatio = ((highlanderStats.engineerStats.teamDmgRatio * highlanderStats.engineerLogCount) + player.dmg * 100 / team.dmg) / (highlanderStats.engineerLogCount + 1) || 0
      highlanderStats.engineerStats.kad = ((highlanderStats.engineerStats.kad * highlanderStats.engineerLogCount) + +player.kapd) / (highlanderStats.engineerLogCount + 1) || 0
      highlanderStats.engineerStats.healReceived = ((highlanderStats.engineerStats.healReceived * highlanderStats.engineerLogCount) + player.hr) / (highlanderStats.engineerLogCount + 1) || 0
      highlanderStats.engineerLogCount++
      console.log('engineer')
    } else if (player.class_stats[0].type === 'medic') {
      highlanderStats.medicStats.kills = ((highlanderStats.medicStats.kills * highlanderStats.medicLogCount) + player.kills) / (highlanderStats.medicLogCount + 1) || 0
      highlanderStats.medicStats.assists = ((highlanderStats.medicStats.assists * highlanderStats.medicLogCount) + player.assists) / (highlanderStats.medicLogCount + 1) || 0
      highlanderStats.medicStats.deaths = ((highlanderStats.medicStats.deaths * highlanderStats.medicLogCount) + player.deaths) / (highlanderStats.medicLogCount + 1) || 0
      highlanderStats.medicStats.kad = ((highlanderStats.medicStats.kad * highlanderStats.medicLogCount) + +player.kapd) / (highlanderStats.medicLogCount + 1) || 0 || 0
      highlanderStats.medicStats.dmgTaken = ((highlanderStats.medicStats.dmgTaken * highlanderStats.medicLogCount) + player.dt) / (highlanderStats.medicLogCount + 1) || 0
      highlanderStats.medicStats.ubers = ((highlanderStats.medicStats.ubers * highlanderStats.medicLogCount) + player.ubers) / (highlanderStats.medicLogCount + 1) || 0
      highlanderStats.medicStats.drops = ((highlanderStats.medicStats.drops * highlanderStats.medicLogCount) + player.drops) / (highlanderStats.medicLogCount + 1) || 0
      highlanderStats.medicStats.heal = ((highlanderStats.medicStats.heal * highlanderStats.medicLogCount) + player.heal) / (highlanderStats.medicLogCount + 1) || 0
      /* stats.medicStats.avgTimeToBuild += player.medicstats.avgTimeToBuild
      stats.medicStats.avgUberLength += player.medicstats.avgUberLength */
      highlanderStats.medicLogCount++
      console.log('medic')
    } else if (player.class_stats[0].type === 'sniper') {
      highlanderStats.sniperStats.kills = ((highlanderStats.sniperStats.kills * highlanderStats.sniperLogCount) + player.kills) / (highlanderStats.sniperLogCount + 1) || 0
      highlanderStats.sniperStats.assists = ((highlanderStats.sniperStats.assists * highlanderStats.sniperLogCount) + player.assists) / (highlanderStats.sniperLogCount + 1) || 0
      highlanderStats.sniperStats.deaths = ((highlanderStats.sniperStats.deaths * highlanderStats.sniperLogCount) + player.deaths) / (highlanderStats.sniperLogCount + 1) || 0
      highlanderStats.sniperStats.dmg = ((highlanderStats.sniperStats.dmg * highlanderStats.sniperLogCount) + player.dmg) / (highlanderStats.sniperLogCount + 1) || 0
      highlanderStats.sniperStats.dpm = ((highlanderStats.sniperStats.dpm * highlanderStats.sniperLogCount) + player.dapm) / (highlanderStats.sniperLogCount + 1) || 0
      highlanderStats.sniperStats.teamDmgRatio = ((highlanderStats.sniperStats.teamDmgRatio * highlanderStats.sniperLogCount) + player.dmg * 100 / team.dmg) / (highlanderStats.sniperLogCount + 1) || 0
      highlanderStats.sniperStats.kad = ((highlanderStats.sniperStats.kad * highlanderStats.sniperLogCount) + +player.kapd) / (highlanderStats.sniperLogCount + 1) || 0
      highlanderStats.sniperStats.healReceived = ((highlanderStats.sniperStats.healReceived * highlanderStats.sniperLogCount) + player.hr) / (highlanderStats.sniperLogCount + 1) || 0
      highlanderStats.sniperStats.headshots = ((highlanderStats.sniperStats.headshots * highlanderStats.sniperLogCount) + player.headshots) / (highlanderStats.sniperLogCount + 1) || 0
      highlanderStats.sniperLogCount++
      console.log('sniper')
    } else if (player.class_stats[0].type === 'spy') {
      highlanderStats.spyStats.kills = ((highlanderStats.spyStats.kills * highlanderStats.spyLogCount) + player.kills) / (highlanderStats.spyLogCount + 1) || 0
      highlanderStats.spyStats.assists = ((highlanderStats.spyStats.assists * highlanderStats.spyLogCount) + player.assists) / (highlanderStats.spyLogCount + 1) || 0
      highlanderStats.spyStats.deaths = ((highlanderStats.spyStats.deaths * highlanderStats.spyLogCount) + player.deaths) / (highlanderStats.spyLogCount + 1) || 0
      highlanderStats.spyStats.dmg = ((highlanderStats.spyStats.dmg * highlanderStats.spyLogCount) + player.dmg) / (highlanderStats.spyLogCount + 1) || 0
      highlanderStats.spyStats.dpm = ((highlanderStats.spyStats.dpm * highlanderStats.spyLogCount) + player.dapm) / (highlanderStats.spyLogCount + 1) || 0
      highlanderStats.spyStats.teamDmgRatio = ((highlanderStats.spyStats.teamDmgRatio * highlanderStats.spyLogCount) + player.dmg * 100 / team.dmg) / (highlanderStats.spyLogCount + 1) || 0
      highlanderStats.spyStats.kad = ((highlanderStats.spyStats.kad * highlanderStats.spyLogCount) + +player.kapd) / (highlanderStats.spyLogCount + 1) || 0
      highlanderStats.spyStats.healReceived = ((highlanderStats.spyStats.healReceived * highlanderStats.spyLogCount) + player.hr) / (highlanderStats.spyLogCount + 1) || 0
      highlanderStats.spyStats.backstabs = ((highlanderStats.spyStats.backstabs * highlanderStats.spyLogCount) + player.backstabs) / (highlanderStats.spyLogCount + 1) || 0
      highlanderStats.spyLogCount++
      console.log('spy')
    }
  }
  return stats 
}

export default statsCounter