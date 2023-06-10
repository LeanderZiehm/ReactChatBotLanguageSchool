const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

const fs = require('fs');

const { Configuration, OpenAIApi } = require("openai");


var useAda = false;//cheeper ai model than chatgpt

const data1 = fs.readFileSync(".key", 'utf8');
  console.log('File contents prePrompt:');
  console.log(data1);
var OPENAI_API_KEY = data1;


const data = fs.readFileSync('gptPrompt.txt', 'utf8');
  console.log('File contents prePrompt:');
  console.log(data);
var prePrompt = data;


// var REAL_OPENAI_API_KEY = "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";

// console.log("OPENAI_API_KEY: " + OPENAI_API_KEY);
// console.log("REAL_OPENAI_API_KEY: " + REAL_OPENAI_API_KEY);
// console.log(OPENAI_API_KEY == REAL_OPENAI_API_KEY)
// console.log(OPENAI_API_KEY === REAL_OPENAI_API_KEY)

// stringFromFile = OPENAI_API_KEY;
// const hardcodedString = REAL_OPENAI_API_KEY; // Hardcoded string

// if (stringFromFile === hardcodedString) {
//   console.log("The strings are completely equal.");
// } else {
//   console.log("The strings are not equal.");

//   // Find the differences
//   const maxLength = Math.max(stringFromFile.length, hardcodedString.length);
//   let differences = "";

//   for (let i = 0; i < maxLength; i++) {
//     if (stringFromFile[i] !== hardcodedString[i]) {
//       differences += `Difference at index ${i}: '${stringFromFile[i]}' vs '${hardcodedString[i]}'\n`;
//     }
//   }

//   console.log("Differences:");
//   console.log(differences);
// }

// return;








const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);




let conversationHisory = prePrompt;

//////////////////////////////




const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));



app.use(express.static('public'));

io.on("connection", (socket) => {
    console.log(`[[connect ${socket.id}]]`);


socket.on('clientRequest', async message => {

      console.log(message);
      conversationHisory += "User: "+ message + "\n";
      conversationHisory += "Language Bot: ";

      var responseText = "";

     if(useAda){
      const response = await openai.createCompletion({
        model: "text-ada-001",//cheepest model
        prompt: conversationHisory,
        temperature: 1, // Higher values means more random.
        max_tokens: 50, //maximum 2048
        frequency_penalty: 0.5, // between -2.0 and 2.0. Positive values penalize
        });
        responseText = response.data.choices[0].text;
      }else{
      // const completion = await openai.createChatCompletion({
      //   model: "gpt-3.5-turbo",//chatgpt
      //   messages: [{role: "user", content: conversationHisory}],
      //   max_tokens: 50,
      //   temperature: 1,
      // });

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: conversationHisory,
        temperature: 1,
        max_tokens: 50,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      responseText = response.data.choices[0].text;

      // responseText = completion.data.choices[0].message.content;
      }
      console.log(responseText);
      conversationHisory += responseText + "\n";
      socket.emit('serverResponse',responseText );

    });







    socket.on("disconnect", (reason) => {
        console.log(`[[disconnect ${socket.id} due to ${reason}]]`);
    });
});
