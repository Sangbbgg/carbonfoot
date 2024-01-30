import React, { useState } from "react";
// import Styles from "../../styles/consumption.module.css";
import ConsumptionLayout from "./ConsumptionLayout";
function Consumption() {
  // 항목별 Consumption 컴포넌트 기본 자료 ------------------------------------------------
  const [categories, setCategories] = useState([
    {
      categories: {
        electricity: {
          unit: "kWh",
          cost_formula: "0.4781",
        },
        gas: {
          unit: "㎥",
          cost_formula: "2.176",
        },
        water: {
          unit: "㎥",
          cost_formula: "0.237",
        },
        transportation: {
          unit: "km",
          subcategories: {
            gasoline: {
              cost_formula: "16.04 * 2.097",
            },
            diesel: {
              cost_formula: "15.35 * 2.582",
            },
            lpg: {
              cost_formula: "11.06 * 1.868",
            },
          },
        },
        waste: {
          subcategories: {
            kg: {
              unit: "kg",
              cost_formula: "0.5573",
            },
            l: {
              unit: "L",
              cost_formula: "0.171 * 0.5573",
            },
          },
        },
      },
    },
  ]);
  // 종료 --------------------------------------------------------------------------------
  return (
    <div>
      {/* <section className="household_one_step"> */}
      <section>
        <p>사용량 입력 페이지</p>
        <div>
          {/* <article className="household_one_top"> */}
          <article>
            {/* <!-- 전기 --> */}
            {categories.map((category) => (
              <ConsumptionLayout key={category.categories} {...category} />
            ))}
            {/* <!-- 가스 --> */}
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
