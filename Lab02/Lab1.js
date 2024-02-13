// Importing the prompt package
const prompt = require('prompt');

// Function to generate computer's selection
function generateComputerSelection() {
    const randomNumber = Math.random();
    if (randomNumber < 0.35) {
        return 'PAPER';
    } else if (randomNumber < 0.68) {
        return 'SCISSORS';
    } else {
        return 'ROCK';
    }
}

// Function to determine the winner
function determineWinner(userSelection, computerSelection) {
    if (userSelection === computerSelection) {
        return "It's a tie";
    } else if (
        (userSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
        (userSelection === 'PAPER' && computerSelection === 'ROCK') ||
        (userSelection === 'SCISSORS' && computerSelection === 'PAPER')
    ) {
        return "User Wins";
    } else {
        return "Computer Wins";
    }
}

// Start the prompt
prompt.start();

// Prompt the user for their selection
prompt.get(['userSelection'], function (err, result) {
    if (err) {
        console.log(err);
        return;
    }

    const userSelection = result.userSelection.toUpperCase();
    const computerSelection = generateComputerSelection();

    console.log("User Selection:", userSelection);
    console.log("Computer Selection:", computerSelection);

    const outcome = determineWinner(userSelection, computerSelection);
    console.log("Outcome:", outcome);
});
