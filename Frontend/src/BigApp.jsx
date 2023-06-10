import React, {useEffect, useState} from "react";
import BotMessage from './BotMessage';
import InputField from './InputField';
import UserMessage from './UserMessage';
import Header from './Header';
import ChatArea from './ChatArea';
// import ChatBot from './ChatBot';

import {io} from "socket.io-client";
const socket = io("ws://localhost:5000");

function BigApp() {

    const [messages, setMessages] = useState([]);


    socket.on("serverResponse", (data) => {
        console.log("serverResponse:" + data);

        messages.push({text: data, sender: "server"});
        setMessages([...messages]);
    });

    socket.on('[start]', data => {  // emptying the textbox after sending message

        console.log(data+" recived. Deleting all messages");
        setMessages([]);
     });
    



    function onSubmitMessage(inputText) {

        if(inputText.length > 0){
        console.log("onSubmitMessage called:" + inputText);

        socket.emit('clientRequest', inputText);
        // setMessages([...messages, {text: inputText, sender: "user"}])
        messages.push({text: inputText, sender: "user"});
        // setMessages(messages);
        setMessages([...messages]);
        console.log("message length: "+messages.length)
        }
    }


  return (<ChatArea messages={messages}  onSubmitMessage={onSubmitMessage}/>);

  }
export default BigApp;
