import React, { useEffect, useState } from "react";
import { evaluate } from "mathjs";

function Consumption({
  maindata,
  transportationOptions,
  wastetype,
  //   onResultSubmit,
}) {
  //   console.log("계산하기");
  console.log("메인data:", maindata);
  console.log("교통 분류:", transportationOptions);
  console.log("폐기물 분류:", wastetype);

  const [consumption, setConsumption] = useState({
    electricity: "",
    gas: "",
    water: "",
    transportation: "",
    radioOption: "0",
    waste: "",
    kg: "",
    l: "",
  });

  const [co2Emission, setCo2Emission] = useState({
    electricity: 0,
    gas: 0,
    water: 0,
    transportation: 0,
    waste: 0,
  });

  // 사용자 입력 처리
  const handleInputChange = (e, type) => {
    const value = e.target.value;
    if (isNaN(parseFloat(value))) {
      setConsumption((prevConsumption) => ({
        ...prevConsumption,
        [type]: "",
      }));
      return;
    }
    setConsumption((prevConsumption) => ({
      ...prevConsumption,
      [type]: value,
      waste: type === "kg" || type === "l" ? value : prevConsumption.waste,
    }));

    // 폐기물 입력 필드가 변경되면 다른 필드를 초기화
    if (type === "kg" || type === "l") {
      const otherType = type === "kg" ? "l" : "kg";
      setConsumption((prevConsumption) => ({
        ...prevConsumption,
        [otherType]: "",
      }));
    }
  };

  const getCostformula = (dataSet, category_name) => {
    // category_name이 배열인 경우, 배열 내의 값 중 하나가 dataSet 내의 category_name과 일치하는지 확인합니다.
    if (Array.isArray(category_name)) {
      for (let name of category_name) {
        if (name) {
          for (let item of dataSet) {
            if (item.category_name === name) {
              return evaluate(item.cost_formula);
            }
          }
        }
      }
    } else {
      // category_name이 배열이 아닌 경우, 기존과 같이 작동합니다.
      for (let item of dataSet) {
        if (item.category_name === category_name) {
          return evaluate(item.cost_formula);
        }
      }
    }
    return undefined;
  };

  useEffect(() => {
    // 폐기물 CO2 배출량 계산
    const wasteEmissions = wastetype.reduce((total, type) => {
      const value = parseFloat(consumption[type.category_name]); // kg 또는 l 입력값
      if (!isNaN(value) && value > 0) {
        const formulaResult = evaluate(type.cost_formula); // cost_formula 평가
        return total + value * formulaResult; // 폐기물 종류에 따른 CO2 배출량 계산
      }
      return total;
    }, 0);

    // 교통 CO2 배출량 계산
    let transportationEmission = 0;
    if (
      !isNaN(consumption.transportation) &&
      consumption.transportation !== ""
    ) {
      const selectedOption = transportationOptions.find(
        (option) => option.id.toString() === consumption.transportation
      );
      if (selectedOption) {
        transportationEmission = evaluate(selectedOption.cost_formula); // 교통 cost_formula 값으로 계산
        if (transportationEmission < 0) {
          transportationEmission = 0; // 교통 CO2 배출량이 음수일 경우 0으로 처리
        }
      }
    } else {
      transportationEmission = 0; // "차량 없음" 옵션 선택 시 0으로 설정
    }

    setCo2Emission((prevCo2Emission) => ({
        ...prevCo2Emission,
        electricity:
          consumption.electricity * getCostformula(maindata, "electricity") || 0,
        gas: consumption.gas * getCostformula(maindata, "gas") || 0,
        water: consumption.water * getCostformula(maindata, "water") || 0,
        transportation: transportationEmission, // 수정된 교통 CO2 배출량 값
        waste: wasteEmissions,
      }));
    }, [consumption, consumption.kg, consumption.l]);
  //   ------------------------------------------------------------------------------------------------------
  const layout = (data) => {
    return (
      <div>
        {data.category_name === "transportation" && (
          // Transportation 레이아웃
          <>
            {transportationOptions.map((transportationData) => (
              <div key={transportationData.id}>
                <label>
                  <input
                    type="radio"
                    name={data.category_name}
                    value={transportationData.id}
                    checked={
                      consumption.radioOption ===
                      transportationData.id.toString()
                    }
                    onChange={(e) => {
                      // handleInputChange를 호출하여 숫자 입력 필드 초기화
                      handleInputChange(e, "radioOption");
                      // 선택된 라디오 버튼이 변경되면 숫자 입력 필드를 비활성화
                      setConsumption((prevConsumption) => ({
                        ...prevConsumption,
                        [data.category_name]: "",
                      }));
                    }}
                  />
                  {transportationData.sublabel}
                </label>
              </div>
            ))}
            <div>
              <label>
                <input
                  type="radio"
                  name={data.category_name}
                  value={transportationOptions.length}
                  checked={
                    consumption.radioOption ===
                    transportationOptions.length.toString()
                  }
                  onChange={(e) => {
                    // handleInputChange를 호출하여 숫자 입력 필드 초기화
                    handleInputChange(e, "radioOption");
                    // "차량 없음"이 선택되면 숫자 입력 필드를 비활성화
                    setConsumption((prevConsumption) => ({
                      ...prevConsumption,
                      [data.category_name]:
                        e.target.value ===
                        transportationOptions.length.toString()
                          ? ""
                          : prevConsumption[data.category_name],
                    }));
                  }}
                />
                차량 없음
              </label>
            </div>
            <input
              type="number"
              placeholder="숫자 입력..."
              value={consumption[data.category_name]}
              onChange={(e) => handleInputChange(e, data.category_name)}
              disabled={
                consumption.radioOption ===
                transportationOptions.length.toString()
              }
            />
          </>
        )}

        {data.category_name === "waste" && (
          // Waste 레아웃
          <div>
            {wastetype.map((wasteData) => (
              <div key={wasteData.id}>
                <input
                  type="number"
                  placeholder="숫자 입력..."
                  value={consumption[wasteData.category_name]}
                  onChange={(e) => {
                    handleInputChange(e, wasteData.category_name);
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {data.category_name !== "transportation" &&
          data.category_name !== "waste" && (
            // 그 외 레이아웃
            <div>
              <input
                type="number"
                placeholder="숫자 입력..."
                value={consumption[data.category_name]}
                onChange={(e) => {
                  handleInputChange(e, data.category_name);
                }}
              />
            </div>
          )}
      </div>
    );
  };

  return (
    <div>
      {maindata.map((data) => (
        <div key={data.id}>
          {data.label}
          {layout(data)}
          <input
            type="number"
            value={co2Emission[data.category_name]}
            readOnly
          />
        </div>
      ))}
    </div>
  );
}

export default Consumption;
