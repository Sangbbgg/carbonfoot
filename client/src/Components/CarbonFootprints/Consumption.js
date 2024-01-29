import React from "react";
// import Styles from "../../styles/consumption.module.css";
import ConsumptionLayout from "./ConsumptionLayout";
function Consumption() {
  const data = {};
  return (
    <div>
      <section className="household_one_step">
        <p>사용량 입력 페이지</p>
        <div>
          <article className="household_one_top">
            {/* <!-- 전기 --> */}
            <ConsumptionLayout />
            {/* <!-- 가스 --> */}
            {/* <!-- 수도 --> */}
            {/* <!-- 교통 --> */}
          </article>
          <article className="household_one_mid">
            {/* <!-- 폐기물 --> */}
          </article>
          <article className="household_one_bottom">
            {/* <!-- 폐기물 --> */}
          </article>
        </div>
      </section>
    </div>
  );
}

export default Consumption;
