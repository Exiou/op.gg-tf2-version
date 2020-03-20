const express = require('express')
const axios = require('axios')
const SteamID = require('steamid')

const app = express()

app.use(express.json())

app.get('/player/:sid64', async (req,res) => {
    try{
        const { sid64 } = req.params
        let { classe = '', logs = 0, gamemode = '' } = req.query

        var kills = 0, deaths = 0, assists = 0, dmg = 0, dapm = 0, ubers = 0, drops = 0
            
        const a = await axios.get(`http://logs.tf/api/v1/log?player=${sid64}`)
            
            



        var contador = 0
        var playerName = ''
        var logsVerificadas = []

        for(let i = 0; i < logs;i++){
        
            const b = await axios.get(`http://logs.tf/api/v1/log/${a.data.logs[i].id}`)

            
            var sid3 = new SteamID(sid64)
            
            sid3 = sid3.getSteam3RenderedID()
            
            if(playerName == '') playerName = b.data.names[`${sid3}`]
            
            const player = b.data.players[`${sid3}`]
            const numJogadores = Object.keys(b.data.names).length

            if(gamemode = '6s'){
                if(classe == "medic" && player.class_stats[0].type == classe && (numJogadores > 11 && numJogadores < 18)){

                    kills += player.kills
                    deaths += player.deaths
                    assists += player.assists
                    dmg += player.dmg
                    dapm += player.dapm
                    ubers += player.ubers
                    drops += player.drops
                    contador++
                    logsVerificadas.push(`http://logs.tf/${a.data.logs[i].id}`)

                }else if(player.class_stats[0].type == classe && (numJogadores > 11 && numJogadores < 18)){
                    kills += player.kills
                    deaths += player.deaths
                    assists += player.assists
                    dmg += player.dmg
                    dapm += player.dapm
                    contador++
                    logsVerificadas.push(`http://logs.tf/${a.data.logs[i].id}`)
                }else{
                    logs++
                }
            }else{
                logs++
            }
        }

        const total = {
            kills,
            deaths,
            assists,
            dmg,
            dapm,
            ubers,
            drops,
        }

        const media = {
            kills: kills/contador,
            deaths: deaths/contador,
            assists: assists/contador,
            dmg: dmg/contador,
            dapm: dapm/contador,
            ubers: ubers/contador,
            drops: drops/contador
        }

        console.log(logs)

        res.json({ playerName, total, media, contador, logsVerificadas, totalLogsPesquisadas:logs })
    }catch(err){
        res.send(err)
    }

})

app.listen(3333)