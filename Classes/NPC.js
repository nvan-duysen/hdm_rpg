import {Bubble} from './Bubble.js';
import {Mark} from './Mark.js'

import {checkRangeNPC} from '../Functions/collisions.js';

class NPC {
    constructor (coordinates,npcDirection,context) {
        let npc = new Image()
        npc.src = './assets/sprites/npc'+npcDirection+'.png'
        context.drawImage(npc,coordinates[0],coordinates[1]-npc.naturalHeight)
        this.height = npc.naturalHeight;
        this.width = npc.naturalWidth
    }
}

export const createNPCsAndBubbles = (npcData,playerData,bubbleData,globalData,context,canvas) => {
    let NPCs = []

    let NPCsBubbles = []
    
    for (let i=1;i<=Object.keys(npcData).length;i++) {
        let bubbleText=bubbleData[i]["text"]
        NPCs.push(new NPC(npcData[i]["coordinates"],npcData[i]["direction"],context))
        checkRangeNPC(playerData,bubbleData,npcData,i)
        if (bubbleData[i]["display"]) {
            NPCsBubbles.push(new Bubble(
                i,
                bubbleText["textPlaced"].substr(
                    0,
                    Math.round(bubbleText["lettersDisplayed"])
                ),
                bubbleData,
                context
            ));
            if (bubbleText["lettersDisplayed"]<bubbleText["textPlaced"].length) {
                bubbleText["lettersDisplayed"]+=0.1
            }
        }

        if (globalData["questsChecked"]>=i-1 ) {
            if (bubbleData[i]["messageData"]["state"]==="encounter" || bubbleData[i]["messageData"]["state"]==="launch") {
                let mark = new Mark([npcData[i]["coordinates"][0],npcData[i]["coordinates"][1]-NPCs[i-1].height],NPCs[i-1].width,context,"exclamation",canvas)
            }
            
            if (bubbleData[i]["messageData"]["state"]==="end") {
                let mark = new Mark([npcData[i]["coordinates"][0],npcData[i]["coordinates"][1]-NPCs[i-1].height],NPCs[i-1].width,context,"question",canvas)
            }
        }
    }
}