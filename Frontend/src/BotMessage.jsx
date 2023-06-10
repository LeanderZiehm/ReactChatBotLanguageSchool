import React from 'react';

const BotMessage = (props) => {
  return (
    <div className="d-flex justify-content-start mb-4">
    <div className="img_cont_msg">
      <img src="img.png" className="rounded-circle user_img_msg"/>
    </div>
    <div className="msg_cotainer">
     
      {props.text}
    
    </div>
  </div>
  );
};

export default BotMessage;
