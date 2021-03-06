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