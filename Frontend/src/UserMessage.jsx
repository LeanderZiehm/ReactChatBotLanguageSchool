import React from 'react';

const UserMessage = (props) => {
  return (
    <div className="d-flex justify-content-end mb-4">
    <div className="msg_cotainer_send">

    { props.text}

      
    </div>
    <div className="img_cont_msg">
  <img src="user.svg" className="rounded-circle user_img_msg"/>
    </div>
  </div>
  );
}

export default UserMessage;
