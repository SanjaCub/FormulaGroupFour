import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import AllDrivers from "./Components/AllDrivers";
import AllTeams from "./Components/AllTeams";
import AllRaces from "./Components/AllRaces";
import Home from "./Components/Home";

export default function App() {
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
        <Route path="/" element={<Home/>} />
        <Route path="/drivers" element={<AllDrivers />} />
        <Route path="/teams" element={<AllTeams />} />
        <Route path="/races" element={<AllRaces />} />
      </Routes>

    </Router>
  );
}


