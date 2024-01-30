import React from "react";

function ConsumptionLayout({ category }) {

  return (
    <div
      style={{
        borderRadius: "14px",
        alignItems: "center",
        padding: "8px",
      }}
    >
      {category.label}
    </div>
  );
}

export default ConsumptionLayout;
