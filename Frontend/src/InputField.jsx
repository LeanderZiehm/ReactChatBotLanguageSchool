import React, {useEffect, useRef} from "react";

const InputField = (props) => {


  useEffect(() => {
    document.getElementById("inputField").addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        console.log("Enter pressed");
        handleClick();
      }
    });
  }, []);//empty array so it only runs once
  

  
  const handleClick = (clickEvent) => {
    console.log('CLICKED 1');
    var textField = document.getElementById("inputField");
    var textFieldText = textField.value;
    console.log(textFieldText);
    props.onSubmitMessage(textFieldText);
    textField.value = "";
  };


  return (
    <div className="card-footer">
      <div className="input-group">
        <div className="input-group-append">
          <div className="input-group-text attach_btn"></div>
        </div>
        <textarea style={{ resize: 'none' }} name="" id="inputField" className="form-control type_msg" placeholder="Type your message..."></textarea>
        <div className="input-group-append">
          <span id="send_btn" className="input-group-text send_btn" onClick={handleClick}><i className="fas fa-location-arrow"></i></span>
        </div>
      </div>
    </div>
  );
};

export default InputField;
