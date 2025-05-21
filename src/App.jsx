import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import AllDrivers from "./Components/AllDrivers";
import AllTeams from "./Components/AllTeams";
import AllRaces from "./Components/AllRaces";
import Home from "./Components/Home";
import DriversDetails from "./Components/DriversDetails";
import TeamsDetails from "./Components/TeamsDetails";
import RacesDetails from "./Components/RacesDetails";
import axios from "axios";
import {useState, useEffect} from "react";

export default function App() {

  const [flags, setFlags] = useState([]);

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
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/drivers">All drivers</Link></li>
          <li><Link to="/teams">All teams</Link></li>
          <li><Link to="/races">All races</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drivers" element={<AllDrivers flags={flags}/>} />
        <Route path="/teams" element={<AllTeams flags={flags}/>} />
        <Route path="/races" element={<AllRaces flags={flags} />} />
        <Route path="/driverDetails/:driversId" element={<DriversDetails />} />
        <Route path="/teamsDetails/:teamsId" element={<TeamsDetails />} />
        <Route path="/racesDetails/:racesId" element={<RacesDetails />} />
      </Routes>
    </Router>
  );
}