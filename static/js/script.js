// Challenge 1: Your Age in Days
function ageInDays(){
    var birthYear = prompt('What year were your born... Good friend?');
    var ageInDayss = (2022 - birthYear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + ageInDayss + ' days old.');
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
    
}
function reset(){
    document.getElementById('ageInDays').remove();
}

// Challenge 2: Cat Generator
function generateCat(){
    var images = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    images.src= "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(images);
}

// Challenge 3: Rock, Paper, Scissors
function rpsGame(yourChoice){
    var humanChoice, botChoice;
    botChoice = numberToChoice(randToRpsInt());
    humanChoice = yourChoice.id;
   // console.log(humanChoice);
    results = decideWinner(humanChoice,botChoice); // [1,0] [0.5,0.5] | both won
    message = finalMessage(results); //{'message': 'You won!', 'color': 'green'}
    rpsFrontEnd(yourChoice.id,botChoice,message);
}

function randToRpsInt(){
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number){
    return ['rock','paper','scissors'][number];
}

function decideWinner(humanChoice,botChoice){
    console.log(humanChoice,botChoice);
    var rpsDatabase = {
        'rock' : {'scissors' : 1,'rock' : 0.5,'paper' : 0},
        'paper' : {'rock' : 1,'paper' : 0.5,'scissors' : 0},
        'scissors' : {'paper' : 1,'scissors' : 0.5,'rock' : 0},
    }
    var yourScore = rpsDatabase[humanChoice][botChoice];
    var computerScore =  rpsDatabase[botChoice][humanChoice];
    console.log(yourScore,computerScore);
    return yourScore;
}

function finalMessage(yourScore){
    console.log(yourScore);
    if (yourScore === 0){
        return {'message': 'You lost!', 'color':'red'};
    }
    else if(yourScore === 0.5){
        return {'message': 'You tied!', 'color':'yellow'};
    }
    else{
        return {'message': 'You won!', 'color':'green'};
    }
}

function rpsFrontEnd(humanChoice,botChoice,message){
    var imagesDatabes = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    // Let's removw all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabes[humanChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1);'/>";
    messageDiv.innerHTML = "<h1 style='color: " + message['color'] + "; font-size: 60px; padding:30px; '>" + message['message'] + "</h1>";
    botDiv.innerHTML= "<img src='" + imagesDatabes[botChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243,38,24,1);'/>";

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);   
}


// Challenge 4: Change the Color of All Buttons
var all_buttons = document.getElementsByTagName('button');
// console.log(all_buttons);

var copyAllButtons = [];
for(let i=0; i < all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}
// console.log(copyAllButtons);


function buttonColorChange(buttonThingy){
    // console.log(buttonThingy.value);
    if(buttonThingy.value == 'red'){
        buttonsRed();
    }    
    else if(buttonThingy.value == 'green'){
        buttonsGreen();
    }       
    else if(buttonThingy.value == 'reset'){
        buttonsReset();
    }   
    else if(buttonThingy.value == 'random'){
        buttonsRandom();
    }
}

function buttonsRed(){
    for(let i =0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen(){
    for(let i =0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}


function buttonsReset(){
    for(let i =0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function buttonsRandom(){
    var choices = ['btn-primary', 'btn-success', 'btn-danger', 'btn-warning'];    
    // console.log(choices[randomNum]);
    for(let i = 0; i < all_buttons.length; i++){
        let randomNum =  Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNum]);
    }
}


// Challenge 5: BlackJack

let blackjackGame={
    'you': {'scoreSpan': '#your-blackjack-result', 'div' : '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div' : '#dealer-box', 'score': 0},
    'cards': ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
    'cardsMap': {'2' : 2,'3' : 3,'4' : 4,'5' : 5,'6' : 6,'7' : 7,'8' : 8,'9' : 9,'10' : 10 ,'J': 10,'Q': 10 ,'K': 10, 'A': [1,11]},
    'wins' : 0,
    'losses' : 0,
    'draws' : 0,
    'isStand' : false,
    'turnsOver' : false,
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('static/sound/whoosh.mp3');
const winSound = new Audio('static/sound/applauses.mp3');
const lossSound = new Audio('static/sound/gameover.mp3');

document.querySelector("#blackjack-hit-button").addEventListener('click',blackjackHit);
document.querySelector("#blackjack-stand-button").addEventListener('click',blackjackStand);
document.querySelector("#blackjack-deal-button").addEventListener('click',blackjackDeal);


function blackjackHit(){
    if(!blackjackGame['isStand']){
        let card =  randomCard();
        showCard(card,YOU);
        updateScore(card,YOU);
        showScore(YOU);
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card,activePlayer){
    if(activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal(){
    if(blackjackGame['turnsOver']){
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        
        for(i=0; i < yourImages.length; i++){
            yourImages[i].remove();
        }
        for(i=0; i < dealerImages.length; i++){
            dealerImages[i].remove();
        }
        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector(YOU['scoreSpan']).textContent = YOU['score'];
        document.querySelector(YOU['scoreSpan']).style.color = "#ffffff";
    
        document.querySelector(DEALER['scoreSpan']).textContent = DEALER['score'];
        document.querySelector(DEALER['scoreSpan']).style.color = "#ffffff";
    
        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = "black";

        blackjackGame['isStand'] = false;
        blackjackGame['turnsOver'] = false;
    }   

}


function updateScore(card,activePlayer){
    if (card == 'A'){
        //If adding 11 keeps me below 21, and 11. Otherwise, add 1
        if(activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){                
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }
        else{
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    }
    else{
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}    

function showScore(activePlayer){
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = "BUST!";
        document.querySelector(activePlayer['scoreSpan']).style.color = "red";
    }
    else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function blackjackStand(){
    blackjackGame['isStand'] = true;

    while(DEALER['score'] < 16 && blackjackGame['isStand']){
        let card =  randomCard();
        showCard(card,DEALER);
        updateScore(card,DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    blackjackGame['turnsOver'] = true;
    showResult(computeWinner());
}

// Compute winner and return who just won
// Update the wins, losses and draws
function computeWinner(){
    let winner;
    if(YOU['score'] <= 21){
        // condition: higher score than dealer or when dealer busts but you're 21
        if(YOU['score'] > DEALER['score'] || (DEALER['score']> 21)){
            winner = YOU;
            blackjackGame['wins']++;
        }
        else if(YOU['score'] < DEALER['score']){
            winner = DEALER;
            blackjackGame['losses']++;

        }
        else if(YOU['score'] === DEALER['score']){
            blackjackGame['draws']++;
        }
        
    // condition: when user busts and dealer doestn
    } else if(YOU['score']>21 && DEALER['score'] <= 21){
        winner= DEALER;
        blackjackGame['losses']++;

        //Condition when you and dealer busts
    }else if(YOU['score']>21 && DEALER['score'] >21){
        blackjackGame['draws']++;
    }
    
    return winner;

}

function showResult(winner){

    if(blackjackGame['turnsOver']){

        let message, messageColor;
        if(winner === YOU){
            message = 'You won!';
            messageColor = 'green';
            winSound.play();
            document.querySelector('#wins').textContent = blackjackGame['wins'];
    
        } else if(winner === DEALER){
            message = 'You lost!';
            messageColor = 'red';
            lossSound.play();
            document.querySelector('#losses').textContent = blackjackGame['losses'];
    
        } else{
            message = 'You drew!';
            messageColor = 'black';        
            document.querySelector('#draws').textContent = blackjackGame['draws'];
        }
    
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
        
    }

}