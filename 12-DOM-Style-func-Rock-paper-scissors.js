let score = JSON.parse(localStorage.getItem('score_res')) ||/*<--(default operator) */ {
    wins: 0,
    losses: 0,
    ties: 0
}
// instead of below if code we can use default operator as above
/*
if(score===null ) {
//or we can use "(!score)" condition
score ={
    wins: 0,
    losses: 0,
    ties: 0
}  
} 
*/
updateScore_onPage();
// function1
function pickComputerMove(){
const random_num = Math.random();
let computer_move = '';
if(random_num>=0 && random_num<1/3){
computer_move = 'Rock';
}
else if(random_num>=1/3 && random_num<2/3){
computer_move = 'Paper';
}
else{
computer_move = 'Scissors';
}
return computer_move;
}
let isAutoPlaying = false;
let intervalId; // to store the number returned bu setInterval() function
//autoplay() function
function autoPlay(){
  const autoPlay_run = document.querySelector('.js-auto-play-button');
      autoPlay_run.innerHTML = 'Stop auto Playing';
  if(!isAutoPlaying){
   intervalId = setInterval(function(){
      const player_move = pickComputerMove();
      result(player_move);
    }, 1000);
    isAutoPlaying = true;
  }
  else{
      autoPlay_run.innerHTML = 'auto Play';
     clearInterval(intervalId); 
     isAutoPlaying = false;   
  } 
}
// using addEventListener
document.body.addEventListener('keydown', (event)=>{
   if(event.key === 'r'){
    result('Rock');
   }
   else if(event.key ==='p'){
    result('Paper');
   }
   else if(event.key === 's'){
    result('Scissors');
   }
   else if(event.key == 'a'){
    autoPlay();
   }
   else if(event.key == 'Backspace'){
      confirmation();
   } 
});

const autoPlay_run = document.querySelector('.js-auto-play-button');
      autoPlay_run.addEventListener('click', ()=>{
        autoPlay();
      }) 
 
const resetButton_run = document.querySelector('.js-reset-score-button');
      resetButton_run.addEventListener('click', ()=>{
              confirmation();
      });
function confirmation(){
  const  confirm = document.querySelector('.js-confirmation');
        confirm.innerHTML = `Are you sure you want to reset the score? <button class=" reset-yes js-reset-yes" onclick = "resetScore()">Yes</button>
         <button class = "reset-no js-reset-no"onclick = "hideInfo()">No</button`;
}
/*document.querySelector('.js-reset-yes').addEventListener('click',()=>{
  resetScore();
  hideInfo();
});
document.querySelector('.js-reset-no').addEventListener('click',()=>{
  hideInfo();
}); */
function hideInfo(){
  document.querySelector('.js-confirmation').innerHTML = '';
};
//function2
function result(user_move){
const computer_move =  pickComputerMove();
let result = '';
// ROCK RESULT
if(user_move == 'Rock'){
if(computer_move === 'Rock'){
result = 'Tie';
}
else if(computer_move === 'Paper'){
result = 'You Lost';
}
else if(computer_move === 'Scissors'){
result = 'You Won';
}
}
// PAPER RESULT
else if(user_move === 'Paper'){
if(computer_move === 'Rock'){
result = 'You Won';
}
else if(computer_move === 'Paper'){
result = 'Tie';
}
else if(computer_move === 'Scissors'){
result = 'You Lost';
}
}
// SCISSOR RESULT
else if(user_move == 'Scissors'){
if(computer_move === 'Rock'){
result = 'You Lost';
}
else if(computer_move === 'Paper'){
result = 'You Won';
}
else if(computer_move === 'Scissors'){
result = 'Tie';
}
}

if(result ==='You Won'){
score.wins++;
}
else if(result === 'You Lost'){
score.losses++;
}
else if(result == 'Tie'){
score.ties++;
}

localStorage.setItem('score_res', JSON.stringify(score));

document.querySelector('.js-result').innerHTML = ` ${result}`; 

document.querySelector('.js-moves').innerHTML = `Your move 
  <img class="icon" src = "images/${user_move}-emoji.png">
    Computer move 
  <img class = "icon" src = "images/${computer_move}-emoji.png">
  `;

updateScore_onPage();

//alert(`your move is ${user_move}, and computer move is ${computer_move}. The result is ${result}
//Wins:${score.wins}, Losses:${score.losses}, Ties:${score.ties}`);
}
// Reset score function
function resetScore(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;  
  localStorage.removeItem('score_res'); // to remove score from localStorage
  updateScore_onPage();
  document.querySelector('.js-result').innerHTML = ' '; 
  document.querySelector('.js-moves').innerHTML = ' ';
  hideInfo();
} 
function updateScore_onPage(){
document.querySelector('.js-score')
.innerHTML = `Wins:${score.wins}, Losses:${score.losses}, Ties:${score.ties}`;  
}