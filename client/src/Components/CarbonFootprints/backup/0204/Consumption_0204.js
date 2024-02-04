import React, { useState, useEffect } from "react";

function Consumption({
  data,
  consumptionData: initialConsumptionData,
  onResultSubmit,
  onConsumptionDataChange,
  selectedTransportationOption,
  onSelectedTransportationOption,
}) {
  // 데이터 확인용----------------------------------------------------------
  useEffect(() => {
    console.log("서버 획득 데이터셋 : ", data);
    console.log("교통 분류 데이터셋_가공: ", transportationOptions);
    console.log(
      "교통 선택값(0:휘발유,1:경유,2:LPG,3:차없음) : ",
      selectedTransportationOption
    );
    console.log("폐기물 입력종류_가공: ", wastetype);
  }, []);
  // -----------------------------------------------------------------------
  const [consumption, setConsumption] = useState({
    electricity: "",
    gas: "",
    water: "",
    transportation: "",
    waste: "",
  });
  const [co2Emission, setCo2Emission] = useState({
    electricity: 0,
    gas: 0,
    water: 0,
    transportation: 0,
    waste: 0,
  });

  const [totalCO2Emission, setTotalCO2Emission] = useState("");

  const transportationOptions = data
    .filter((category) => category.parent_category_id === 4)
    .map((option, index) => ({
      ...option,
      id: index,
    }));

  const wastetype = data
    .filter((category) => category.parent_category_id === 8)
    .map((option, index) => ({
      ...option,
      id: index,
    }));

  useEffect(() => {
    const initialData = initialConsumptionData || data;
    if (initialData) {
      setConsumption({
        electricity: initialData.electricity || "",
        gas: initialData.gas || "",
        water: initialData.water || "",
        transportation: initialData.transportation || "",
        waste: initialData.waste || "",
      });
    }
  }, [data, initialConsumptionData]);

  useEffect(() => {
    const electricityCO2 = consumption.electricity * 0.5;
    const gasCO2 = consumption.gas * 0.5;
    const waterCO2 = consumption.water * 0.5;

    const isOptionValid =
      selectedTransportationOption >= 0 &&
      selectedTransportationOption < transportationOptions.length;
    const transportationCO2 = isOptionValid
      ? consumption.transportation *
        parseFloat(
          transportationOptions[selectedTransportationOption].cost_formula
        )
      : 0;

    const wasteCO2 = consumption.waste * 0.5;

    setCo2Emission({
      electricity: electricityCO2,
      gas: gasCO2,
      water: waterCO2,
      transportation: transportationCO2,
      waste: wasteCO2,
    });

    const total =
      electricityCO2 + gasCO2 + waterCO2 + transportationCO2 + wasteCO2;
    setTotalCO2Emission(total);
  }, [consumption, data, selectedTransportationOption]);

  const handleInputChange = (e, type) => {
    const value = e.target.value;
    setConsumption((prevConsumption) => ({
      ...prevConsumption,
      [type]: value,
    }));

    onConsumptionDataChange({
      ...consumption,
      [type]: value,
    });
  };

  const handleSelectedTransportationOptionChange = (
    newSelectedTransportationOption
  ) => {
    setConsumption((prevConsumption) => ({
      ...prevConsumption,
      transportation: "",
    }));

    onSelectedTransportationOption(newSelectedTransportationOption);
  };

  const handleResultSubmit = () => {
    const transportationEmission =
      selectedTransportationOption === 3 ? true : co2Emission.transportation;
    if (
      co2Emission.electricity === 0 ||
      co2Emission.gas === 0 ||
      co2Emission.water === 0 ||
      transportationEmission === 0 ||
      co2Emission.waste === 0
    ) {
      alert("모든 칸을 입력해 주세요!");
      return;
    }

    const resultData = {
      consumption,
      co2Emission,
      totalCO2Emission,
      selectedTransportationOption,
    };
    onResultSubmit(resultData);
  };
  return (
    <div>
      <div>
        전기
        <input
          type="number"
          placeholder="숫자 입력..."
          value={consumption.electricity}
          onChange={(e) => handleInputChange(e, "electricity")}
        />
        <input value={co2Emission.electricity.toFixed(1)} readOnly />
      </div>
      <div>
        가스
        <input
          type="number"
          placeholder="숫자 입력..."
          value={consumption.gas}
          onChange={(e) => handleInputChange(e, "gas")}
        />
        <input value={co2Emission.gas.toFixed(1)} readOnly />
      </div>
      <div>
        수도
        <input
          type="number"
          placeholder="숫자 입력..."
          value={consumption.water}
          onChange={(e) => handleInputChange(e, "water")}
        />
        <input value={co2Emission.water.toFixed(1)} readOnly />
      </div>
      <div>
        교통
        {transportationOptions.map((option) => (
          <label key={option.id}>
            <input
              type="radio"
              name="transportationOption"
              value={option.id}
              checked={selectedTransportationOption === option.id}
              onChange={() =>
                handleSelectedTransportationOptionChange(option.id)
              }
            />
            {option.sublabel}
          </label>
        ))}
        <label>
          <input
            type="radio"
            name="transportationOption"
            value="3"
            checked={selectedTransportationOption === 3} // 값 수정
            onChange={() => handleSelectedTransportationOptionChange(3)} // 추가
          />
          차량 없음
        </label>
        <input
          type="number"
          placeholder="숫자 입력..."
          value={consumption.transportation}
          onChange={(e) => handleInputChange(e, "transportation")}
          disabled={selectedTransportationOption === 3}
        />
        <input value={co2Emission.transportation.toFixed(1)} readOnly />
      </div>
      <div>
        폐기물
        <input
          type="number"
          placeholder="숫자 입력..."
          value={consumption.waste}
          onChange={(e) => handleInputChange(e, "waste")}
        />
        <label>
          <input type="radio" name="waste" value="0" checked={true} readOnly />
          생활 폐기물
        </label>
        {/* 작성 부분 */}

        <input value={co2Emission.waste.toFixed(1)} readOnly />
      </div>
      <div>
        전체 에너지원 CO₂ 발생 합계
        <input value={totalCO2Emission} readOnly />
      </div>
      <button>
        <a href="#" onClick={handleResultSubmit}>
          제출하기
        </a>
      </button>
    </div>
  );
}

export default Consumption;
