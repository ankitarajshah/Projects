'use script';

// console.log( document.querySelector(".message").textContent);


// console.log(document.querySelector(".message").textContent ="Correct Number");

// document.querySelector('.number').textContent =13;
// document.querySelector('.score').textContent=10; 

// document.querySelector('.guess').value=23;
// console.log(document.querySelector('.guess').value);

let secreteNum = Math.trunc(Math.random()*20)+1;
let score =20;
document.querySelector('.check').addEventListener
('click',function(){
    const guess =Number (document.querySelector('.guess').value);
    console.log(guess, typeof guess);

    //when there is no input
    if(!guess){
        document.querySelector(".message").textContent ="No Number!" ;
    }
    //player wins
    else if(guess ===secreteNum){
        document.querySelector('.message').textContent ="Correct number.Match found";
        document.querySelector('.number').textContent =secreteNum;
        document.querySelector('body').style.backgroundColor ="#60b347";
        document.querySelector('.number').style.width ='200px';
    }
    //Guess is too high
    else if(guess>secreteNum){
        if(score>0){
            document.querySelector(".message").textContent ="Guess is High";
            score--;
            document.querySelector('.score').textContent=score;
        }
        else{
            document.querySelector(".message").textContent ="You lost the game";
        }      
    }
    //guess is too low
    else if(guess<secreteNum){
        document.querySelector(".message").textContent ="Guess is Low";
        score--;
        document.querySelector('.score').textContent=score;
    } 
});
document.querySelector('.again').addEventListener('click',function(){
    document.querySelector('body').style.backgroundColor = "#222";
})


