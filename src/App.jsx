import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router";
import AllDrivers from "./Components/AllDrivers";
import AllTeams from "./Components/AllTeams";
import AllRaces from "./Components/AllRaces";
import Home from "./Components/Home";
import DriversDetails from "./Components/DriversDetails";
import TeamsDetails from "./Components/TeamsDetails";
import RacesDetails from "./Components/RacesDetails";
import axios from "axios";
import { useState, useEffect } from "react";
import Year from "./Components/Year";
import Search from "./Components/Search";


export default function App() {

  const [flags, setFlags] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2013");
  const [searchTerm, setSearchTerm] = useState("");

  
  useEffect(() => {
    getFlags();
  }, []);

  const getFlags = async () => {
    const flagsUrl = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
    const responseFlag = await axios.get(flagsUrl);
    setFlags(responseFlag.data);
  }

  return (
    <Router>
      <nav className="navigation">

        <ul>
          <li>< NavLink to="/"><img className="formula" src={`/images/F1-logo.png`} /></NavLink></li>
        </ul>
        <ul>
          <li><NavLink to="/drivers">Drivers</NavLink></li>
          <li><NavLink to="/teams">Teams</NavLink></li>
          <li><NavLink to="/races">Races</NavLink></li>
          <li className="year"><Year selectedYear={selectedYear} setSelectedYear={setSelectedYear} /></li>
          <li><Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/></li>
        </ul>

        </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drivers" element={<AllDrivers searchTerm={searchTerm} selectedYear={selectedYear} flags={flags} />} />
        <Route path="/teams" element={<AllTeams searchTerm={searchTerm} selectedYear={selectedYear} flags={flags} />} />
        <Route path="/races" element={<AllRaces searchTerm={searchTerm} selectedYear={selectedYear} flags={flags} />} />
        <Route path="/driverDetails/:driversId" element={<DriversDetails selectedYear={selectedYear} flags={flags} />} />
        <Route path="/teamsDetails/:teamsId" element={<TeamsDetails selectedYear={selectedYear} flags={flags} />} />
        <Route path="/racesDetails/:racesId" element={<RacesDetails selectedYear={selectedYear} flags={flags} />} />
      </Routes>
    </Router>
  );
}