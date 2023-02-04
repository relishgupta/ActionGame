// Initialize score
score=0
cross=true;

// Put the audios in the variables 
let audio=new Audio('music.mp3');
let audiogo=new Audio('gameover.mp3');

// audio will begin after 1sec
setTimeout(()=>{
    audio.play();
},1000);

// Setup the controls
document.onkeydown=function(e){
    if(e.keyCode==32){
        dino=document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(()=>{
            dino.classList.remove('animateDino')
        },700);
    }
    if(e.keyCode=='39'){
        dino=document.querySelector('.dino');
        dinoX=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left=dinoX+112+"px";
    }
    if(e.keyCode=='37'){
        dino=document.querySelector('.dino');
        dinoX=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left=(dinoX-112)+"px";
    }
}

setInterval(()=>{
    // This section will run every 10 ms 
    // Grab the dino, heading and the obstacle 
    dino=document.querySelector('.dino');
    gameOver=document.querySelector('.gameOver');
    obstacle=document.querySelector('.obstacle');

    // Grab the left and top distances of the dino
    dx=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
    dy=parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));

    // Grab the left and top distances of the obstacle
    ox=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
    oy=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));
    
    // Calculate the distance between the dino and the obstacle 
    offsetX=Math.abs(dx-ox);
    offsetY=Math.abs(dy-oy);
    
    //  In case of collision-
    //  update the innerHTML of class gameover to "Game Over - Reload to Play Again"
    //  remove the class obstacleAni
    //  hide the dino
    //  play the audio "audiogo"
    //  pause the audios after 1000ms
    if(offsetX<73 && offsetY<52){
        gameOver.innerHTML="Game Over - Reload to Play Again";
        obstacle.classList.remove('obstacleAni');
        dino.style.visibility='hidden';
        audiogo.play();
        setTimeout(()=>{
            audiogo.pause();
            audio.pause();
        },1000);
    }

    // In case dino successfully cross the obstacle-
    // increment the score by 1'
    // update the cross variable to false and agian true after 1000ms
    // after 500ms decrease the animation duration that will increase the speed of the dino
    else if(offsetX<145 && cross){
        score+=1;
        updateScore(score);
        cross=false;
        setTimeout(()=>{
            cross=true;
        },1000);
        setTimeout(()=>{
            aniDur=parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
            newDur=aniDur-0.1;
            obstacle.style.animationDuration = newDur + 's';
        },500);
    }
},10);

// Update score after every cross
function updateScore(score){
    scoreCont.innerHTML="Your Score: " + score;
}