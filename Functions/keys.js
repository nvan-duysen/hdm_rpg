import {launchBubbleMessages} from '../Classes/Bubble.js'
import {checkAttackAction} from './attack.js'

export const handlePressedKeys = (
    globalData,
    playerData,
    npcData,
    bubbleData,
    enemyData,
    instanceData,
    gameParameters
    ) => { // Gestion des évènements de touches pressées.

    globalData["keysPressed"][event.key]=event.type=="keydown"

    if (globalData["keysPressed"]["ArrowLeft"]) { 
        /*playerData["walk"]=0
        if (typeof(boucleMarche2)==="undefined") {
            let boucleMarche2 = setInterval(function () {
                if(!isNaN(parseInt(playerData["walk"]))) {
                    playerData["walk"]+=1
                }
            
                if(playerData["walk"]===3) {
                    playerData["walk"]=""
                    clearInterval(boucleMarche2)
                }
            },1000)
        }               */
        playerData["velocity"][0]=-2
        playerData["heading"]="left"
        playerData["attackBoxData"]["startWidth"]=playerData["coordinates"][0]-50;
    }
    if (globalData["keysPressed"]["ArrowRight"]) {
       /* playerData["walk"]=0
        if (typeof(boucleMarche)==="undefined") {
            let boucleMarche = setInterval(function () {
                if(!isNaN(parseInt(playerData["walk"]))) {
                    playerData["walk"]+=1
                }
            
                if(playerData["walk"]===3) {
                    playerData["walk"]=""
                    clearInterval(boucleMarche)
                }
            },1000)
        }        */
        playerData["velocity"][0]=2
        playerData["heading"]="right"
        playerData["attackBoxData"]["startWidth"]=playerData["coordinates"][0]+50;
    }
    if ((globalData["keysPressed"]["ArrowUp"] || globalData["keysPressed"][" "]) && playerData["jump"]) {
        playerData["velocity"][1]=-5
        playerData["jump"]=false
    }
    if (globalData["keysPressed"]["e"]) {
        launchBubbleMessages(npcData,bubbleData,playerData,globalData,"NPC")
    }
    if (gameParameters["globalData"]["keysPressed"]["w"]) {
        checkAttackAction(playerData["attackBoxData"],instanceData,playerData,enemyData,gameParameters)
    }
}