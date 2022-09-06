export class Background { // Création de l'image d'arrière-plan
    constructor (gameParameters,context) {
        let bg_wilderness = new Image();

        bg_wilderness.src = 'assets/backgrounds/'+gameParameters["instanceData"]["instance"]+'.png'
        
        context.drawImage(bg_wilderness,0,0,canvas.width,canvas.height)
    }
}

export const resetInstance = (playerData,instanceData,player) => { // Changement d'instance de jeu et modification des paramètres de jeu.
    switch (playerData["heading"]) {
        case "right":
            if (instanceData["instance"]==="village") {
                playerData["coordinates"]=[canvas.width/100*3,canvas.height/100*89-player.height];
                playerData["attackBoxData"]["startWidth"]=canvas.width/100*6
                instanceData["instance"]="wilderness";
                break;
            }
            
        case "left":
            if (instanceData["instance"]==="wilderness") {
                playerData["coordinates"]=[canvas.width/100*97,canvas.height/100*89-player.height];
                playerData["attackBoxData"]["startWidth"]=canvas.width/100*94
                instanceData["instance"]="village";
                break;
            }
            break;
    }
}