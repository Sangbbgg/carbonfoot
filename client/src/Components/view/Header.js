import React from "react";
// import logo from "../../../public/img/bbang.png"
const Header = () => {
  return (
    <header>
      <a href="/"><img src={process.env.PUBLIC_URL + "img/bbang.png"} alt="빵끗 이미지"
      style={{width:'100px',borderRadius:"50%"}} /></a>
      <a href="/Login">로그인 / </a>
      <a href="/Register">회원가입 / </a>
      <a href="/MyPage">마이페이지 / </a>
      <a href="/">로그아웃 </a>
      <br />
      {/* <a href="/EnvironmentalIssues"> */}
        탄소 중립이란? / 
        {/* </a> */}
      <a href="/CarbonFootprint"> 탄소 발자국👣 / </a>
      <a href="/EnvironmentalIssues">환경 이슈 / </a>
      <a href="/Shop">빵끗#🛒 / </a>
      <a href="/Community">커뮤니티☘️ / </a>
      <a href="/Campaign">캠페인🌱</a>
    </header>
  );
};

export default Header;
