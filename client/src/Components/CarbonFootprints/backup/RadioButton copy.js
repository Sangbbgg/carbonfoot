import React from "react";

function RadioButton({id, sublabel}) {
  return (
    <>
      <input
        type="radio"
        id={"house_traffic_radio"+(id-5)}
        value={id-5}
        name="traffic_type"
        
      />
      <label htmlFor={"house_traffic_radio"+(id-5)}>{sublabel}</label>
    </>
  );
}

export default RadioButton;
