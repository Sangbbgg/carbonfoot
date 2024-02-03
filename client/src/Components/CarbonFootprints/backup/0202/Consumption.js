import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Consumption({ data }) {
  // console.log(data);
  const [consumption, setConsumption] = useState({
    electricity: "",
    gas: "",
    water: "",
    transportation: "",
    radioOption: "0",
    wasteInput1: "",
    wasteInput2: "",
  });

  const [co2Emission, setCo2Emission] = useState({
    electricity: 0,
    gas: 0,
    water: 0,
    transportation: 0,
    waste: 0,
  });

  const [totalCO2Emission, setTotalCO2Emission] = useState(0);

  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setConsumption({
      ...consumption,
      [name]: value || 0,
    });
  };

  useEffect(() => {
    let wasteValue = 0;

    const val1 = 0.176;
    const val2 = 0.5573;

    if (!isNaN(consumption.wasteInput1) && consumption.wasteInput1 !== "") {
      wasteValue = consumption.wasteInput1 * data[8].cost_formula;
    } else if (
      !isNaN(consumption.wasteInput2) &&
      consumption.wasteInput2 !== ""
    ) {
      wasteValue = consumption.wasteInput2 * val1 * val2; // data[9].cost_formula; //Nan값출력 말 XX 않듣는 시키
    }

    setCo2Emission({
      ...co2Emission,
      electricity: (consumption.electricity * data[0].cost_formula).toFixed(1),
      gas: (consumption.gas * data[1].cost_formula).toFixed(1),
      water: (consumption.water * data[2].cost_formula).toFixed(1),
      transportation: (
        consumption.transportation * data[consumption.radioOption].cost_formula
      ).toFixed(1),
      waste: wasteValue.toFixed(1),
    });

    // total값 저장
    const total =
      parseFloat(co2Emission.electricity) +
      parseFloat(co2Emission.gas) +
      parseFloat(co2Emission.water) +
      parseFloat(co2Emission.transportation) +
      parseFloat(co2Emission.waste);

    setTotalCO2Emission(total);
  }, [consumption, totalCO2Emission]);

  // 계산 결과값 확인
  console.log(co2Emission);
  console.log(totalCO2Emission.toFixed(1));

  //
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Navigate to the 'Result' page and pass the values as state
    navigate("/result", {
      state: {
        co2Emission: co2Emission,
        totalCO2Emission: totalCO2Emission.toFixed(1),
      },
    });
  };
  return (
    <div>
      {/* 전기 */}
      <div>
        <span>{data[0].label}</span>
        <p>{data[0].label}사용량</p>
        <input
          type="number"
          className="elect_usage"
          aria-label={`${data[0].label} 사용량 입력`}
          placeholder="숫자 입력..."
          name={data[0].category_name}
          value={consumption.electricity}
          onChange={handelInputChange}
        />
        <span>{data[0].unit}/월</span>
        <p>CO₂발생량</p>
        <input type="number" value={co2Emission.electricity} readOnly />
        <span>kg/월</span>
        <div>
          <span>
            {data[0].label} CO₂발생량 | ({data[0].label} 사용량{" "}
            {data[0].cost_formula})
          </span>
        </div>
      </div>
      {/* 가스 */}
      <div>
        <span>{data[1].label}</span>
        <p>{data[1].label}사용량</p>
        <input
          type="number"
          className="elect_usage"
          aria-label={`${data[1].label} 사용량 입력`}
          placeholder="숫자 입력..."
          name={data[1].category_name}
          value={consumption.gas}
          onChange={handelInputChange}
        />
        <span>{data[1].unit}/월</span>
        <p>CO₂발생량</p>
        <input type="number" value={co2Emission.gas} readOnly />
        <span>kg/월</span>
        <div>
          <span>
            {data[1].label} CO₂발생량 | ({data[1].label} 사용량{" "}
            {data[1].cost_formula})
          </span>
        </div>
      </div>
      {/* 수도 */}
      <div>
        <span>{data[2].label}</span>
        <p>{data[2].label}사용량</p>
        <input
          type="number"
          className="elect_usage"
          aria-label={`${data[2].label} 사용량 입력`}
          placeholder="숫자 입력..."
          name={data[2].category_name}
          value={consumption.water}
          onChange={handelInputChange}
        />
        <span>{data[2].unit}/월</span>
        <p>CO₂발생량</p>
        <input type="number" value={co2Emission.water} readOnly />
        <span>kg/월</span>
        <div>
          <span>
            {data[2].label} CO₂발생량 | ({data[2].label} 사용량{" "}
            {data[2].cost_formula})
          </span>
        </div>
      </div>
      {/* 교통 */}
      <div>
        <span>{data[3].label}</span>
        <p>승용차 종류</p>
        <div>
          <input
            type="radio"
            name="transportation"
            value="0"
            checked={consumption.radioOption === "0"}
            onChange={() =>
              setConsumption({ ...consumption, radioOption: "0" })
            }
          />
          <label>{data[4].sublabel}</label>
        </div>
        <div>
          <input
            type="radio"
            name="transportation"
            value="1"
            checked={consumption.radioOption === "1"}
            onChange={() =>
              setConsumption({ ...consumption, radioOption: "1" })
            }
          />
          <label>{data[5].sublabel}</label>
        </div>
        <div>
          <input
            type="radio"
            name="transportation"
            value="2"
            checked={consumption.radioOption === "2"}
            onChange={() =>
              setConsumption({ ...consumption, radioOption: "2" })
            }
          />
          <label>{data[6].sublabel}</label>
        </div>
        <div>
          <input
            type="radio"
            name="transportation"
            value="3"
            checked={consumption.radioOption === "3"}
            onChange={() =>
              setConsumption({ ...consumption, radioOption: "3" })
            }
          />
          <label>승용차 없음</label>
        </div>
        <input
          type="number"
          className="elect_usage"
          aria-label={`${data[3].label} 사용량 입력`}
          placeholder="숫자 입력..."
          name={data[3].category_name}
          value={consumption.transportation}
          onChange={handelInputChange}
        />
        <span>{data[3].unit}/월</span>
        <p>CO₂발생량</p>
        <input type="number" value={co2Emission.transportation} readOnly />
        <span>kg/월</span>
        <div>
          <span>
            {data[3].label} CO₂발생량 | {data[4].label} : (이동거리 /{" "}
            {data[4].cost_formula})
          </span>
          <span>
            {data[3].label} CO₂발생량 | {data[5].label} : (이동거리 /{" "}
            {data[5].cost_formula})<br />
            {data[3].label} CO₂발생량 | {data[6].label} : (이동거리 /{" "}
            {data[6].cost_formula})
          </span>
        </div>
      </div>
      {/* 폐기물 */}
      <div>
        <span>{data[7].label}</span>
        <p>폐기물 종류</p>
        <div>
          <input type="radio" value="0" checked={true} readOnly />
          <label>생활 {data[7].label}</label>
        </div>
        <p>{data[7].label} 사용량</p>
        <input
          type="number"
          className="elect_usage"
          aria-label={`${data[7].label} 사용량 입력`}
          placeholder="숫자 입력..."
          value={consumption.wasteInput1.toString()}
          onChange={(e) =>
            setConsumption({
              ...consumption,
              wasteInput1: e.target.value,
              wasteInput2: "",
            })
          }
        />
        <span>{data[8].unit}/월</span>
        <input
          type="number"
          className="elect_usage"
          aria-label={`${data[7].label} 사용량 입력`}
          placeholder="숫자 입력..."
          value={consumption.wasteInput2.toString()}
          onChange={(e) =>
            setConsumption({
              ...consumption,
              wasteInput1: "",
              wasteInput2: e.target.value,
            })
          }
        />
        <span>{data[9].unit}/월</span>

        <p>CO₂발생량</p>
        <input type="number" value={co2Emission.waste} readOnly />
        <span>kg/월</span>
        <div>
          <span>
            생활 {data[7].label} CO₂발생량 | ({data[7].label} 사용량 *{" "}
            {data[8].cost_formula})
          </span>
        </div>
      </div>
      <div>
        <h3>전체 에너지원 CO₂ 발생 합계</h3>
      </div>
      <div>
        <p>CO₂발생량</p>
      </div>
      <div>
        <input type="number" value={totalCO2Emission.toFixed(1)} readOnly />
        <span>kg/월</span>
      </div>
      <button>
        <a href="" onClick={handleButtonClick}>
          제출하기
        </a>
      </button>
    </div>
  );
}

export default Consumption;
