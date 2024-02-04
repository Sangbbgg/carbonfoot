import React, { useState, useEffect } from "react";

import Consumption from "../CarbonFootprints/Consumption";
import Result from "../CarbonFootprints/Result";
import Practice from "../CarbonFootprints/Practice";

function CarbonFootprint() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("consumption");
  const [showInfoBox, setShowInfoBox] = useState("flex");

  const [resultData, setResultData] = useState(null);

  const [consumptionData, setConsumptionData] = useState({
    electricity: "",
    gas: "",
    water: "",
    transportation: "",
    waste: "",
  });
  const [selectedTransportationOption, setSelectedTransportationOption] =
    useState(0);

  useEffect(() => {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleTabChange = (tabName) => {
    if ((tabName === "result" || tabName === "practice") && !resultData) {
      alert("제출하기 완료하신 후에 결과확인하실 수 있습니다.");
    } else {
      setActiveTab(tabName);
      setShowInfoBox(tabName === "consumption" ? "flex" : "none");
    }
  };

  const handleResultSubmit = (resultData) => {
    setResultData(resultData);
    setActiveTab("result");
  };

  const handleConsumptionDataChange = (newConsumptionData) => {
    setConsumptionData(newConsumptionData);
  };
  const handleSelectedTransportationOptionChange = (
    newSelectedTransportationOption
  ) => {
    setSelectedTransportationOption(newSelectedTransportationOption);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "consumption":
        return (
          <Consumption
            data={data}
            consumptionData={consumptionData}
            onResultSubmit={handleResultSubmit}
            onConsumptionDataChange={handleConsumptionDataChange}
            selectedTransportationOption={selectedTransportationOption}
            onSelectedTransportationOption={
              handleSelectedTransportationOptionChange
            }
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
        <li
          className={`household_one_step ${
            activeTab === "consumption" ? "on" : ""
          }`}
          onClick={() => handleTabChange("consumption")}
        >
          계산하기
        </li>
        <li
          className={`household_two_step ${activeTab === "result" ? "on" : ""}`}
          onClick={() => handleTabChange("result")}
        >
          결과보기
        </li>
        <li
          className={`household_three_step ${
            activeTab === "practice" ? "on" : ""
          }`}
          onClick={() => handleTabChange("practice")}
        >
          생활속 실천방안
        </li>
      </ul>

      <div>{renderContent()}</div>
    </div>
  );
}

export default CarbonFootprint;
