/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

// Project instructions from the Treehouse website pasted throughout this file to be used as a rubric

// Variables
let letterCheck = this.phrase;
const $startGameBtn = $('#btn__reset');
const $overlay = $('#overlay');
const $qwerty = $('#qwerty button');
let $himym = $('#himym');
let $gameOverMessage = $('#game-over-message');
let $header = $('.header');
let $header2 = $('.header2');

// Just some fancy fun stuff
    // Hides secondary headers and fades in the HIMYM subtitle
$header.hide();
$header2.hide();
$himym.hide().delay(1000).fadeIn(4000);

// Create the Game class in the Game.js file.
class Game {
    // The class should include a constructor that initializes the following properties:
    constructor () {
       // missed: used to track the number of missed guesses by the player. 
        // The initial value is 0, since no guesses have been made at the start of the game.
       this.missed = 0;
       // phrases: an array of five Phrase objects to use with the game. 
        // A phrase should only include letters and spaces— no numbers, punctuation or other special characters.
       this.phrases = [
            'Ted Mosby',
            'Robin Scherbatsky',
            'Barney Stinson',
            'Lily Aldrin',
            'Marshall Eriksen'
        ];
       // activePhrase: This is the Phrase object that’s currently in play. 
        // The initial value is null.
        // Within the startGame() method, this property will be set to the Phrase object returned from a call to the getRandomPhrase() method.
       this.activePhrase = null;
    }

// The class should also have these methods:

// getRandomPhrase(): this method randomly retrieves one of the phrases stored in the phrases array and returns it.
getRandomPhrase() {
    let randomPhrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];
        // console.log(randomPhrase); // test to make sure the variable returns a random phrase from the phrases array. 
    return randomPhrase;
} // end getRandomPhrase();

// startGame()
startGame() {    
    // fades out the start screen overlay and fades the secondary headers in
    $overlay.fadeOut(7500);
    $header.delay(5000).fadeIn(6500);
    $header2.delay(7000).fadeIn(6500);
    // $overlay.hide();
    // calls the getRandomPhrase() method and sets the activePhrase property with the chosen phrase
    let chosenPhrase = this.getRandomPhrase();
    // Sends chosenPhrase to the Phrase class
    this.activePhrase = new Phrase(chosenPhrase);
    // Adds that phrase to the board by calling the addPhraseToDisplay() method on the active Phrase object.
    this.activePhrase.addPhraseToDisplay(); 
    // added a little musical flair
    let themeSong = new Audio('https://jukehost.co.uk/api/audio/5f5564f702416bf31d9d2d1944d80afbb0c99d9f/94513b5f9b6');
    themeSong.play();
} 

// handleInteraction(): this method controls most of the game logic. 
    // It checks to see if the button clicked by the player matches a letter in the phrase, 
        // and then directs the game based on a correct or incorrect guess.
handleInteraction(letterCheck) {
    let letter = letterCheck.textContent;
    // This method should:
    // Disable the selected letter’s onscreen keyboard button.
    if (this.activePhrase.checkLetter(letterCheck.textContent)) {
        this.activePhrase.showMatchedLetter(letter);
        letterCheck.disabled = true;
    }         
    // If the phrase does not include the guessed letter, add the wrong CSS class to the selected letter's keyboard button and call the removeLife() method.
    if (matched === false) {
        letterCheck.className = 'wrong';
        this.removeLife();
    }
     // If the phrase includes the guessed letter, add the chosen CSS class to the selected letter's keyboard button, 
        // call the showMatchedLetter() method on the phrase, and then call the checkForWin() method. If the player has won the game, also call the gameOver() method.
    if (matched === true) {
        letterCheck.className = 'chosen';
        this.activePhrase.showMatchedLetter(letter);
        this.checkForWin();
    }
} //end handleInteraction


   
// removeLife(): this method removes a life from the scoreboard, 
removeLife() {
    // adds to the missed count by increments of 1
    this.missed += 1;
    // replaces one of the liveHeart.png (or in my case yellowUmbrella.png) images with a lostHeart.png(frenchHorn.png) image (found in the images folder) and increments the missed property. 
    const heart = $('.tries'); 
    for (let i = 0; i < this.missed; i += 1) {
        heart[i].innerHTML = '<img src="images/frenchHorn.png" alt="RIP Tracy" height="45" width="60">';
        // If the player has five missed guesses (i.e they're out of lives), then end the game by calling the gameOver() method.
        if (this.missed === 5) {
            this.gameOver();
        }
    }   
} // end removeLife();

// checkForWin(): this method checks to see if the player has revealed all of the letters in the active phrase.
checkForWin() {
    let notGuessed = document.getElementsByClassName('letter').length;
    // updates the overlay h1 element with a friendly win message, 
        // and replaces the overlay’s start CSS class with the win CSS class.
    if (notGuessed === 0) {
        $himym.hide();
        $overlay.show().addClass('win');
        $gameOverMessage.text('Legen - wait for it - dary! You win!').addClass('header2');
        $startGameBtn.text('Suit Up Again?');
        $startGameBtn.click(function() {
            location.reload();
        })

    }
} // end checkforWin();

// gameOver(): this method displays the original start screen overlay, and depending on the outcome of the game, 
gameOver() {
    // updates the overlay h1 element with a friendly loss message, 
        // and replaces the overlay’s start CSS class with the lose CSS class.
    if (this.missed === 5) {
        $himym.hide();
        $overlay.show().addClass('lose');
        $gameOverMessage.text('Classic Shmosby! You lose!');
        $startGameBtn.removeAttr('id').addClass('lose__button').text('Suit Up Again?');
        $startGameBtn.click(function() {
            location.reload();
        })
    }
} // end gameOver();


} // end Game class
