import React from 'react';
// import './Header.css';

const Header = (props) => {

  const messageCount = props.messages.length;
  const userMessageCount = props.messages.filter(message => message.sender === "user").length;
  const botMessageCount = props.messages.filter(message => message.sender === "server").length;

  return (
    <div className="card-header msg_head">
      <div className="d-flex bd-highlight">
        <div className="img_cont">
          <img src="img.png" className="rounded-circle user_img" />
          <span className="online_icon"></span>
        </div>
        <div className="user_info">
          <span>Chat with OpenAi API</span>
          <p>Messages: {messageCount} | by User: {userMessageCount} | by Bot: {botMessageCount} / 22 Messages</p>
   
          {/* <p>{props.messages.length}/20 Messages</p> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
