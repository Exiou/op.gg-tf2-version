export enum Gamemode {
    SIX = '6V',
    HIGHLANDER = '9V',
    V4 = '4V',
    ULTIDUO = '2V'
}
export class LogService{

    public getGameMode(numberOfPlayers: number){
        if(numberOfPlayers >= 4 && numberOfPlayers <= 9) {
            return Gamemode.ULTIDUO
        }
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