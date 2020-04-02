 function statsCounter(stats,scoutLogCount,soldierLogCount,demomanLogCount,medicLogCount,player,team){
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
  return (stats,scoutLogCount,soldierLogCount,demomanLogCount,medicLogCount)
}

module.exports = statsCounter