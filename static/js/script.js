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
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('static/sound/whoosh.mp3');

document.querySelector("#blackjack-hit-button").addEventListener('click',blackjackHit);
document.querySelector("#blackjack-deal-button").addEventListener('click',blackjackDeal);


function blackjackHit(){
    let card =  randomCard();
   showCard(card,YOU);
}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card,activePlayer){
    let cardImage = document.createElement('img');
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
}

function blackjackDeal(){
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    
    for(i=0; i < yourImages.length; i++){
        yourImages[i].remove();
    }
    for(i=0; i < dealerImages.length; i++){
        dealerImages[i].remove();
    }
}

