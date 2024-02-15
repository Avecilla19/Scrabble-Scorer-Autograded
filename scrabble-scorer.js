// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

let word = input.question("Let's play some scrabble! Enter a word: ");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
 
   let points = oldScrabbleScorer(word);
  console.log(points);
};
// CONFUSED WHY the Fucntion below is failing? !?!?!?!?!? HELLO? 
function simpleScorer (word){
   word = word.toLowerCase();
   let score = 0;
   for (let i = 0; i < word.length; i++){
      score =+ 1;
   }
   return score;
}

console.log(simpleScorer(word));

function vowelBonusScorer(word){
   word = word.toLowerCase();
   let score = 0;
   const vowels = ['a', 'e', 'i', 'o', 'u'];
   for (let i = 0; i < word.length; i++){
      //if the word has a vowel score should be +3
      if(vowels.includes(word[i])) {
         score +=3;
      }  else {
         score +=1;
      }
   }
   return score;
};
console.log(vowelBonusScorer(word));

function scrabbleScorer (word){
   let score = 0;
   for (let i = 0; i < word.length; i++){
        let letter = word[i].toLowerCase();
        let pointValue = newPointStructure[letter];
        score += pointValue;
      
   }
   return score;
}
//DOES THIS NOT HAVE 3 OBJECTS !?!?!?!?!?
const scoringAlgorithms = [
   {
      
      description: 'Each letter is worth 1 point.',
      name: 'Simple Score',
      scoringFunction: simpleScorer
   },
   {
      description: 'Each vowel is worth 3 points, and each consonant is worth 1 point',
      name: 'Vowel Bonus Score',
      scoringFunction: vowelBonusScorer
   
   },
   {
     
      description: 'The traditional scoring algorithm',
       name: 'Scrabble',
      scoringFunction: scrabbleScorer
   }
];

function scorerPrompt() {
    console.log("Enter 0 for Simple Score");
    console.log("Enter 1 for Vowel Bonus Score");
    console.log("Enter 2 for Scrabble Score");
    let userInput = input.question("Pick a scoring for your game: ");

    let choice = parseInt(userInput);
    if (choice === 0){
      score = simpleScorer(word);
   }  else if (choice === 1 ){
      score = vowelBonusScorer(word);
   } else if (choice === 2) {
      score = oldScrabbleScorer
   } else {
      console.log("Invalid choice.");
      return;
   } 
   console.log('The score for your word: ', score);
}

function transform(oldPointStructure) {
   let transformObject = {};
//this failed because i kept auto filling in .toLocaleLowerCase instead of toLowerCase! nvm still fails...
   for (let letter in oldPointStructure){
      let lowerCaseLetter = letter.toLowerCase();
      transformObject[lowerCaseLetter] = oldPointStructure[letter];
   }
   return transformObject;
};

let newPointStructure = transform(oldPointStructure) ;
for (let i = 0; i < 26; i++) {
   let letter = String.fromCharCode(97 + i); // using ASCII code starting at 97 
   let pointValue = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10][i];
   newPointStructure[letter] = pointValue;
}
//console.log(newPointStructure);

function runProgram() {
  // initialPrompt();
   scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
