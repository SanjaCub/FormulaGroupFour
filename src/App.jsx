import { Routes, Route, NavLink, useLocation } from "react-router";
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
import Hamburger from "./Components/Hamburger";


export default function App() {

  const [flags, setFlags] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2013");
  const [searchTerm, setSearchTerm] = useState("");
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    getFlags();
  }, []);


  useEffect(() => {
    document.body.addEventListener('click', (event) => {
      const isToggleClick = event.target.closest(".menu");
      if (!isToggleClick) {closeHamuburger()};
     })
  }, []);



  const getFlags = async () => {
    const flagsUrl = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
    const responseFlag = await axios.get(flagsUrl);
    setFlags(responseFlag.data);
  }

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen)
  }

  const closeHamuburger = () => {
    setHamburgerOpen(false)
  }

  return (
    < >
      <nav className="navigation">

        <div className="nav-main">
          <div className="flex">
            <ul>
              <li>< NavLink to="/"><img className="formula" src={`/images/F1-logo.png`} /></NavLink></li>
            </ul>

            <ul>
              <li><Year selectedYear={selectedYear} setSelectedYear={setSelectedYear} /></li>
            </ul>
          </div>
          <div className={hamburgerOpen ? "menu" : "none"} >
            <ul >
              <li onClick={closeHamuburger} ><NavLink to="/drivers">Drivers</NavLink></li>
              <li onClick={closeHamuburger} ><NavLink to="/teams">Teams</NavLink></li>
              <li onClick={closeHamuburger} ><NavLink to="/races">Races</NavLink></li>
            </ul>

            <div className="details" onClick={toggleHamburger} > <Hamburger /> </div>

          </div>

        </div>

        <div>
          {location.pathname !== "/" && <ul>
            <li><Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} /></li>
          </ul>}

        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drivers" element={<AllDrivers searchTerm={searchTerm} selectedYear={selectedYear} flags={flags} />} />
        <Route path="/teams" element={<AllTeams searchTerm={searchTerm} selectedYear={selectedYear} flags={flags} />} />
        <Route path="/races" element={<AllRaces searchTerm={searchTerm} selectedYear={selectedYear} flags={flags} />} />
        <Route path="/drivers/:driversId" element={<DriversDetails searchTerm={searchTerm} selectedYear={selectedYear} flags={flags} />} />
        <Route path="/teams/:teamsId" element={<TeamsDetails searchTerm={searchTerm} selectedYear={selectedYear} flags={flags} />} />
        <Route path="/races/:racesId" element={<RacesDetails searchTerm={searchTerm} selectedYear={selectedYear} flags={flags} />} />
      </Routes>

    </>
  );
}