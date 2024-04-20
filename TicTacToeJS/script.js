'use strict';
let boxes = document.querySelectorAll(".box");

let resetBtn = document.getElementById('resetBtn');
let newGame =document.getElementById("newGame");

let p =document.querySelector(".p")
//player turn ----playerX,playerO
let turn0 = true; 

const winPatterns=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

const enableBoxes =()=>{
    for(let box of boxes){
        box.disabled =false;
        box.textContent ="";
    }
    
}

const disableBoxes =()=>{
    for(let box of boxes){
        box.disabled =true;
    }
}
const resetGame =()=>{
    turn0 =0;
    enableBoxes();
    p.textContent="";
}
const checkWinner = ()=>{
    for(let pattern of winPatterns){
    //  console.log(pattern[0],pattern[1],pattern[2]);
    //   console.log(,boxes[pattern[1]].textContent,boxes[pattern[2]].textContent);
    let pos1Val =boxes[pattern[0]].textContent;
    let pos2Val =boxes[pattern[1]].textContent;
    let pos3Val =boxes[pattern[2]].textContent;
    if(pos1Val !="" && pos2Val !="" && pos3Val !=""){
        if(pos1Val == pos2Val && pos2Val == pos3Val){
           p.textContent =`Congratulations, Winner is ${pos1Val}`;
            console.log("winner",pos1Val);
            disableBoxes();
       }

    }
    }
    
}

boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
       // console.log("box was clicked");
       if(turn0){  //playerO
        box.textContent="O";
        turn0 =false;

       }
       else{   //playerX
        box.textContent="X"
        turn0 =true;
       }
        disableBoxes;
        checkWinner();
       
    });
});
newGame.addEventListener("click",resetGame)
resetBtn.addEventListener("click",resetGame)