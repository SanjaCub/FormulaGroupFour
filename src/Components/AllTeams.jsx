import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import { useNavigate } from "react-router";
import Flag from "react-flagkit";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { getCountryFlag } from "../helper/getFlag";

export default function App(props) {

    const [allTeams, setAllTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getAllTeams();
    }, []);

    const getAllTeams = async () => {
        const response = await axios.get("http://ergast.com/api/f1/2013/constructorStandings.json");
        console.log(response.data);
        setIsLoading(false);
        setAllTeams(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
    };

    const handleClickDetails = (id) => {
        const link = `/teamsDetails/${id}`;
        navigate(link);
    };

    const handleClickWiki = (url) => {
        const link = `${url}`;
        window.open(link);
    };

    if (isLoading) {
        return <Loader />
    };

    return (
        <div className="container"  >
            <div><h1>Constructors Championship</h1></div>
            <div className="all-container">
                <table className="single-table">

                    <thead>
                        <tr>
                            <th colSpan={5}>Constructors Championship Standings - 2013</th>
                        </tr>
                    </thead>

                    <tbody>
                        {allTeams.map((team) => {
                            return (
                                <tr key={team.position}>

                                    <td>{team.position}</td>

                                    {/* Flags */}

                                    <td className="details"     onClick={() => handleClickDetails(team.Constructor.constructorId)}>
                                        <div className="flag-container">
                                        <Flag country={getCountryFlag(team.Constructor.nationality, props.flags)}/>{team.Constructor.name} 
                                        </div>
                                        </td>

                                    <td className="details">  <div className="details-link"> Details <OpenInNewIcon onClick={() => handleClickWiki(team.Constructor.url)}/></div></td> 

                                    <td>{team.points}</td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>
        </div>
    )
}
