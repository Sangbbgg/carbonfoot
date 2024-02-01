import React, { useState } from "react";

function Consumption({ data }) {
  // data값 확인
  console.log(data);
  // 데이터 배열을 개별 변수로 구조분해
  const [
    electricity,
    gas,
    water,
    transportation,
    gasoline,
    diesel,
    lpg,
    waste,
    kg,
    l,
  ] = data;

  // 사용량 input 값
  const [consumption, setConsumption] = useState({
    electricity: "",
    gas: "",
    water: "",
    transportation: "",
    gasoline: "",
    diesel: "",
    lpg: "",
    waste: "",
  });
  // CO₂ 발생량 input 값
  const [co2Emission, setCo2Emission] = useState({
    electricity: "",
    gas: "",
    water: "",
    transportation: "",
    gasoline: "",
    diesel: "",
    lpg: "",
    waste: "",
  });

  // CO₂ 발생량 계산 함수
  const calculateCo2Emission = (
    consumptionValue,
    cost_formula,
    category_name
  ) => {
    // CO₂ 발생량 계산 수식
    const calculatedEmission = consumptionValue * cost_formula;
    // 두 번째 input 값 업데이트
    setCo2Emission({
      ...co2Emission,
      [category_name]: calculatedEmission.toFixed(2),
    });
  };
  return (
    <div>
      {/* <section className="household_one_step"> */}
      <section>
        <p>사용량 입력 페이지</p>
        <div>
          {/* <article className="household_one_top"> */}
          <article>
            {/* <!-- 전기 --> */}
            <div>
              <span>{electricity.label}</span>
              <p>{electricity.label} 사용량</p>
              <input
                type="number"
                aria-label={electricity.label + " 사용량 입력"}
                placeholder="숫자 입력..."
                value={consumption.electricity}
                onChange={(e) => {
                  setConsumption({ electricity: e.target.value });
                  calculateCo2Emission(
                    e.target.value,
                    electricity.cost_formula,
                    electricity.category_name
                  );
                }}
              />
              <span>{electricity.unit}/월</span>
              <p>CO₂발생량</p>
              <input
                type="number"
                disabled
                aria-label="CO₂발생량 입력"
                value={co2Emission.electricity}
              />
              <span>kg/월</span>
              <br />
              <span>
                {electricity.label +
                  " CO₂발생량 | (" +
                  electricity.label +
                  " 사용량 *" +
                  electricity.cost_formula +
                  ")"}
              </span>
            </div>
            {/* <!-- 가스 --> */}
            <div>
              <span>{gas.label}</span>
              <p>{gas.label} 사용량</p>
              <input
                type="number"
                aria-label={gas.label + " 사용량 입력"}
                placeholder="숫자 입력..."
                value={consumption.gas}
                onChange={(e) => {
                  setConsumption({ gas: e.target.value });
                  calculateCo2Emission(
                    e.target.value,
                    gas.cost_formula,
                    gas.category_name
                  );
                }}
              />
              <span>{gas.unit}/월</span>
              <p>CO₂발생량</p>
              <input
                type="number"
                disabled
                aria-label="CO₂발생량 입력"
                value={co2Emission.gas}
              />
              <span>kg/월</span>
              <br />
              <span>
                {gas.label +
                  " CO₂발생량 | (" +
                  gas.label +
                  " 사용량 *" +
                  gas.cost_formula +
                  ")"}
              </span>
            </div>
            {/* <!-- 수도 --> */}
            {/* <!-- 교통 --> */}
          </article>
          {/* <article className="household_one_mid"> */}
          <article>{/* <!-- 폐기물 --> */}</article>
          {/* <article className="household_one_bottom"> */}
          <article>{/* <!-- 폐기물 --> */}</article>
        </div>
      </section>
    </div>
  );
}

export default Consumption;
