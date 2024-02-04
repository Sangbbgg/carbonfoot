import React, { useState, useEffect } from "react";
// 내부 컴포넌트 분류---------------------------------------
import Consumption from "../CarbonFootprints/Consumption";
import Result from "../CarbonFootprints/Result";
import Practice from "../CarbonFootprints/Practice";
// ---------------------------------------------------------

function CarbonFootprint() {
  const [data, setData] = useState(null); // 전체 데이터 담을 공간
  const [loading, setLoading] = useState(true); // 데이터 로딩 확인

  // 탭 핸들링
  const [activeTab, setActiveTab] = useState("consumption");
  // 계산 결과
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    // 서버 데이터 요청
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/carbonFootprint"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: " + error.message);
      }
    };

    fetchData();
  }, []);
  console.log(data)
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    // if ((tabName === "result" || tabName === "practice") && !resultData) {
    //   alert("제출하기 완료하신 후에 결과확인하실 수 있습니다.");
    // } else {
    //   setActiveTab(tabName);
    // }
  };

  // 분류별 데이터 분리
  const filterAndMap = (data, parentId) => {
    return data
      .filter((category) => category.parent_category_id === parentId)
      .map((option, index) => ({
        ...option,
        id: index,
      }));
  };
  const maindata = filterAndMap(data, null);
  const transportationOptions = filterAndMap(data, 4);
  const wastetype = filterAndMap(data, 8);

  const handleResultSubmit = (resultData) => {
    setResultData(resultData);
    setActiveTab("result");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "consumption":
        return (
          <Consumption
            maindata={maindata}
            transportationOptions={transportationOptions}
            wastetype={wastetype}
            onResultSubmit={handleResultSubmit}
          />
        );
      case "result":
        return <Result resultData={resultData} />;
      case "practice":
        return <Practice />;
      default:
        return <Consumption />;
    }
  };

  return (
    <div>
      <ul>
        <li onClick={() => handleTabChange("consumption")}>계산하기</li>
        <li onClick={() => handleTabChange("result")}>결과보기</li>
        <li onClick={() => handleTabChange("practice")}>생활속 실천방안</li>
      </ul>

      <div>{renderContent()}</div>
    </div>
  );
}

export default CarbonFootprint;
