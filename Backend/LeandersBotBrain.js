const fs =  require('fs');

var fileName = 'LeandersIntents.json';

console.log(fileName);
const jsonData = fs.readFileSync(fileName);
const parsed = JSON.parse(jsonData);

var startingNode = parsed["start"];
var current_node = startingNode;
var correctCounter = 0;
var falseCounter = 0;
var falseInARowCounter = 0;
var conversationEnded = false;

// Function to find the matching intent for a given message
function processUserInput(userInput) {

  if(conversationEnded){
    userInput = "[start]";
    conversationEnded = false;
  }
    if(userInput == "[start]"){
      current_node = startingNode;
      return current_node.text;
    }else{
      var response = "";

      var userGotItCorrect = false;

      current_node.correct_answers.forEach(correct_answer => {

        if(userInput.toLowerCase().includes(correct_answer)){
          userGotItCorrect = true;
        }
        // console.log(correct_answer);
      });
      

      if(userGotItCorrect){
        response = current_node.feedback_correct;
        correctCounter++;
        falseInARowCounter = 0;
      }else{
        response = current_node.feedback_incorrect;
        falseCounter++;
        falseInARowCounter++;

        if(falseInARowCounter >= 18){
          response = "You got 18 questions wrong in a row. I think you should try again later. You are not ready yet. :) [RESTARTING CHAT. BEEP BOOP]";
          falseInARowCounter = 0;
          conversationEnded = true;
          return response;
        }
      }



var nextNodeExists = (current_node.next_node != "[END]");

    if(nextNodeExists){
 current_node = parsed[current_node.next_node];
  response += "\n" + current_node.text;
  console.log(current_node.text);
      }else{
        //END!!!!!!!!!!
        var n = correctCounter + falseCounter;
//  response += "Out of ${20} questions \n you got ${correctCounter} correct \n and ${falseCounter} false answers. :)";
 response += ` Our Chat is now over.  Out of ${n} questions you got ${correctCounter} correct and ${falseCounter} false answers.   If you want to practice the same words again, I am here for you :) `;
     conversationEnded = true;
      }
     
     
      return response;
    }
   



}

module.exports = { processUserInput };
// export { processUserInput };


