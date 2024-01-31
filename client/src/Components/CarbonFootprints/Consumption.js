import React from "react";
// import Styles from "../../styles/consumption.module.css";
import ConsumptionLayout from "./ConsumptionLayout";
function Consumption({ data }) {
  // 데이터 배열을 개별 변수로 구조 분해
  const [electricity, gas, water] = data;
  
  return (
    <div>
      {/* <section className="household_one_step"> */}
      <section>
        <p>사용량 입력 페이지</p>
        <div>
          {/* <article className="household_one_top"> */}
          <article>
            {/* <!-- 전기 --> */}
            <ConsumptionLayout key={electricity.id} category={electricity} />
            {/* <!-- 가스 --> */}
            <ConsumptionLayout key={gas.id} category={gas} />
            {/* <!-- 수도 --> */}
            <ConsumptionLayout key={water.id} category={water} />
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
