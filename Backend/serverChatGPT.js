const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const fs = require('fs');
const { Configuration, OpenAIApi } = require("openai");


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
app.use(express.static('public'));

const OPENAI_API_KEY = fs.readFileSync(".key", 'utf8');
const systemPromptText = fs.readFileSync('gptPrompt.txt', 'utf8');

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const MAX_TOKENS = 3000;

let messagesHistory = [{"role": "system", "content": systemPromptText}];

//////////////////////////////

io.on("connection", (socket) => {
    console.log(`[[connect ${socket.id}]]`);
    messagesHistory = [{"role": "system", "content": systemPromptText}];


socket.on('clientRequest', async message => {
      console.log(message);    
      console.log(messagesHistory);    
      
      messagesHistory.push({role: "user", content: message});  
    
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",//chatgpt
        messages: messagesHistory,
        max_tokens: MAX_TOKENS,
        temperature: 1,
      });
      var responseText = completion.data.choices[0].message.content;

      messagesHistory.push({role: "assistant", content: responseText});
      
      console.log(responseText);
      socket.emit('serverResponse',responseText );

    });

    socket.on("disconnect", (reason) => {
        console.log(`[[disconnect ${socket.id} due to ${reason}]]`);
    });
});