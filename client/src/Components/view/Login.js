import React, { useState } from "react";
// import "../../styles/Login.css";
// import Styles from "../../styles/Login.module.css"
import { useNavigate  } from "react-router-dom";

const Login = () => {
  // GPT
  const [userType, setUserType] = useState("personal");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [orgPassword, setOrgPassword] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPassword, setCompanyPassword] = useState("");
  const navigate = useNavigate ();

  const toggleFields = (selectedType) => {
    setUserType(selectedType);
  };

  const validateLogin = (e) => {
    e.preventDefault();
    // Perform validation or send data to the server for validation
    // You can access the state variables like email, password, etc. here
    console.log({
      userType,
      email,
      password,
      businessNumber,
      orgEmail,
      orgPassword,
      companyEmail,
      companyPassword,
    });
  };
  return (
    <div className="login-container">
      <h1>"로그인<br/>페이지 입니다"</h1>

      {/* GPT 폼 */}
      <div className="tab-container">
      {/* <div className={Styles.tab-container}> */}
        <button
          className={userType === "personal" ? "active" : ""}
          onClick={() => toggleFields("personal")}
        >
          개인
        </button>
        <button
          className={userType === "organization" ? "active" : ""}
          onClick={() => toggleFields("organization")}
        >
          단체
        </button>
        <button
          className={userType === "company" ? "active" : ""}
          onClick={() => toggleFields("company")}
        >
          기업
        </button>
      </div>

      <form onSubmit={validateLogin}>
        {userType === "personal" && (
          <>
            <label htmlFor="email">이메일:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">비밀번호:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </>
        )}

        {userType === "organization" && (
          <>
            <label htmlFor="orgEmail">이메일:</label>
            <input
              type="email"
              id="orgEmail"
              value={orgEmail}
              onChange={(e) => setOrgEmail(e.target.value)}
              required
            />

            <label htmlFor="orgPassword">비밀번호:</label>
            <input
              type="password"
              id="orgPassword"
              value={orgPassword}
              onChange={(e) => setOrgPassword(e.target.value)}
              required
            />
          </>
        )}

        {userType === "company" && (
          <>
            <label htmlFor="businessNumber">사업자 번호:</label>
            <input
              type="text"
              id="businessNumber"
              value={businessNumber}
              onChange={(e) => setBusinessNumber(e.target.value)}
              required
            />

            <label htmlFor="companyEmail">이메일:</label>
            <input
              type="email"
              id="companyEmail"
              value={companyEmail}
              onChange={(e) => setCompanyEmail(e.target.value)}
              required
            />

            <label htmlFor="companyPassword">비밀번호:</label>
            <input
              type="password"
              id="companyPassword"
              value={companyPassword}
              onChange={(e) => setCompanyPassword(e.target.value)}
              required
            />
          </>
        )}
        <div className="btnWrap">
        <button type="submit">로그인</button>
        <button type="submit" onClick={() => navigate("/Register")}>회원가입</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
