import React from "react";

function Consumption({ data }) {
  console.log(data);

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
        />
        <span>{data[0].unit}/월</span>
        <p>CO₂발생량</p>
        <input type="number" />
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
        />
        <span>{data[1].unit}/월</span>
        <p>CO₂발생량</p>
        <input type="number" />
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
        />
        <span>{data[2].unit}/월</span>
        <p>CO₂발생량</p>
        <input type="number" />
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
          <input type="radio" name="transportation" />
          <label>{data[4].label}</label>
        </div>
        <div>
          <input type="radio" name="transportation" />
          <label>{data[5].label}</label>
        </div>
        <div>
          <input type="radio" name="transportation" />
          <label>{data[6].label}</label>
        </div>
        <div>
          <input type="radio" name="transportation" />
          <label>승용차 없음</label>
        </div>
        <input
          type="number"
          className="elect_usage"
          aria-label={`${data[3].label} 사용량 입력`}
          placeholder="숫자 입력..."
        />
        <span>{data[3].unit}/월</span>
        <p>CO₂발생량</p>
        <input type="number" />
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
          <input type="radio" />
          <label>생활 {data[7].label}</label>
        </div>
        <p>{data[7].label} 사용량</p>
        <input
          type="number"
          className="elect_usage"
          aria-label={`${data[7].label} 사용량 입력`}
          placeholder="숫자 입력..."
        />
        <span>{data[8].unit}/월</span>
        <input
          type="number"
          className="elect_usage"
          aria-label={`${data[7].label} 사용량 입력`}
          placeholder="숫자 입력..."
        />
        <span>{data[9].unit}/월</span>

        <p>CO₂발생량</p>
        <input type="number" />
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
      <div><input type="number"/><span>kg/월</span></div>
    </div>
  );
}

export default Consumption;
