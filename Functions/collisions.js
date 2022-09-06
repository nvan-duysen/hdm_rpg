export const checkRangeNPC = (playerData,bubbleData,npcData,npcId) => {
    if (!((
        Math.abs(playerData["coordinates"][0]-npcData[npcId]["coordinates"][0])<75 || 
        Math.abs(npcData[npcId]["coordinates"][0]-playerData["coordinates"][0])<75) &&
        playerData["velocity"][1]===0
        )) 
    {
        bubbleData[npcId]=
        {
            "display":false,
            "coordinates":bubbleData[npcId]["coordinates"],
            "messageData":{
                "id":1,
                "state":bubbleData[npcId]["messageData"]["state"]
            },
            "text":
            {
                "lettersDisplayed":1,
                "textPlaced":npcData[npcId]["messages"][bubbleData[npcId]["messageData"]["state"]+"QuestMessages"][1],
                "charLines":[]
            }
        };
        npcData[npcId]["closeToPlayer"]=false
        return;
    }
    bubbleData[npcId]["display"]=true;
    npcData[npcId]["closeToPlayer"]=true;
    return;
}