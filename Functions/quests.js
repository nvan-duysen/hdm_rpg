export const checkQuest = (playerData,bubbleData,globalData) => { // Vérification de l'état de validation de la quête
    if (!(playerData["inventory"][globalData["questsData"][playerData["goingQuestId"]]["questRequirements"]["questResource"]]===globalData["questsData"][playerData["goingQuestId"]]["questRequirements"]["questAmount"])) {
        return;
    }
    globalData["questsData"][playerData["goingQuestId"]]["questCheck"]=true;
    
    bubbleData[playerData["goingQuestId"]]["messageData"]["state"]="end";
    bubbleData[playerData["goingQuestId"]]["messageData"]["id"]=0;
    return;
}