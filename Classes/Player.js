export class Player { // Création du personnage et gestion des déplacements
    constructor(playerParameters,gameParameters,context){
        this.draw(playerParameters,context) // va dessiner l'element Player
        playerParameters["coordinates"][0] += playerParameters["velocity"][0] // incremente la position pour effectuer le mouvement horizontale
        playerParameters["attackBoxData"]["startWidth"]+=playerParameters["velocity"][0]

        if (playerParameters["velocity"][0]<0) {
            playerParameters["velocity"][0]=Math.round((playerParameters["velocity"][0]+0.1)*10)/10
        }
        if (playerParameters["velocity"][0]>0 && playerParameters["coordinates"][0]) {
            playerParameters["velocity"][0]=Math.round((playerParameters["velocity"][0]-0.1)*10)/10
        }
        playerParameters["coordinates"][1] += playerParameters["velocity"][1]  // incremente la position pour effectuer le mouvement verticale

        this.checkFall(playerParameters) 
    }
    draw(playerParameters,context){
        let spriteChar = new Image()
        if (playerParameters["heading"]==="right") {
            spriteChar.src = "assets/sprites/spriteCharRight"+playerParameters["stuff"].join("")+".png"
        }
        if (playerParameters["heading"]==="left") {
            spriteChar.src = "assets/sprites/spriteCharLeft"+playerParameters["stuff"].join("")+".png"
        }

        this.height=spriteChar.naturalHeight;
        this.width=spriteChar.naturalWidth;

        context.drawImage(spriteChar,playerParameters["coordinates"][0], playerParameters["coordinates"][1])
    }
    checkFall(playerParameters) {
        if(playerParameters["coordinates"][1]+this.height+ playerParameters["velocity"][1] <= canvas.height/100*89){ // tant que la position de l'element n'atteint pas le bas
            playerParameters["velocity"][1] += playerParameters["gravity"]  // va accelerer de plus en plus vite
        }
        else{   
            playerParameters["velocity"][1] = 0  // si non la vitesse est a 0 donc l'element est fixe.
            playerParameters["jump"]=true
        } 
    }
}