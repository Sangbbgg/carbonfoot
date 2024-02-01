import React, { useState } from "react";
import RadioButton from "./RadioButton";
function ConsumptionLayout({ category, sub }) {
  // 첫 번째 input 값 (소비량)
  const [consumption, setConsumption] = useState("");
  // 두 번째 input 값 (CO₂ 발생량)
  const [co2Emission, setCo2Emission] = useState("");

  // 선택된 sublabel을 추적하기 위한 상태
  const [selectedSublabel, setSelectedSublabel] = useState("");

  // // CO₂ 발생량 계산 함수
  // const calculateCo2Emission = (consumptionValue) => {
  //   // CO₂ 발생량 계산 수식
  //   const calculatedEmission = consumptionValue * category.cost_formula;
  //   // 두 번째 input 값 업데이트
  //   setCo2Emission(calculatedEmission.toFixed(2));
  // };

  // CO₂ 발생량 계산 함수
  const calculateCo2Emission = (consumptionValue) => {
    if (selectedSublabel && consumptionValue) {
      const selectedSub = sub.find((item) => item.sublabel === selectedSublabel);
      const calculatedEmission = consumptionValue * selectedSub.cost_formula;
      setCo2Emission(calculatedEmission.toFixed(2));
    }
  };

  // 라디오 버튼 선택을 처리하는 콜백 함수
  const handleRadioButtonSelect = (sublabel) => {
    setSelectedSublabel(sublabel);
    calculateCo2Emission(consumption);
  };

  // 넘어온 데이터 확인
  console.log(category);
  console.log(sub);
  // 교통 레이아웃
  if (category.category_name === "transportation") {
    return (
      <div>
        <span>{category.label}</span>
        <p>승용차 종류</p>
        {/* sub  인풋 라디오버튼, sub.sublabel 코드 작성구역*/}
        {sub.map((item) => (
          <div key={item.id}>
            <RadioButton
              id={item.id}
              sublabel={item.sublabel}
              onSelect={handleRadioButtonSelect}
            />
          </div>
        ))}
        <div>
          <input
            type="radio"
            id="house_traffic_radio3"
            name="traffic_type"
            value="3"
          />
          <label for="house_traffic_radio2">승용차 없음</label>
        </div>
        <p>이동거리</p>
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
        {sub.map((item) => (
          <div key={item.id}>
            {item.sublabel === "휘발유" ? (
              <span>
                교통 CO₂ 발생량 | {item.sublabel} : (이동거리 /{" "}
                {item.cost_formula})
              </span>
            ) : (
              <span>
                {item.sublabel} : (이동거리 / {item.cost_formula})
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }
  // defaut 레이아웃
  return (
    <div>
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
