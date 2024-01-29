import React from "react";
// import Styles from "../../styles/consumption.module.css";
import ConsumptionTop from "./ConsumptionTop";
function Consumption() {
  const oneTop = {
    0: {
      title: "전기",
      amountUsed: "kwh/월",
      calculationFormula: 0.4781,
    },
    1: {
      title: "가스",
      amountUsed: "㎥/월",
      calculationFormula: 2.176,
    },
    2: {
      title: "수도",
      amountUsed: "kwh/월",
      calculationFormula: 0.237,
    },
    3: {
      title: "교통",
      amountUsed: "km/월",
      calculationFormula: {
        
      },
    },
    4: {
      title: "전기",
      amountUsed: "kwh/월",
      calculationFormula: 0.4781,
    },
  };
  return (
    <div>
      <section className="household_one_step">
        <p>사용량 입력 페이지</p>
        <div>
          <article className="household_one_top">
            {/* <!-- 전기 --> */}
            <ConsumptionTop />
            {/* <!-- 가스 --> */}
            {/* <!-- 수도 --> */}
            {/* <!-- 교통 --> */}
          </article>
          {/* <!-- 폐기물 --> */}
        </div>
      </section>
    </div>
  );
}

export default Consumption;
