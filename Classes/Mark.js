export class Mark {
    constructor(coordinates,width,context,content,canvas) {
        let mark = new Image();
        mark.src = 'assets/questSprites/'+content+'.png';
        context.drawImage(mark,coordinates[0],coordinates[1]-canvas.height/100*20,width,canvas.height/100*15)
    }
}