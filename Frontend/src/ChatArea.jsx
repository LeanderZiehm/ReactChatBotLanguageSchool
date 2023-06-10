import React, {useEffect, useRef} from "react";
import BotMessage from './BotMessage';
import InputField from './InputField';
import UserMessage from './UserMessage';
import Header from './Header';



const ChatArea = (props) => {

  const messagesEndRef = useRef(null)

    useEffect(() => {
        //scroll to bottom when a message is sent or received
        if (props.messages.length > 1) {
            scrollToBottom();
        }
    })

    function scrollToBottom() {
        messagesEndRef.current.scrollIntoView({behavior: "smooth"})
    }

  return (
    
    <div> 
   
<div className="container-fluid h-100"> {/* color background */}
  <div className="row justify-content-center h-100">
    <div className="col-md-8 col-xl-6 chat">
      <div className="card">
      <Header messages={props.messages} />

        <div id="chatSpace" className="card-body msg_card_body">
        
     
        
        {props.messages.map((item, i) => (
        
        // i % 2 === 0? <UserMessage text={item.text}/> : <BotMessage text={item.text}/>
  
       

      item.sender === "user"? <UserMessage text={item.text}/> : <BotMessage text={item.text}/>       
        
     

        ))}
        <div  ref={messagesEndRef}></div>
        </div>

        <InputField  onSubmitMessage={props.onSubmitMessage} />


      </div>
    </div>
  </div>
</div>

</div> 





  );
};

export default ChatArea;
