import React from "react";

function ConsumptionLayout({title, usage, }) {
  return (
    <div class="household_one_top_box">
      <div class="household_one_top_box_line"></div>
      <div class="household_one_top_box_title ">
        <div class="step_icon dim_blue_bar">
          {/* <img src="/tanso2023/dist/images/icons/electricity_icon.svg" alt="전기 아이콘"> */}
        </div>
        <span class="sky_blue_text">전기</span>
      </div>
      <div class="household_one_top_box_content ">
        <div class="household_one_top_box_content_warp">
          <div class="household_one_top_box_content_box">
            <div class="household_one_top_box_content_left">
              <p>전기 사용량</p>
            </div>
            <div class="household_one_top_box_content_right">
              <div class="input_container">
                <input
                  type="number"
                  class="elect_usage"
                  aria-label="전기 사용량 입력"
                  placeholder="숫자 입력..."
                />
                <span>kwh/월</span>
              </div>
            </div>
          </div>
          <div class="household_one_top_box_content_box">
            <div class="household_one_top_box_content_left">
              <p>CO₂발생량</p>
            </div>
            <div class="household_one_top_box_content_right">
              <div class="co2_input_container">
                <div class="elecCo2 co2_input_wrap">
                  <input
                    type="number"
                    name="co2_usage"
                    readonly=""
                    aria-label="CO₂발생량 입력"
                    class="number_length input_number_length1"
                  />
                  <input
                    type="number"
                    name="co2_usage"
                    readonly=""
                    aria-label="CO₂발생량 입력"
                    class="number_length input_number_length2"
                  />
                  <input
                    type="number"
                    name="co2_usage"
                    readonly=""
                    aria-label="CO₂발생량 입력"
                    class="number_length input_number_length3"
                  />
                  <input
                    type="number"
                    name="co2_usage"
                    readonly=""
                    aria-label="CO₂발생량 입력"
                    class="number_length input_number_length4"
                  />
                  <input
                    type="number"
                    name="co2_usage"
                    readonly=""
                    aria-label="CO₂발생량 입력"
                    class="number_length input_number_length5"
                  />
                  <input
                    type="number"
                    name="co2_usage"
                    readonly=""
                    aria-label="CO₂발생량 입력"
                    class="number_length input_number_length6"
                  />
                  <input
                    type="number"
                    name="co2_usage"
                    readonly=""
                    aria-label="CO₂발생량 입력"
                    class="number_length input_number_length7"
                    placeholder="0"
                  />
                  <input
                    type="text"
                    name="co2_usage"
                    readonly=""
                    aria-label="CO₂발생량 입력 콤마"
                    value="."
                  />
                  <input
                    type="number"
                    name="co2_usage"
                    readonly=""
                    aria-label="CO₂발생량 입력"
                    class="number_length input_number_length8"
                    placeholder="0"
                  />
                  <input type="number" class="DDCN_elect" hidden="" />
                </div>
                <span>kg/월</span>
              </div>
            </div>
          </div>
          <div class="household_one_top_box_content_bottom">
            <span>전기 CO₂ 발생량 | (전기 사용량 * 0.4781)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsumptionLayout;
