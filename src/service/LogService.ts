import { PlayerData } from "../vendor/LogDomain"

export enum Gamemode {
    SIX = '6V',
    HIGHLANDER = '9V',
    V4 = '4V'
}
export class LogService{
    public getMostPlayedClass(player: PlayerData) {
      return player.class_stats.sort((a, b) => a.total_time - b.total_time)[0]
    }

    public getGameMode(numberOfPlayers: number){
        if(numberOfPlayers >= 7 && numberOfPlayers <= 10) {
            return Gamemode.V4
        }
        if(numberOfPlayers >= 11 && numberOfPlayers <= 15){
            return Gamemode.SIX
        }
        if(numberOfPlayers >= 16){
            return Gamemode.HIGHLANDER
        }
        throw new Error(`Could not determine gamemode for ${numberOfPlayers} players`)
    }
}