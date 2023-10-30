
//Creating a score object to track the game score
  const score = {
    wins : 0,
    losses : 0,
    ties :0
};

//Listening to the storage event to check if any data isavailable
//in the localStorage. Then calling a callback function to update
//the scores whenever new data exists
window.addEventListener('storage' , updateScores(), true);


//Generating the computer move using a random number then
//compare it with the user move

function GenerateComputerMove(userMove){
    //Using the random() function to generate a value between 0 and 1
    //and store it in a constant
    const randomNumber = Math.random();

    //Creating a constant to store the computer move

    let computerMove = '';
    //Checking the random value based on an assumption of diving the range
    //from 0 to 1 into three sections

    if(randomNumber >= 0 && randomNumber < 1/3){
        computerMove = 'Rock';

    }else if(randomNumber >= 1/3 && randomNumber < 2/3){
        computerMove = 'Paper';
    }else if (randomNumber >= 2/3 && randomNumber < 1){
        computerMove = 'Scissors';
    }
    console.log(`Random Value: ${randomNumber} -- Computer move: ${computerMove} -- User move: ${userMove}`);

    compareChoices(computerMove, userMove);
}
function compareChoices(computerChoice, userChoice){
    let theResult = '';

    //Compare the user move wit the computer move
    if(computerChoice === userChoice){
        theResult = 'Tie';


    }else if(computerChoice === 'Rock' && userChoice === 'Paper'){
        theResult = 'you win';


    }else if(computerChoice === 'Rock' && userChoice === 'Scissors'){

      theResult = 'you lose';
    }else if(computerChoice === 'Paper' && userChoice === 'Rock'){

        theResult = 'you lose';
    }else if(computerChoice === 'Paper' && userChoice === 'Scissors'){

        theResult = 'you win';
    }else if(computerChoice === 'Scissors' && userChoice === 'Paper'){

    theResult = 'you lose';
    }else if(computerChoice === 'Scissors' && userChoice == 'Rock'){

        theResult = 'you win';
    }
//Updating the scores
if(theResult === 'you win'){
    score.wins += 1;

}else if(theResult === 'you lose')
{
    scores.losses += 1;

}else if(theResult === 'Tie')
{
    score.ties += 1;
}
//Storing the updated scored in the localstrage object
//Since localstorage works with strings only, we will convert the javaScript object
//into string before adding it to
 localStorage.setItem('score' , JSON.stringify(score));

//Displayong the result
DisplayResults(theResult,computerChoice, userChoice);



}
//Ressetting the score counters
function resetCounters()
{
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;

    //Deleting the saved data from the localStorage
    localStorage.removeItem('score');
    
    //Displayong the result
    DisplayResults('');
}
//Updating the scores using the localstorage
function updateScores(e)
{

    //Getting the data from the localStorage and converting it back into javaScript object
    let newScore = JSON.parse(localStorage.getItem('score'));
    //Checking the newScore if it is not null
    if(newScore === null){
        alert("There is no saved score available");
    }else {

        alert("Saved score available");

        //Updating the scores
        score.wins = newScore.wins;
        score.losses = newScore.losses;
        score.ties = newScore.ties;



    }

}

function DisplayResults(result = 'New Game', computer = 'No moves',user='no Moves')
{
        let theResultDisplay = document.querySelector('.jsResult');
    let theMovesDisplay  = document.querySelector('.jsMoves');
    let theScoreDisplay = document.querySelector('.jsScore');

    //Populating the paragraph with the text
    theResultDisplay.innerHTML = result;
    theMovesDisplay.innerHTML = ` You
    <img src ="${user}Final.png" class="moveIcon">
    <img src ="${computer}Final.png" class="moveIcon" >
    Computer`;
    theScoreDisplay.innerHTML =  `Wins:${score.wins}. Losses: ${score.losses}, Ties: ${score.ties}.`;
}
