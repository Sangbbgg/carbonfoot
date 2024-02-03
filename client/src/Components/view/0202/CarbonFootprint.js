import React, { useEffect, useState } from "react";
import Consumption from "../CarbonFootprints/Consumption";
import Result from "../CarbonFootprints/Result";
import Practice from "../CarbonFootprints/Practice";

import Styles from "../../styles/CarbonFootprint.module.css";
const CarbonFootprint = () => {
  // DB연결-------------------------------------------------------------------------------
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("consumption"); // 현재 선택된 탭
  const [showInfoBox, setShowInfoBox] = useState("flex"); // title_info_box 표시조건

  useEffect(() => {
    // 서버에서 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/carbonFootprint"
        );
        console.log(response);
        const result = await response.json();
        setData(result);
        setLoading(false); // 데이터가 로드되면 로딩 상태를 false로 설정
      } catch (error) {
        console.error("Error fetching data: " + error.message);
      }
    };

    fetchData();
  }, []);
  // 코드 종료 ---------------------------------------------------------------------------
  // 이슈 렌더링시에 빈 오브젝트 출력확인--------------------------------------------------
  if (loading) {
    return <div>Loading...</div>; // 데이터가 로드되는 동안 로딩 메시지를 표시
  }
  // console.log(data); // 데이터가 로드되면 콘솔에 출력

  // 상단 사용량 입력, 결과확인, 실천방향 탭 컨트롤----------------------------------------

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setShowInfoBox(tabName === "consumption" ? "flex" : "none");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "consumption":
        return <Consumption data={data} />;
      case "result":
        return <Result />;
      case "practice":
        return <Practice />;
      default:
        return <Consumption />;
    }
  };
  // 코드 종료 --------------------------------------------------------------------------------

  return (
    <div className="household_img_download_container">
      <h1>"탄소 발자국 페이지 입니다."</h1>
      1. 로그인이 되어있는 상태에서 접근 가능하게
      <br />
      2. 월 1회작성 기준 중복 작성 불가
      <br />
      3. 평가 기준 작성, 평가 점수 분류 작성, 총점별 등급 부여
      <br />
      *레퍼런스 :{" "}
      <a href="https://www.kcen.kr/tanso/home.green">
        가정용 탄소발자국 계산기
      </a>
      <br />
      ---------------------------------------------------------------------------------------------
      {/* 탄소발자국 계산기 */}
      <article className="title_box">
        <div>
          <div>
            <h1 className="forest_green_text">가정용 탄소발자국 계산기</h1>
            <a href="/">
              {/* <img src="/tanso2023/dist/images/icons/sub_home_icon.svg" alt="홈으로 이동 아이콘"> */}
              <span>홈으로 이동</span>
            </a>
          </div>
          <p>내가 생활 속에서 배출하는 이산화탄소의 양은 얼마일까요?</p>
        </div>
      </article>
      {/* tap형식(입력폼,결과,실천방안, 사용량 입력 유도) */}
      <div className="sub_menu_container">
        <div className="sub_menu_top">
          <ul className="sub_menu_household">
            <li
              className={`household_one_step ${
                activeTab === "consumption" ? "on" : ""
              }`}
              onClick={() => handleTabChange("consumption")}
            >
              <p>가정용</p>
            </li>
            <li
              className={`household_two_step ${
                activeTab === "result" ? "on" : ""
              }`}
              onClick={() => handleTabChange("result")}
            >
              <p>결과보기</p>
            </li>
            <li
              className={`household_three_step ${
                activeTab === "practice" ? "on" : ""
              }`}
              onClick={() => handleTabChange("practice")}
            >
              <p>생활 속 실천방안</p>
            </li>
          </ul>
        </div>
        <p className="title_info_box" style={{ display: showInfoBox }}>
          {/* <img src="/tanso2023/dist/images/icons/information.svg" alt=""> */}
          <span>
            <span className={Styles.weight_600}>월간 사용량(권장)</span>을
            입력해주세요
          </span>
        </p>
      </div>
      {/* 사용량 입력, 결과, 실천방안 탭형식 페이지 변경 */}
      {renderContent()}
    </div>
  );
};

export default CarbonFootprint;
