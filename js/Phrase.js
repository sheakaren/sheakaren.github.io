/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

// Project instructions from the Treehouse website pasted throughout this file to be used as a rubric

// Variables
let matched = false;

// The class should include a constructor that receives a phrase parameter and initializes the following properties:
 class Phrase {
     // phrase: this is the actual phrase the Phrase object is representing. 
     // This property should be set to the phrase parameter, but converted to all lower case.
     constructor (phrase) {
        this.phrase = phrase.toLowerCase();
     }

// The class should also have these methods:

// addPhraseToDisplay(): this adds letter placeholders to the display when the game starts. 
    addPhraseToDisplay() {
    // Each letter is presented by an empty box, one li element for each letter. 
        const phraseDiv = document.querySelector("#phrase ul");
        for (let i = 0; i < this.phrase.length; i += 1) {
        let newListElement = document.createElement('li');
        // The phrase displayed on the screen uses the letter CSS class for letters and the space CSS class for spaces.
        let character = this.phrase[i];
			if (character === ' ') {
				newListElement.className = 'space';
			} else {
				newListElement.className = 'letter';
            }
            // create a new li, whose text content is the chosen phrase split by character by the function above
            newListElement.textContent = character;
            // add the new li to the phraseDiv
			phraseDiv.appendChild(newListElement);
        }
        // Prevents player from using the mouse to highlight the letters in the phrase (no cheating!)
        document.addEventListener('mousedown', function (e) {
            e.preventDefault();
          }); // <--- Credit for this snippet goes to Emma from Treehouse via Slack
    } // end addPhraseToDisplay()
     
// checkLetter(): checks to see if the letter selected by the player matches a letter in the phrase.
    checkLetter(letter) {
        if(this.phrase.includes(letter)) {
            matched = true;
            // console.log('true'); // check
        } else {
           matched = false;
        //    console.log('false'); // check
        };
        this.showMatchedLetter();
      } // end checkLetter()
    



// showMatchedLetter(): reveals the letter(s) on the board that matches the player's selection. 
    // // To reveal the matching letter(s), select all of the letter DOM elements that have a CSS class name that matches the selected letter 
    //     // and replace each selected element's hide CSS class with the show CSS class.
    showMatchedLetter(letter) {
        // console.log(letter); // checking to make sure it's logging the right thing
        // selects all of the li elements in the phrase div
        let characterList = $('#phrase li');
        for (let i = 0; i < characterList.length; i += 1) {   
            if (characterList[i].textContent === letter) {
                $(characterList[i]).removeClass('letter').addClass('show');
        }     
        }
    }// end showMatchedLetter()
  

 } // end Phrase class
