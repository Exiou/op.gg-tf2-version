const express = require('express')
const axios = require('axios')
const SteamID = require('steamid')

const app = express()

app.use(express.json())

app.get('/player/:sid64', async (req,res) => {
    try{
        const { sid64 } = req.params
        var { classe = '', logs = 0, gamemode = '' } = req.query

        var kills = 0
            , deaths = 0
            , assists = 0
            , dmg = 0
            , dapm = 0
            , ubers = 0
            , drops = 0
            , pctgDanoTime = 0
            
        var contador = 0
            , playerName = ''
            , logsVerificadas = []

        const logIndex = await axios.get(`http://logs.tf/api/v1/log?player=${sid64}`)


        for(let i = 0; i < logs;i++){
        
            const log = await axios.get(`http://logs.tf/api/v1/log/${logIndex.data.logs[i].id}`)
            
            var sid3 = new SteamID(sid64).getSteam3RenderedID()

            const player = log.data.players[`${sid3}`]
            const name = log.data.names
            const team = log.data.teams[`${player.team}`]

            if(playerName == '') playerName = name[`${sid3}`]
            
            const numJogadores = Object.keys(name).length

            if(gamemode == '6s'){
                if(classe == "medic" && player.class_stats[0].type == classe && (numJogadores > 11 && numJogadores < 18)){

                    kills += player.kills
                    deaths += player.deaths
                    assists += player.assists
                    ubers += player.ubers
                    drops += player.drops
                    contador++
                    logsVerificadas.push(`http://logs.tf/${logIndex.data.logs[i].id}`)

                }else if(player.class_stats[0].type == classe && (numJogadores > 11 && numJogadores < 18)){
                    kills += player.kills
                    deaths += player.deaths
                    assists += player.assists
                    dmg += player.dmg
                    dapm += player.dapm
                    pctgDanoTime += player.dmg*100/team.dmg
                    contador++
                    logsVerificadas.push(`http://logs.tf/${logIndex.data.logs[i].id}`)
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
            drops: drops/contador,
            pctgDanoTime: Math.round((pctgDanoTime/contador + Number.EPSILON) * 100) / 100
        }

        const data = { 
            playerName,
            total,
            media, 
            contador, 
            logsVerificadas, 
            totalLogsPesquisadas:logs 
        }

        res.json(data)
    }catch(err){
        res.send(err)
    }

})

app.listen(3333)