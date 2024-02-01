import React from "react";

function Consumption({ data }) {
  // const defaultData = JSON.parse(JSON.stringify(data, null, 2));
  // console.log("탄소발자국 항목별 계산식 데이터 :",defaultData);
  console.log("탄소발자국 항목별 계산식 데이터 :", data);

  return (
    <div>
      {data.map((item, index) =>
        item.parent_category_id === null ? (
          <div key={item.id}>
            <label>{item.label}</label>
            {data
              .filter((subItem) => subItem.parent_category_id === item.id)
              .map((subItem) =>
                {
                  if (subItem.label !== null) {
                    return (
                      <div key={subItem.id}>
                        <input type="radio" name="target" />
                        {subItem.label}
                      </div>
                    );
                  } else {
                    return <input key={subItem.id} />;
                  }
                }
              )}
            {index === 3 && (
              <div>
                <input type="radio" name="target" />
                <label>승용차 없음</label>
              </div>
            )}
            <input type="number" placeholder="숫자 입력..." />
            <label>CO₂배출량</label>
            <input type="number" placeholder="숫자 입력..." />
            <span>{item.unit}</span>
          </div>
        ) : (
          ""
        )
      )}
    </div>
  );
}

export default Consumption;
