let targetBoxes = document.querySelectorAll('.box');
let turn = "X";
let isGameOver = false; 
let turnOverlay = document.querySelector('.turns-overlay');
let winPlayer = document.querySelector('.win-title');
let playButton = document.querySelector('.play-btn');

targetBoxes.forEach((targetBox)=>{
    // targetBox.innerHTML = "";
    targetBox.addEventListener('click',()=>{
         if(!isGameOver && targetBox.innerHTML === "")
         {
            targetBox.innerHTML = turn;

            checkWin();
            checkDraw();
            changeTurn();
         }
    })
})

function changeTurn()
{
    if(turn === "X")
    {
        turn = "O";
        turnOverlay.style.left = "90px";
    }
    else
    {
        turn = "X";
        turnOverlay.style.left = "0px";

    }
}

function checkWin()
{
    let winConditions = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    for(let i = 0; i < winConditions.length; i++)
    {
        let value0 = targetBoxes[winConditions[i][0]].innerHTML;
        let value1 = targetBoxes[winConditions[i][1]].innerHTML;
        let value2 = targetBoxes[winConditions[i][2]].innerHTML;

        if(value0 != "" && value0 === value1 && value0 === value2)
        {
            isGameOver = true;
            winPlayer.innerHTML = `Player <span>${turn}</span> wins`;
            playButton.style.display = "inline-block";

            for(j = 0; j < 3; j++)
            {
                targetBoxes[winConditions[i][j]].style.background = "limegreen";
                targetBoxes[winConditions[i][j]].style.color = "white";
            }
        }
    }
}

function checkDraw()
{
    if(!isGameOver)
    {
        let isDraw = true;
        targetBoxes.forEach((targetboxesfordraw)=>{
            if(targetboxesfordraw.innerHTML === "")
            {
                isDraw = false;
            }
        })
        if(isDraw)
        {
            isGameOver = true;
            winPlayer.innerHTML = `Draw`;
            playButton.style.display = "inline-block";
        }
    }
}

function playGame()
{
    isGameOver = false;
    turn = "X";
    turnOverlay.style.left = "0";
    winPlayer.innerHTML = "";
    playButton.style.display = "none";

   targetBoxes.forEach((e)=>{
        e.innerHTML = "";
        e.style.removeProperty('background');
        e.style.removeProperty('color');
   })
}