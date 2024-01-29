// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Components/view/Main";
import Header from "./Components/view/Header";
import Login from "./Components/view/Login";
import Register from "./Components/view/Register";
import MyPage from "./Components/view/MyPage";
import CarbonFootprint from "./Components/view/CarbonFootprint";
import EnvironmentalIssues from "./Components/view/EnvironmentalIssues";
import Shop from "./Components/view/Shop";
import Community from "./Components/view/Community";
import Campaign from "./Components/view/Campaign";
function App() {
  return (
    <Router>
      <div className="App">
      <Header />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Register" element={<Register />} />
          <Route exact path="/MyPage" element={<MyPage />} />
          <Route exact path="/CarbonFootprint" element={<CarbonFootprint />} />
          <Route exact path="/EnvironmentalIssues" element={<EnvironmentalIssues />} />
          <Route exact path="/Shop" element={<Shop />} />
          <Route exact path="/Community" element={<Community />} />
          <Route exact path="/Campaign" element={<Campaign />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;