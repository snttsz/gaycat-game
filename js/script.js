var pipe = document.querySelector('.pipe');
var clouds = document.querySelector('.clouds');
var gay_cat = document.querySelector('.gay-cat');
var div = document.querySelector('.game-board');
var score = document.querySelector('.score');
var points = document.querySelector('.points')

var img = new Image ();
var img2 = new Image ();
img2.src = './images/dog-laughing.gif';
img.src ='./images/PARABENS.png';
img2.classList.add('laughing-dog');
img.classList.add('PARABENS');


var hasjumped;
var lastscor = 10;
var lastJumpTime = 0;
var jumpInterval = 1000; // interval between jumps in milliseconds
var animationTime = 2.5;


const jump = () => 
{
    const currentTime = Date.now();
    if (currentTime - lastJumpTime > jumpInterval) 
    {
        hasjumped = true;
        gay_cat.classList.add('jump');

        setTimeout(() => {
            gay_cat.classList.remove('jump');
        }, 500);
        lastJumpTime = currentTime;
    }
    if (lastscor % 10 == 0)
    {
        jumpInterval -=10; 
    }
}

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const gay_catPosition = +window.getComputedStyle(gay_cat).bottom.replace('px', '');
    const dead_catPosition = gay_catPosition;
    const scoreTime = +score.textContent;
    
    if (pipePosition <= 280 && pipePosition > 180 && gay_catPosition < 70)
    {
        pipe.style.left = `${pipePosition}px`;
        pipe.style.animation = 'none';

        gay_cat.style.bottom = `${gay_catPosition}px`;
        gay_cat.style.animation = 'none';
        
        gay_cat.style.left = `${dead_catPosition}px`;        
        gay_cat.style.bottom = '15px';
        
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = 'black';
        gay_cat.src = '';
        pipe.src = '';
        
        div.style.backgroundColor = 'black';
        div.style.backgroundImage = 'none';
        div.style.borderBottom = 'none';

        score.textContent, points.textContent = '';


        div.appendChild(img);
        div.appendChild(img2);

        div.removeChild(clouds);
        div.removeChild(gay_cat);
        div.removeChild(pipe);

        clearInterval(loop);
        
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                location.reload();
            }
        });
    
    }
    else if (pipePosition < 280 && hasjumped == true)
    {
        score.textContent = `${scoreTime + 1}`;
        hasjumped = false;
    }
    else if (+score.textContent == lastscor)
    {
        lastscor = +score.textContent;

        setTimeout(() => {
            pipe.style.animation = `pipe-animation ${animationTime - 0.2}s infinite linear`
        }, 500);
    }
}, 10);


document.addEventListener('keydown', jump);
