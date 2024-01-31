import React, { useState } from "react";

function ConsumptionLayout({ category }) {
  // 첫 번째 input 값 (소비량)
  const [consumption, setConsumption] = useState("");
  // 두 번째 input 값 (CO₂ 발생량)
  const [co2Emission, setCo2Emission] = useState("");

  // CO₂ 발생량 계산 함수
  const calculateCo2Emission = (consumptionValue) => {
    // CO₂ 발생량 계산 수식
    const calculatedEmission = consumptionValue * category.cost_formula;
    // 두 번째 input 값 업데이트
    setCo2Emission(calculatedEmission.toFixed(2));
  };

  return (
    <div
      style={{
        borderRadius: "14px",
        alignItems: "center",
        padding: "8px",
      }}
    >
      <span>{category.label}</span>
      <p>{category.label} 사용량</p>
      <input
        type="number"
        aria-label={category.label + " 사용량 입력"}
        placeholder="숫자 입력..."
        value={consumption}
        onChange={(e) => {
          setConsumption(e.target.value);
          calculateCo2Emission(e.target.value);
        }}
      />
      <span>{category.unit}/월</span>
      <p>CO₂발생량</p>
      <input
        type="number"
        disabled
        aria-label="CO₂발생량 입력"
        value={co2Emission}
      />
      <span>kg/월</span>
      <br />
      <span>
        {category.label +
          " CO₂발생량 | (" +
          category.label +
          " 사용량 *" +
          category.cost_formula +
          ")"}
      </span>
    </div>
  );
}

export default ConsumptionLayout;
