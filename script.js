import {Player} from './Classes/Player.js';
import {createNPCsAndBubbles} from './Classes/NPC.js';
import {Background,resetInstance} from './Classes/Background.js';
import {createMobs} from './Classes/Enemy.js';
import {Bubble, launchBubbleMessages} from './Classes/Bubble.js';

import {handlePressedKeys} from './Functions/keys.js';

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
context.canvas.width  = window.innerWidth;
context.canvas.height = window.innerHeight;

const startGame = () => { // Démarrage de la partie, initialisation des évènements et paramètres de jeu. Création de la boucle de jeu.
    const gameParameters = {
        "globalData":{
            "keysPressed":{},
            "questsData":{
                1:{
                    "questCheck":false},
                2:{ "questRequirements":{
                        "questResource":"feather",
                        "questAmount":5,},
                    "questCheck":false,},
                3:{ "questRequirements":{
                        "questResource":"wolfHide",
                        "questAmount":3,},
                    "questCheck":false,}},
            "questsChecked":0,
            "baseEnemyData":{
                "chickenData":{
                    "coordinates":[Math.random()*(canvas.width/100*94)+canvas.width/100*3,canvas.height/100*83],
                    "enemyType":"chicken",
                    "enemyLives":1,
                    "enemyResource":"feather",
                    "enemyResourceName":"plume",
                    "isMoving":false,
                    "velocity":0},
                "wolfData":{
                    "coordinates":[Math.random()*(canvas.width/100*94)+canvas.width/100*3,canvas.height/100*83],
                    "enemyType":"wolf",
                    "enemyLives":3,
                    "enemyResource":"wolfHide",
                    "enemyResourceName":"peau de loup",
                    "isMoving":false,
                    "velocity":0}}},
        "playerData":{
            "coordinates":[canvas.width/100*3,0],
            "chickenKillCount":0,
            "goingQuestId":0,
            "inventory":{
                "feather":0,
                "wolfHide":0},
            "stuff":[],
            "gravity":0.1,
            "velocity":[0,1],
            "walk":"",
            "jump":true,
            "heading":"right",
            "attackBoxData":{
                "offset":0,
                "width":50,
                "height":50,
                "startWidth":canvas.width/100*3+50,
                "isAttacking":false,
                "color":"green",
                "canAttack":true}},
        "enemyData":{
            "chickenData":{
                "coordinates":[Math.random()*(canvas.width/100*94)+canvas.width/100*3,canvas.height/100*83],
                "enemyType":"chicken",
                "enemyLives":1,
                "enemyResource":"feather",
                "enemyResourceName":"plume",
                "isMoving":false,
                "velocity":0},
            "wolfData":{
                "coordinates":[Math.random()*(canvas.width/100*94)+canvas.width/100*3,canvas.height/100*83],
                "enemyType":"wolf",
                "enemyLives":3,
                "enemyResource":"wolfHide",
                "enemyResourceName":"peau de loup",
                "isMoving":false,
                "velocity":0}},
        "npcData":{
            1:{ "direction":Math.round(Math.random()+1),
                "name":"Bertrand",
                "coordinates":[canvas.width/100*43,canvas.height/100*89],
                "closeToPlayer":false,
                "stateQuest":true,
                "messages":{
                    "encounterQuestMessages":{1:"Appuyez sur E pour interagir"},
                    "launchQuestMessages":{
                        1:"Salut, je suis Bertrand, je vais t'apprendre a utiliser les commandes.",
                        2:"Pour te deplacer, tu peux appuyer sur ↤ pour aller vers la gauche ou sur ↦ pour aller vers la droite.",
                        3:"Tu peux egalement appuyer sur ↥ ou sur la barre espace pour sauter.",
                        4:"Enfin, appuie sur E pour interagir avec ton environnement ou W pour mettre un coup devant toi."
                    },
                    "afterQuestMessages":{1:"Maintenant que tu sais tout, pars a l'aventure !"}}},
            2:{ "direction":Math.round(Math.random()+1),
                "name":"Michel",
                "coordinates":[canvas.width/100*78,canvas.height/100*89],
                "closeToPlayer":false,
                "stateQuest":true,
                "messages":{
                    "encounterQuestMessages":{1:"Appuyez sur E pour interagir"},
                    "launchQuestMessages":{
                        1:"Bienvenue a toi aventurier dans le monde de JESAISPAS !",
                        2:"Je vais te donner ta premiere quete, si tu l'acceptes",
                        3:"Ramene-moi 5 plumes de poulet ! Bon courage a toi aventurier !"},
                    "waitForQuestMessages":{1:"J'attends mes plumes, reviens me voir lorsque tu en auras 5 !"},
                    "endQuestMessages":{1:"Merci beaucoup de m'avoir amene toutes ces plumes, voici une epee pour toi !"},
                    "afterQuestMessages":{1:"Ton epee te plait ?"}},
                "itemGiven":"Sword"},
            3:{ "direction":Math.round(Math.random()+1),
                "name":"Sylvie",
                "coordinates":[canvas.width/100*23,canvas.height/100*89],
                "closeToPlayer":false,
                "stateQuest":true,
                "messages":{
                    "encounterQuestMessages":{1:"Appuyez sur E pour interagir"},
                    "launchQuestMessages":{
                        1:"Bonjour a toi, tu es bien le nouvel aventurier ?",
                        2:"J'ai besoin d'un leger service si tu as du temps. Vois-tu, je suis tanneuse et souhaiterais créer des bottes mais il me manque de la peau de loup, saurais-tu m'en apporter ?'",
                        3:"Merci beaucoup, il m'en faudrait 3 pour faire de sublimes bottes !"},
                    "waitForQuestMessages":{1:"Bon courage pour aller me chercher les 3 peaux de loup, aventurier !"},
                    "endQuestMessages":{
                        1:"Parfait, laisse-moi un peu de temps pour faire les bottes...",
                        2:"Et voila, de bien belles bottes rien que pour toi ! J'espere que les bottes t'iront bien..."},
                    "afterQuestMessages":{1:"Bon courage a toi, aventurier !"}},
                "itemGiven":"Boots"}},
        "chatBubbleData":{
            1:{ "display":false,
                "coordinates":[canvas.width/100*43-50,canvas.height/100*74],
                "messageData":{
                    "id":1,
                    "state":"encounter"},
                "text":{
                    "lettersDisplayed":1,
                    "textPlaced":"Appuyez sur E pour interagir",
                    "charLines":[]}},
            2:{ "display":false,
                "coordinates":[canvas.width/100*78-50,canvas.height/100*74],
                "messageData":{
                    "id":1,
                    "state":"encounter"},
                "text":{
                    "lettersDisplayed":1,
                    "textPlaced":"Appuyez sur E pour interagir",
                    "charLines":[]}},
            3:{ "display":false,
                "coordinates":[canvas.width/100*23-50,canvas.height/100*74],
                "messageData":{
                    "id":1,
                    "state":"encounter"},
                "text":{
                    "lettersDisplayed":1,
                    "textPlaced":"Appuyez sur E pour interagir",
                    "charLines":[]}},
            4:{ "display":false,
                "coordinates":[canvas.width/100*60-50,canvas.height/100*74],
                "messageData":{
                    "id":1,
                    "state":"encounter"},
                "text":{
                    "lettersDisplayed":1,
                    "textPlaced":"Appuyez sur E pour interagir",
                    "charLines":[]}},
            "other":{
                "display":false,
                "coordinates":[canvas.width/100*60-50,canvas.height/100*74],
                "messageData":{
                    "id":1},
                "text":{
                    "lettersDisplayed":1,
                    "textPlaced":"",
                    "charLines":[]},}},
        "instanceData":{
            "instanceContent":{
                "wilderness":{
                    "displayVillagers":false,
                    "displayMobs":true,
                    "displayBoss":false,},
                "village":{
                    "displayVillagers":true,
                    "displayMobs":false,
                    "displayBoss":false,},
                "dungeon":{   
                    "displayVillagers":false,
                    "displayMobs":false,
                    "displayBoss":false,}},
            "instance":"village"},
        "displayData":{
            "coordinates":[0,0],
            "display":false,
            "displayElement":"",
            "alpha":1}}

    window.addEventListener("keydown",function () {handlePressedKeys(
        gameParameters["globalData"],
        gameParameters["playerData"],
        gameParameters["npcData"],
        gameParameters["chatBubbleData"],
        gameParameters["enemyData"],
        gameParameters["instanceData"],
        gameParameters)},false)

    window.addEventListener("keyup",function() {handlePressedKeys(
        gameParameters["globalData"],
        gameParameters["playerData"],
        gameParameters["npcData"],
        gameParameters["chatBubbleData"],
        gameParameters["enemyData"],
        gameParameters["instanceData"],
        gameParameters)},false)

    const game = setInterval(refreshGame,1,gameParameters)
}

const refreshGame = (gameParameters) => { // Rafraîchissement du jeu.
    context.clearRect(0,0,canvas.width,canvas.height)

    let instance = new Background(gameParameters,context)  
    
    if (gameParameters["instanceData"]["instanceContent"][gameParameters["instanceData"]["instance"]]["displayVillagers"]) {
        createNPCsAndBubbles(gameParameters["npcData"],gameParameters["playerData"],gameParameters["chatBubbleData"],gameParameters["globalData"],context,canvas)
    }   
    if (gameParameters["instanceData"]["instanceContent"][gameParameters["instanceData"]["instance"]]["displayMobs"]) {
        createMobs(gameParameters["enemyData"],gameParameters["playerData"],gameParameters["globalData"],context,canvas)
    }  
    if (gameParameters["displayData"]["display"]) {
        context.font = "15px DDBB"
        context.fillStyle = "rgba(255,255,255,1)";
        context.fillText(gameParameters["displayData"]["displayElement"],gameParameters["displayData"]["coordinates"][0],gameParameters["displayData"]["coordinates"][1]);
        gameParameters["displayData"]["coordinates"][1]-=1
        gameParameters["displayData"]["alpha"]-=0.01
    }
    
    let player = new Player(gameParameters["playerData"],gameParameters,context)

    if (gameParameters["playerData"]["coordinates"][0]>canvas.width) {
        resetInstance(gameParameters["playerData"],gameParameters["instanceData"],player)
    }
        if (gameParameters["playerData"]["coordinates"][0]<0) {
            if(gameParameters["instanceData"]["instance"]==="village")
        {

            if (gameParameters["playerData"]["goingQuestId"]===5) {
                resetInstance(gameParameters["playerData"],gameParameters["instanceData"],player)
                return;
            }
            if (gameParameters["chatBubbleData"]["other"]["display"]) {
                let otherBubble = new Bubble(
                    "other",
                    gameParameters["chatBubbleData"]["other"]["text"]["textPlaced"].substr(
                        0,
                        Math.round(gameParameters["chatBubbleData"]["other"]["text"]["lettersDisplayed"])
                    ),
                    gameParameters["chatBubbleData"],
                    context
                );
                if (gameParameters["chatBubbleData"]["other"]["text"]["lettersDisplayed"]<gameParameters["chatBubbleData"]["other"]["text"]["textPlaced"].length) {
                    gameParameters["chatBubbleData"]["other"]["text"]["lettersDisplayed"]+=0.2
                }
            } else {
                launchBubbleMessages(gameParameters["npcData"],gameParameters["chatBubbleData"],gameParameters["playerData"],gameParameters["globalData"],"noNPC","Vous n'avez pas l'equipement necessaire pour acceder au donjon.")
                gameParameters["chatBubbleData"]["other"]["display"]=true;
            }   
            return;
        } 
        
    resetInstance(gameParameters["playerData"],gameParameters["instanceData"],player)
    }
    else {
        gameParameters["chatBubbleData"]["other"]["display"] = false
    }
    
}

onload = startGame()