import React from "react";

function RadioButton({ id, sublabel, onSelect }) {
  const handleSelect = () => {
    // cost_formula가 data 속성에 있다고 가정합니다.
    onSelect(sublabel);
  };
  return (
    <>
      <input
        type="radio"
        id={"house_traffic_radio" + (id - 5)}
        value={id - 5}
        name="traffic_type"
        onChange={handleSelect}
      />
        <label htmlFor={"house_traffic_radio" + (id - 5)}>{sublabel}</label>
    </>
  );
}

export default RadioButton;
