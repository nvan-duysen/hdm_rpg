import {selectMobs, onEnemyDeath} from "../Classes/Enemy.js";

export const checkAttackAction = 
    (attackData,
    instanceData,
    playerData,
    enemyData,
    gameParameters) => { // Lancement de l'attaque si les conditions sont respectées.
        if ((!attackData["isAttacking"] && attackData["canAttack"])) {
            attackData["canAttack"]=false;
            attackData["isAttacking"]=true;
            checkAttackHit(instanceData,playerData,enemyData,attackData,gameParameters)
            setTimeout(()=>{
                attackData["isAttacking"]=false;
            },100)
            setTimeout(()=>{
                attackData["canAttack"]=true;
            },500)
        } 
}

const checkAttackHit = (instanceData,playerData,enemyData,attackData,gameParameters) => { // L'attaque est-elle dans une zone de combat ? A-t-elle touché un ennemi ?
    if (instanceData["instance"]==="village") {
        return;
    }

    let enemyType = selectMobs(playerData)
    let hitboxWidth = [attackData["startWidth"],attackData["startWidth"]+attackData["width"]]
    let enemyWidth = [enemyData[enemyType+"Data"]["coordinates"][0],enemyData[enemyType+"Data"]["coordinates"][0]+50]

    if ((hitboxWidth[0]<enemyWidth[0] && enemyWidth[0]<hitboxWidth[1]) || (hitboxWidth[0]<enemyWidth[1] && enemyWidth[1]<hitboxWidth[1])) {
            onHit(enemyType,enemyData,gameParameters)
    }
}

const onHit = (enemyType,enemyData,gameParameters) => { // Ennemi touché, il perd une vie.
    enemyData[enemyType+"Data"]["enemyLives"]-=1
    if (enemyData[enemyType+"Data"]["enemyLives"]===0) {
        onEnemyDeath(enemyType,gameParameters["playerData"],enemyData,gameParameters["chatBubbleData"],gameParameters["globalData"],gameParameters)
        return;
    }
    let enemyCoordinates = [...enemyData[enemyType+"Data"]["coordinates"]]
    gameParameters["displayData"] =
    {
        "coordinates":enemyCoordinates,
        "display":true,
        "displayElement":"-1 vie, plus que "+enemyData[enemyType+"Data"]["enemyLives"],
        "alpha":1
    }
    setTimeout(()=> {
        gameParameters["displayData"]["display"]=false
    },1000)
}