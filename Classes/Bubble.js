export class Bubble { // Création d'une bulle de discussion avec mise en forme en temps réel.
    constructor (npcId,text,bubbleData,context) {
        let charLines = bubbleData[npcId]["text"]["charLines"]

        context.fillStyle = "#000000"; //black color
        context.fillRect(canvas.width/100*9,canvas.height/100*1,canvas.width/100*90,canvas.height/100*15);

        let coordinatesText = [canvas.width/100*10,canvas.height/100*5]

        if(
            context.measureText(text.substr(charLines[charLines.length-1],text.length)).width>canvas.width/100*90-2*(canvas.width/100*10-canvas.width/100*9)
        ) 
        {
            let lastSpace = 0
            for (let i in text) {
                if (text[i]==" ") {
                    lastSpace = i
                }
            }
            charLines.push(parseInt(lastSpace)+1)
        }

        
        context.font = "30px DDBB"
        context.fillStyle = "#ffffff";

        context.fillText(text.substr(0,charLines[0]),coordinatesText[0],coordinatesText[1])

        for (let i=0;i<charLines.length-1;i++) {
            context.fillText(text.substr(charLines[i],charLines[i+1]-charLines[i]), coordinatesText[0],coordinatesText[1]+(i+1)*(canvas.height/100*3))
        }
        if (charLines.length===0) {
            return;
        }
        context.fillText(text.substr(charLines[charLines.length-1],text.length), coordinatesText[0],coordinatesText[1]+charLines.length*(canvas.height/100*3))
    }
}

export const launchBubbleMessages = (npcData,bubbleData,playerData,globalData,bubbleType,bubbleContent) => { // Changement dynamique du contenu de la bulle de discussion selon plusieurs critères.
    if (bubbleType==="NPC")
    {    for (let i=1;i<=Object.keys(npcData).length;i++) {
            if (!npcData[i]["closeToPlayer"]) {
                continue;
            }
            if (!(globalData["questsChecked"]>=i-1)) {
                bubbleData[i]["text"]=
                {
                    "lettersDisplayed":1,
                    "textPlaced":"Reviens me voir lorsque tu auras accompli plus de quêtes !",
                    "charLines":[]
                }
                continue;
            }
            if(bubbleData[i]["messageData"]["id"]===Object.keys(npcData[i]["messages"][bubbleData[i]["messageData"]["state"]+"QuestMessages"]).length) {
                bubbleData[i]["messageData"]["id"]=0;
                switch (bubbleData[i]["messageData"]["state"]){
                    case "encounter":
                        bubbleData[i]["messageData"]["state"]="launch";
                        break;
                    case "launch":
                        bubbleData[i]["messageData"]["state"]="waitFor";
                        playerData["goingQuestId"]=i
                        if (i===1) {
                            globalData["questsData"][1]["questCheck"]=true;
                            globalData["questsChecked"]+=1
                            bubbleData[i]["messageData"]["state"]="after";
                        }
                        break;
                    case "end":
                        globalData["questsChecked"]+=1
                        bubbleData[i]["messageData"]["state"]="after";
                        playerData["stuff"].push(npcData[i]["itemGiven"])
                }
            }
            bubbleData[i]["messageData"]["id"]+=1
            bubbleData[i]["text"]=
                {
                    "lettersDisplayed":1,
                    "textPlaced":npcData[i]["messages"][bubbleData[i]["messageData"]["state"]+"QuestMessages"][bubbleData[i]["messageData"]["id"]],
                    "charLines":[]
                }
            continue;
        }
        return;
    }
    if (bubbleType==="noNPC") {
        bubbleData["other"]["messageData"]["id"]+=1
        bubbleData["other"]["text"]=
        {
            "lettersDisplayed":1,
            "textPlaced":bubbleContent,
            "charLines":[]
        }
    }
}