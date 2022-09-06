import {checkQuest} from "../Functions/quests.js"

class Enemy { // Création et déplacement d'un ennemi.
    constructor (enemyType,coordinates,enemyData,context) {
        let enemyDirection = 0

        if (enemyData["velocity"]<0) {
            enemyDirection = 1
        }

        if (enemyData["velocity"]>=0) {
            enemyDirection = 2
        }

        let mob = new Image()

        mob.src = "./assets/sprites/"+enemyType+enemyDirection+".png"
        
        context.drawImage(mob,coordinates[0],coordinates[1])
    }
}

export const createMobs = (enemyData,playerData,globalData,context,canvas) => { // Création d'un ennemi d'un type donné.
    let enemyType = selectMobs(playerData)

    if (enemyType==="none") {
        return;
    }

    let enemy = new Enemy(enemyType,enemyData[enemyType+"Data"]["coordinates"],enemyData,context)

    moveMobs(enemyType,enemyData,globalData,enemyData[enemyType+"Data"]["coordinates"],canvas)
}

const moveMobs = (enemyType,enemyData,globalData,coordinates,canvas) => {
    let velocity = enemyData["velocity"]

    if (velocity===0) {
        enemyData["isMoving"]=false
    }

    if(coordinates[0]+50<0 || coordinates[0]>canvas.width) {
        newEnemy(enemyType,enemyData,globalData["baseEnemyData"])
    }

    if (!enemyData["isMoving"]) {
        enemyData["isMoving"]=true;
        enemyData["velocity"]=Math.round(Math.random()*4-2)
    } 
    if (velocity<0) {
        coordinates[0]+=velocity
        enemyData["velocity"]=Math.round((velocity+0.01)*100)/100
    }
    
    if (velocity>0) {
        coordinates[0]+=velocity
        enemyData["velocity"]=Math.round((velocity-0.01)*100)/100
    }
}


export const selectMobs = (playerData) => { // Sélection du type d'ennemi
    switch (playerData["goingQuestId"]) {
        case 2:
            return "chicken";
        case 3:
            return "wolf";
        default:
            return "none";
    }
}

export const onEnemyDeath = (enemyType,playerData,enemyData,bubbleData,globalData,gameParameters) => { // Ennemi mort, il donne un élément de sa ressource au joueur.
    playerData[enemyType+"KillCount"]+=1;
    playerData["inventory"][enemyData[enemyType+"Data"]["enemyResource"]]+=1;
    let enemyCoordinates = enemyData[enemyType+"Data"]["coordinates"]
    gameParameters["displayData"] =
    {
        "coordinates":enemyCoordinates,
        "display":true,
        "displayElement":"+1 "+enemyData[enemyType+"Data"]["enemyResourceName"]+" ("+playerData["inventory"][enemyData[enemyType+"Data"]["enemyResource"]]+")",
        "alpha":1
    }
    setTimeout(()=> {
        gameParameters["displayData"]["display"]=false
    },1000)
    checkQuest(playerData,bubbleData,globalData);
    newEnemy(enemyType,enemyData,globalData["baseEnemyData"])
}

const newEnemy = (enemyType,enemyData,baseEnemyData) => { // Réinitialisation de l'ennemi.
    let newEnemyData = baseEnemyData[enemyType+"Data"]; 
    enemyData[enemyType+"Data"] = 
    {
        "coordinates":[Math.random()*(canvas.width/100*94)+canvas.width/100*3,canvas.height/100*83],
        "enemyType":enemyType,
        "enemyLives":newEnemyData["enemyLives"],
        "enemyResource":newEnemyData["enemyResource"],
        "enemyResourceName":newEnemyData["enemyResourceName"],
        "isMoving":false,
        "velocity":0}
}